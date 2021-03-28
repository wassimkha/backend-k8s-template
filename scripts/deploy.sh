cd ..
docker build --tag wassimkha/template-payment-service:latest . -f app/payment/Dockerfile
docker push wassimkha/template-payment-service:latest
docker build --tag wassimkha/template-auth-service:latest . -f app/auth/Dockerfile
docker push wassimkha/template-auth-service:latest
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f k8s/auth-k8s/auth-deployment.yaml
kubectl apply -f k8s/auth-k8s/mongodb/auth-mongo-deployment.yaml
kubectl apply -f k8s/payment-k8s/payment-deployment.yaml
kubectl apply -f k8s/ingress/ingress-controller.yaml
cd scripts

