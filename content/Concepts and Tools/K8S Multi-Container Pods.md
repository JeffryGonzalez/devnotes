---
title: Multi-Container Pods
draft: false
tags:
  - k8s
---
## Init Containers
Run to completion before the "main" container in the pod starts. Used to initialize the "world" for the main container. (Retrieve data, apply migrations, etc.)
## Sidecar
Log shippers, etc. Usually the "business" container is unaware of the presence of the sidecar.
## Adapter
Communicated with from *outside* the pod to establish a cohesive interface.
## Ambassador/Proxy
Communication *from* the pod goes through the ambassador.

## Links

- https://itnext.io/application-architecture-for-microservices-sidecar-pattern-c5c0074e8f1d
