cd ..
docker build --tag wassimkha/template-payment-service:latest . -f app/payment/Dockerfile
docker push wassimkha/template-payment-service:latest
docker build --tag wassimkha/template-auth-service:latest . -f app/auth/Dockerfile
docker push wassimkha/template-auth-service:latest
docker build --tag wassimkha/template-client-service:latest . -f app/client/Dockerfile
docker push wassimkha/template-client-service:latest
kubectl apply -f k8s/auth-k8s/auth-deployment.yaml
kubectl apply -f k8s/auth-k8s/mongodb/auth-mongo-deployment.yaml
kubectl apply -f k8s/payment-k8s/payment-deployment.yaml
kubectl apply -f k8s/client-k8s/client-deployment.yaml
kubectl apply -f k8s/ingress/ingress-controller.yaml
cd scripts

