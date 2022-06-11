# Lost & Found in NTHU - Backend

## Architecture

The backend contains two main parts:
- Apollo GraphQL backend server
- PostgreSQL HA Cluster managed by `PGO`

Both can be deployed in a Kubernetes cluster, to achieve High Availability and resistant to crashes

## Deployment Guide

### Prerequisites
- `git`
- A K8s cluster
    - Any distributions should work
    - We recommend using `k3s`, since it integrates a `traefik` ingress controller
- `kubectl` that has access to the cluster
- `psql` command
- A Firebase project
    - configured with the Android application

### Deploy the database

First, clone the repo recursively (to fetch the `postgres-operator-examples` submodule)

```bash=
git clone git@shwu10.cs.nthu.edu.tw:109062273/team16-nthu-lost-found-backend.git --recursive

cd team16-nthu-lost-found-backend
```

Next, install the PGO postgres operator
```bash=
cd kubernetes/postgres

./init-pgo.sh
```

Use this command to check the status of the installation before going on:
```bash=
kubectl -n postgres-operator get pods \
  --selector=postgres-operator.crunchydata.com/control-plane=postgres-operator \
  --field-selector=status.phase=Running
```

When the operator is ready, we can deploy the `nthulostfound` database cluster

```bash=
kubectl apply -f nthulostfound-db.yaml
```

When the database cluster is ready, we can now connect to it using `port-forward.sh` and `psql-connect.sh`.
We will connect to the database and initialize it with `init.sql`

```bash=
# In a terminal
cd kubernetes/postgres

./port-forward.sh
```

```bash=
# In another terminal
cd kubernetes/postgres

./psql-connect.sh < init.sql
```

### Deploy the Apollo GraphQL server


First, navigate to `kubernetes/graphql`
```bash=
cd kubernetes/graphql
```


#### Customize secrets
You will have to customize the secrets:

```bash=
cp graphql-secret.example.yaml graphql-secret.yaml
```

> Note that all the secrets must be encoded in Base64 without a newline!
> Use `echo -n "SECRET" | base64` to encode them

- `SECRET` and `JWT_SECRET`
    - Server secret and JWT secret
    - can be generated using `uuidgen | base64`
- `FIREBASE_API_KEY`
    - You can get the API key following [this guide](https://firebase.google.com/docs/projects/api-keys?hl=en)
- `EMAIL_USER`, `EMAIL_PASS`
    - The SMTP account user & password

Next, we need the Firebase Admin credentials to send FCM notifications
You can get a service account JSON file here: (Replace PROJECT_NAME with the Firebase project name)
https://console.firebase.google.com/u/0/project/[PROJECT_NAME]/settings/serviceaccounts/adminsdk

After downloading it, rename it to `service-account-file.json` and deploy a secret:
```bash=
kubectl create secret generic graphql-google-secret --from-file service-account-file.json
```

### Check the config

Check the `graphql-configmap.yaml` file before applying it

### Apply the deployment

```bash=
kubectl apply -f graphql-configmap.yaml
kubectl apply -f graphql-secret.yaml
kubectl apply -f graphql-service.yaml
kubectl apply -f graphql-ingress-traefik.yaml
kubectl apply -f graphql-deployment.yaml
```

### Check the deployment

Monitor the status using
```bash=
watch kubectl get all
```

When the pods of the deployment are ready, the GraphQL welcome page should be accessible in `https://CLUSTER_IP/graphql`
