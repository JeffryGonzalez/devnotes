---
title: GraphQL
draft: false
tags:
  - API
date: 2024-01-27
---

GraphQL is a protocol that tunnels inside of HTTP.  It is a query language that allows clients to request, in an ad-hoc way, data in the shape, level of detail, etc. that is needed for the application. It is considered by many to be the replacement for ODATA.

It is particularly useful for shared store resources with diverse, often unknown, clients.

Advantages:

- Flexibility for the client
    - HTTP APIs often need to be changed to support various clients.
    - GraphQL allows clients to make ad-hoc queries against the data.

Disadvantages:

- Requires data to be exposed in a particular way.
- Breaks HTTP Caching
    - Cache needs to be reinvented and reimplemented on the client.
- Performance tends to be an issue on scaling services.