---
title: gRPC
draft: false
tags:
  - API
date: 2024-01-27
---

gRPC is a cross-platform protocol for service communication. It relies on HTTP/2, and is similar to websockets, but with an emphasis on performance and overcoming the limitations of HTTP.

Microsoft considers gRPC to be the replacement for WCF.

It gains a huge performance benefit because data is passed in a binary format defined by Protobuf schema, overcoming the limitations of JSON serialization/desexualization.

Advantages:

- Speed
    - Much faster in most scenarios than other approaches.
- Strong Contracts
    - Protobuf is an expressive format for designing service interfaces and messages, with built-in support for common versioning scenarios.
- Expressive call models
    - gRPC allows for the following call models:
        - Request/Response - similar to HTTP
        - Client streaming - the client streams data over time using a persistent connection to the server.
        - Server streaming - the server streams data over time using a persistent connection to the client.
        - "Unit" - bi-directional client/server streaming.

Disadvantages:

- Still RPC
    - As discussed below in [Integration Patterns](#integration-patterns), RPCs are tight-coupling.
    - They suffer from network errors (transient, and actual), and must be designed to accommodate that (retries, etc.)