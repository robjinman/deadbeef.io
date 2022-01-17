deadbeef.io
===========

Installing Kubernetes
---------------------

To install Kubernetes, e.g. on Ubuntu 20, run

```
    sudo snap install microk8s --classic
    sudo usermod -a -G microk8s $USER
    sudo chown -f -R $USER ~/.kube
```

Add the following to ~/.bashrc

```
    alias kubectl="microk8s kubectl"
```

Enable the required add-ons

```
    microk8s enable dns ingress storage
```

Install the postgres operator

```
    git clone https://github.com/CrunchyData/postgres-operator-examples.git
    cd postgres-operator-examples
    kubectl apply -k kustomize/install
```

Install psql

```
    sudo apt install postgresql-client-common postgresql-client-12
```

Building the app
----------------

Build the api docker image

```
    ./scripts/dev/build_api.sh
```

Running the app
---------------

### Development

Deploy the application locally as a kubernetes cluster.

```
    ./scripts/dev/deploy_local.sh
```

Redeploy the api layer after rebuilding.

```
    ./scripts/dev/redeploy_api.sh
```

Enable access to the database for prisma commands. This call is blocking, so should be run in a separate terminal.

```
    ./scripts/dev/forward_db_port.sh
```

Set up the local db for the first time or restore it to its initial state.

```
    ./scripts/dev/reset_db.sh
```

Update the db after changing the prisma schema. This generates a new prisma client, so the api will need to be rebuilt after this.

```
    ./scripts/dev/migrate_db.sh
```
