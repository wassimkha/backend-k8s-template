## Project Description

this is a template framework for building a microservice project in kubernetes. This will allow to create multiple microservices
communicating with each other, persistent data using mongodb, a functional react app using redux to communicate with the
microservices, and a detailed plan to add microservices and deploy to digital ocean.

## This project includes

- Template for multiple microservices and how they communicate with each other:
    - [ ] [example of two services communicating with each other](./app)
    - [X] [their deployment yaml files](./k8s)
    - [X] [the ingress controller file to deploy and route the requests accordingly](./k8s/ingress/ingress-controller.yaml)
- Error handling, middlewares and Models for nodejs in common code:
    - [ ] Different error classes and example of use in the microservices
    - [ ] Middlewares for different functionalities and their implementation in the microservices
    - [ ] Models and their implementation of hashing and class methods
- React setup with Redux:
    - [ ] Functional react communicating with microservices
    - [ ] Using redux to send requests
- Deployment instruction to digital ocean
    - [ ] How to set up digital ocean
    - [ ] How to deploy the k8s to the managed kubernetes of digital ocean
    - [ ] How to set up persistent data in digital ocean

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
- Deploy all the new yaml files

## Errors, Middlewares and Models

## React and Redux

## Digital Ocean