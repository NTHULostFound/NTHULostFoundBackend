#! /bin/bash

PG_CLUSTER_PRIMARY_POD=$(kubectl get pod -o name \
  -l postgres-operator.crunchydata.com/cluster=nthulostfound,postgres-operator.crunchydata.com/role=master)
kubectl port-forward "${PG_CLUSTER_PRIMARY_POD}" 5432:5432
