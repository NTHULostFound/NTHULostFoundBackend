#! /bin/bash

git submodule update --init

kubectl apply -k postgres-operator-examples/kustomize/install/namespace
kubectl apply --server-side -k postgres-operator-examples/kustomize/install/default
