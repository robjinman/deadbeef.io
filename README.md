deadbeef.io
===========

Local development
-----------------

Install Kubernetes, e.g. on Ubuntu 20

```
    sudo snap install microk8s --classic
    sudo usermod -a -G microk8s $USER
    sudo chown -f -R $USER ~/.kube
```

Enable the required add-ons

```
    microk8s enable dns ingress
```

Build the front-end docker image

```
    docker build -t deadbeefio_frontend .

    docker save deadbeefio_frontend > deadbeefio_frontend.tar
    microk8s ctr image import deadbeefio_frontend.tar
```
