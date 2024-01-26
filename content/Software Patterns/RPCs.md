---
title: Remote Procedure Calls
draft: false
tags:
  - networking
  - distributed
---
### Remote Procedure Calls

A remote procedure call is when, in your code you call a method that *could* reasonably be on some code in the same process as your code, but is actually running in another process, across some sort of boundary (network, usually).

For example, in the following snippet:

```csharp
var balance = await _account.GetBalance();
// do something with the balance
```

The implementation of the `GetBalance()` method could be some code running locally, or it could be a proxy around a network call of some sort.

👍 Advantages:

- Easy to reason about.
    - Because RPCs look like local procedure calls, they are familiar.
    - Usually are "request/response", and the response can be used immediately.
    - Can be run in parallel if making several related calls.
- Software tooling can make this almost *too* easy.
    - Clients for HTTP Services and gRPC services can be *generated* based on schema or specification.

⚠️Disadvantages :

- Super tight coupling
    - RPCs assume the continuous presence and reliability of the remote service and the intervening network.
    - Contract changes on the remote service can break the RPC
- Performance
    - Particularly for Request/Response RPCs performance is uneven.
    - Degraded performance in a service you rely upon impacts the performance of your service.
- Transient Network Errors
    - RPC calls must have policies in place to accommodate transient network issues, including service upgrades/restarts.
- Failure
    - Outright failures of the remote service must be anticipated. A remote service failing is not sufficient reason for your service to fail.
        - This can be not only a reliability issue, but a security issue. Poorly designed service interactions can cause unintentional (or malicious) "denial of service" like failures in a microservice architecture.
- "Shotgun" Changes:
    - The introduction of a new service in the solution often requires multiple new versions of services to call that new service. 