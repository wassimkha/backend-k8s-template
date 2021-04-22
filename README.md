## Project Description

this is a template framework for building a microservice project in kubernetes. This will allow to create multiple microservices
communicating with each other, persistent data using mongodb, a functional react app using redux to communicate with the
microservices, and a detailed plan to add microservices and deploy to digital ocean. <br>
[Link to LucidChart architecture overview](https://lucid.app/documents/view/20c72f37-30c7-426e-bd57-86c2f697966d)

## This project includes

- Template for multiple microservices and how they communicate with each other:
    - [X] [example of two services communicating with each other](./app/payment/routes/online.js)
    - [X] [their deployment yaml files](./k8s)
    - [X] [the ingress controller file to deploy and route the requests accordingly](./k8s/ingress/ingress-controller.yaml)
    - [X] Working Auth service
- Error handling, middlewares and Models for nodejs in common code:
    - [X] How to handle errors on the microservices
    - [X] Middlewares for different functionalities and their implementation in the microservices
    - [X] Models and their implementation of hashing and class methods
- React setup with Redux:
    - [X] Functional react communicating with microservices
    - [X] Using redux to send requests
- Deployment instruction to digital ocean
    - [X] How to set up digital ocean
    - [X] How to deploy the k8s to the managed kubernetes of digital ocean
    - [X] How to set up persistent data in digital ocean

##How to start the project
- install Docker desktop and kubernetes
- [Install ingress nginx](https://kubernetes.github.io/ingress-nginx/deploy/#docker-for-mac) by running this command (*Same command as Mac*):
    - kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
- overwrite the local host to point to a URL, it should be the same as the host in the ingress controller file:
    - Modify hosts file of widows and write the desired url next to the 127.0.0.1 ip
    1. the host file
    ```127.0.0.1 backend.com ``` 
       
       path: *C:\Windows\System32\drivers\etc\hosts*
    2. the ingress controller file
    ```yaml
    - host: backend.com
    ```
- start the desired services/deployments inside the k8s folder and run the ingress-controller file
```kubectl apply -f <name_of_files>```
- you can access the url specified in the host with the specified routes

## Microservices
- ### how to add a microservice
- Create a new server (using the template if it's a nodejs server) with the desired routes (the routes and port should be unique)
- Dockerize the server and push it to docker hub
- Create a kubernetes deployment and service using the files inside the k8s folder as a template
- Add the database and setup persistent data if needed. Again, use the files inside k8s folder as a template
- Add the microservice to the ingress-controller file, as a new element of the array path, while specifying the correct port, service name, and the path reserved to that service
example:
    ```yaml
    paths:
      - path: /auth/?(.*)
        backend:
        serviceName: auth-srv
        servicePort: 3000
    ```
- Add the commands to stop/deploy the yaml files and docker images in deploy.sh and stop.sh
- run ./scripts/stop_deploy.sh

## Errors, Middlewares and Models
- ### Errors
all errors will be handled by [error-handler.js](./common/middlewares/error-handler.js)
all we need to do is import it in index.js file:
```js
app.use(error_handler);
```
- ### Midllewares
- [error-handler.js](./common/middlewares/error-handler.js) is a middleware to handle all of the errors inside the nodejs servers
- [require-auth.js](./common/middlewares/require-auth.js) is a middleware to get the token from the headers and verify it. Need to be passed for all routes that need auth
- [validate-request.js](./common/middlewares/validate-request.js) is a middleware that will take the req and throw an error if the params are not correctly setup

- ### Models
- The models are in the [common/models folder](./common/models). There's the User and Password model to compare different passwords
## React and Redux
# add redux
- go to the types.js file and add the desired enums
- go to the reducer file and add your new reducer file with the logic to handle the enums and state
- add action file and add you logic
- go to the component and bring it
# Load user
```js
useEffect(() => {
        store.dispatch(load_user());
    }, [])
```
call this in App.js to load user as soon as they log in the page. We set the deffault header and store the token in local storage
## Digital Ocean
### run the cluster
- start kubernetes cluster
- install doctl
- create api key in digital ocean 
- doct auth init (from powershell)
- series of commands to connect digital ocean context locally
  - doctl kubernetes cluster kubeconfig save <cluster_name (i.e backend-template)>
    - now we are connected to cloud kubernetes
- install ingress nginx: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/do/deploy.yaml
- to watch ingress status: kubectl get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --watch
- to see contexts: kubectl config view
  - to switch context: kubectl config use-context <name i.e docker-desktop>
### create the dbs
***https://www.mongodb.com/digital-ocean*** <br>
- create droplet
- ssh into droplet: ssh root@138.197.97.158
- install and run
  - wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
  - sudo apt-get install gnupg
  - wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
  - echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
  - sudo apt-get update
  - sudo apt-get install -y mongodb-org
  - ps --no-headers -o comm 1
  - sudo service mongod start
  - sudo service mongod status (check the status)
  - sudo service mongod stop (to stop mongodb)
  - sudo service mongod restart (to restart mongodb)
  - mongo (to start the database)
- create an admin user and connect to it
  - use admin
  - ```javascript
      db.createUser({ user: "root", pwd: "root", roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]})
   ```
  - enable auth
    - sudo vi /etc/mongod.conf
    - uncomment security and add
      ```shell
      ...
      security:
        authorization: "enabled"
      ...
      ```
    - sudo service mongod restart (restard mongodb_
    - To connect
      - mongo -u root -p --authenticationDatabase admin
- configure firewall
  - sudo ufw enable
  - sudo ufw allow 27017 or sudo ufw allow from your_trusted_server_ip/32 to any port 27017 (your_trusted_server_ip=)
  - sudo ufw status
-configure mongo to listen to remote server
    - sudo vi /etc/mongod.conf
    - add the droplet server ip
      ```shell
      # network interfaces
      net:
      port: 27017
      bindIp: 127.0.0.1,mongodb_server_ip
      ```
    - sudo service mongod restart






  

