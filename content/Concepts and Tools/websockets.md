---
title: Websocket Services
draft: false
tags:
  - API
  - integration-pattern
date: 2024-01-27
---
### Websocket Services

Websockets are a technology most commonly utilized in Apps running in web browsers, however support for them in other native client applications development environments is also supported.

A Websocket connection begins life as an HTTP connection, and then "downgrades" to a (nearly) raw TCP socket. This alleviates the constraints on TCP applied by HTTP. Namely:

Advantages:

- Connected
    - Websocket clients maintain a persistent connection to their server.
- Two-Way
    - The Request/Response constraint is dropped and servers can send messages to the client over time.
    - Data can be simultaneously sent and received across the connection.
- Nearly instantaneous
    - Websockets are used in real-time games, video streaming, and other high demand, low(er) latency settings.
- Fairly Simple
    - Client and Server libraries for Websocket communication make this kind of service fairly easy to implement.
    - .NET has the SignalR client and server libraries for implementing websockets. Other libraries exist (for NodeJS, Go, Java, etc.)

Disadvantages:

- The biggest disadvantage is the requirement for server *affinity*.
    - Clients that connect to a particular server using websockets generally have to maintain that connection with that specific instance of the service for the life of the connection.
    - This can be slightly challenging in load-balanced scenarios, and requires extra configuration of your reverse proxy or ingress.
- Websockets require an HTTPs  connection
    - Not a huge disadvantage, but something to be aware of.
- No Strong Contracts
    - While OpenAPI provides some limited support for specifying websocket communication, websocket messaging is mostly ad-hoc.


