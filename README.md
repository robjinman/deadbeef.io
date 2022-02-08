deadbeef.io
===========

The application consists of three layers:

* The database
* The API
* The front-end

In production, the app is deployed to a Kubernetes cluster. During development, a local cluster is
required, which is referred to as the staging environment.

Installing Kubernetes
---------------------

To install Kubernetes, e.g. on Ubuntu 20, run

```
    sudo snap install microk8s --classic
    sudo usermod -a -G microk8s $USER
    sudo chown -f -R $USER ~/.kube
```

Enable the required add-ons

```
    microk8s enable dns ingress storage
```

Make microk8s aware of our private docker registry

```
    sudo mkdir -p /var/snap/microk8s/current/args/certs.d/rloop2:5000
    sudo bash -c 'cat > /var/snap/microk8s/current/args/certs.d/rloop2:5000/hosts.toml' << EOF
    server = "http://rloop2:5000"

    [host."rloop2:5000"]
    capabilities = ["pull", "resolve"]
    EOF

    microk8s stop
    microk8s start
```

Install the postgres operator

```
    git clone https://github.com/CrunchyData/postgres-operator-examples.git
    cd postgres-operator-examples
    kubectl apply -k kustomize/install
```

Might be useful to install psql

```
    sudo apt install postgresql-client-common postgresql-client-12
```

Install cert-manager

```
    microk8s kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.7.1/cert-manager.yaml
```

Development workflow
--------------------

### API

Running the API

```
    ./scripts/dev/deploy_staging_db_only.sh

    # In a separate terminal
    ./scripts/dev/forward_db_port.sh

    ./scripts/dev/reset_db.sh
    ./scripts/dev/run_api.sh
```

The API will now be available at http://localhost:4000.

After changes to the DB schema

```
    ./scripts/dev/migrate_db.sh
```

### Front-end

With the API already running (see above), run the front-end

```
    scripts/dev/run_app.sh
```

The front-end will now be available at http://localhost:4200.


Deploying to staging
--------------------

First, the apps need to be compiled into docker images.

```
    ./scripts/build_api_image.sh
    ./scripts/build_app_image.sh staging
```

Now we can deploy the local cluster

```
    ./scripts/dev/deploy_staging.sh
```

Set up the database

```
    # In a separate terminal
    ./scripts/dev/forward_db_port.sh

    ./scripts/dev/reset_db.sh 
```

The app should now be available at http://localhost.

To redeploy the API and the app

```
    ./scripts/dev/redeploy_api.sh
    ./scripts/dev/redeploy_app.sh
```


Deploying to production
-----------------------

Build the production version of the front-end app

```
    ./scripts/build_app_image.sh production
```

```
    ./scripts/prod/first_deploy.sh
```

To set up or migrate the database

```
    ./scripts/prod/build_dbadmin_image.sh

    ./scripts/prod/modify_db.sh
```

On subsequent deployments of just the API and front-end app, run

```
    ./scripts/prod/redeploy.sh
```

And to migrate the database after schema changes

```
    ./scripts/prod/modify_db.sh
```


Setting up the production server
--------------------------------

```
    sudo snap install microk8s --classic
    sudo usermod -a -G microk8s $USER
    sudo chown -f -R $USER ~/.kube

    microk8s enable dns ingress storage

    sudo mkdir -p /var/snap/microk8s/current/args/certs.d/rloop2:5000
    sudo bash -c 'cat > /var/snap/microk8s/current/args/certs.d/rloop2:5000/hosts.toml' << EOF
    server = "http://rloop2:5000"

    [host."rloop2:5000"]
    capabilities = ["pull", "resolve"]
    EOF

    sudo bash -c 'cat > /etc/docker/daemon.json' << EOF
    {
      "insecure-registries" : ["rloop2:5000"]
    }
    EOF

    microk8s stop
    microk8s start

    git clone https://github.com/CrunchyData/postgres-operator-examples.git
    cd postgres-operator-examples
    kubectl apply -k kustomize/install

    microk8s kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.7.1/cert-manager.yaml
```
