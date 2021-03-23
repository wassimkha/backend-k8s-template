docker build --tag wassimkha/template-payment-service:1.0 . -f app/payment/Dockerfile
docker push wassimkha/template-payment-service:1.0
docker build --tag wassimkha/template-auth-service:1.0 . -f app/auth/Dockerfile
docker push wassimkha/template-auth-service:1.0
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f k8s/auth-k8s/auth-deployment.yaml
kubectl apply -f k8s/payment-k8s/payment-deployment.yaml
kubectl apply -f k8s/ingress/ingress-controller.yaml

