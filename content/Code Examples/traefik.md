---
title: Traefik K3S Config
draft: false
tags:
  - k8s
  - ingress
---
# Using Traefik (Rancher Desktop, K3S)

## Get IP of Traefik

```shell
kubectl get service -n kube-system traefik 
```

Provides:

```shell
NAME      TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)                      AGE
traefik   LoadBalancer   10.43.159.15   172.20.152.99   80:30834/TCP,443:31139/TCP   12h
```

### Add to Hosts File

Hosts file on Windows is `C:\Windows\System32\drivers\etc\hosts`.


```
172.20.99.64 hypertheory.com
172.20.99.64 api.hypertheory.com
```

## Dashboard

```shell
kubectl port-forward -n kube-system $(kubectl -n kube-system get pods --selector "app.kubernetes.io/name=traefik" --output=name) 9000:9000
```

Go to 'http://localhost:9000/dashboard/'

## Middleware

### Stripping Prefix

```yaml
apiVersion: traefik.containo.us/v1alpha1

kind: Middleware

metadata:

  name: stripprefix-regex

spec:

  stripPrefixRegex:

    regex:

      - ^\/\w+\/\w+\/
```


### CORS

```yaml
apiVersion: traefik.containo.us/v1alpha1

kind: Middleware

metadata:

  name: cors-promiscuous

  namespace: intro

spec:

  headers:

    accessControlAllowMethods:

      - "GET"

      - "OPTIONS"

      - "PUT"

      - "POST"

      - "DELETE"

    accessControlAllowOriginList:

      - "*"

    accessControlMaxAge: 100

    accessControlAllowHeaders:

      - "*"

    addVaryHeader: true
```



## Apply Middlewares to Ingress

(Get the middlwares names by)

```yaml
apiVersion: networking.k8s.io/v1

kind: Ingress

metadata:

  name: courses-api-ingress

  labels:

    name: courses-api-ingress

  annotations:

    traefik.ingress.kubernetes.io/router.middlewares: intro-cors-promiscuous@kubernetescrd,intro-stripprefix-regex@kubernetescrd

  

spec:

  rules:

    - host: "api.hypertheory.com"

      http:

        paths:

          - pathType: Prefix

            path: "/training/v1"

            backend:

              service:

                name: courses-api-service

                port:

                  number: 80
```

Get the names from:

`[Traefik](http://localhost:9000/dashboard/#/http/middlewares)'

## Forward Auth with OIDC

https://github.com/sleighzy/k3s-traefik-forward-auth-openid-connect

