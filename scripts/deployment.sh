# ssh into the server

# Add user and give it perms
adduser ${USER}
usermod -aG sudo ${USER}

# generate a new key on local machine
ssh-keygen
# copy the ssh key to the server from local
ssh-copy-id ${USER}@167.172.139.170

# Disable password connection
sudo nano /etc/ssh/sshd_config
# change PasswordAuthentication to no

#Firewall
sudo ufw app list #You can see which applications are UFW currently allows by typing:
sudo ufw allow OpenSSH # allow ssh
ufw enable #enable firewal

#How to connect
ssh root@203.0.113.0


#Setup docker
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
#Executing the Docker Command Without Sudo
sudo usermod -aG docker ${USER}
su - ${USER}
id -nG # verify

#installing npm/nodejs (old version obsolete)
sudo apt install nodejs
sudo apt install npm
nodejs -v
#get a more recent versiion of nodejs
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
nodejs -v

#install mongodb
sudo apt install -y mongodb
#use mongodb
sudo systemctl status mongodb # check mongo is running on server
mongo and add admin user with => db.createUser( { user: "user", pwd: "pwd", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] } )
npm install mongoose

#Install docker compose
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

#install compose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.18.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose
kompose version

#setup do terminal
#1 set up kubectl
cd ~
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
kubectl version --client
# 2 set up terminal
sudo snap install doctl
# 3 connect
doctl auth init
# create a clusted in do
doctl kubernetes cluster kubeconfig save use_your_cluster_name
kubectl apply -f folderName

# Setup mongodb
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
ps --no-headers -o comm 1
sudo service mongod start
sudo service mongod status #(check the status)
sudo service mongod stop #(to stop mongodb)
sudo service mongod restart #(to restart mongodb)
mongo #(to start the database)