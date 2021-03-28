cd ..
kubectl delete -f k8s/auth-k8s/auth-deployment.yaml
kubectl delete -f k8s/payment-k8s/payment-deployment.yaml
kubectl delete -f k8s/ingress/ingress-controller.yaml
kubectl delete -f k8s/auth-k8s/mongodb/auth-mongo-deployment.yaml
cd scripts