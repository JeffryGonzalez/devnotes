---
title: Threading in .NET
draft: false
tags:
  - dotnet
  - containers
  - threading
---
# Threading

> Excerpted and expanded from: [DotNet Core Threadpool. If you are reading this chances are… | by Jai Rathore | Medium](https://medium.com/@jaiadityarathore/dotnet-core-threadpool-bef2f5a37888)

The `Threadpool` is a native thread management system in Dotnet.

It also works as a queue for incoming requests.

At hardware level you have (usually) one thread per core of the CPU. (note: "Hyperthreading" blurs this, multiple (2) threads per core)



[Using a CancellationToken in .NET Core Web API | by Danielle | Medium](https://danielledevblog.medium.com/using-a-cancellationtoken-in-net-core-web-api-9779c39596d5)


## Counters

```shell
dotnet tool install --global dotnet-counters
```

Run 

```shell
dotnet-counters ps
```

to see running processes

```shell
 dotnet-counters monitor --process-id 47900
```







So, a 16 Core machine has 16 Processor Threads. It can do 16 things at the same time.

In DotNet each incoming request gets a new thread. Until the first `async` call or until the completion of the request, the thread is returned to the pool. If it is returned because of an async call, it takes it's context back to the pool as well. When another thread is needed (either to complete an async call or a new request) the pool is checked to see if all 16 threads are busy. If they are, it spins up another one, if not it uses one of the available threads.

So, let's say you have a burst of 1000 requests. The threadpool will grow to that size, but it still can only do 16 concurrent things. And creating and managing threads is expensive so perf takes a hit roughly linearly with the number of thread. They can eat up a lot of memory and bring the whole thing down.

To avoid this, dotnet has a *throttling* mechanism.  

Each incoming request and spawns a new thread at 0.5 second per request. 

And that adds up. It doesn't mean always that a request will have to wait, it could start, start doing some async thing, and the result of that async thing might have to wait.

This is **Thread Starvation**.

There are two settings that can help with this.

## MinimumValue
The total number of threads that can be spawned. Usually `int.Maxvalue`, 32,767.

## MaximumValue
*Not* the minimum number of threads always present. It does not start up with that number of threads. It boots with the number of threads equal to the number of CPU cores. This is the minimum number of threads that can be spawned before dotnet start the thread throttling process. It's a threshold limit. **The default is the number of CPU cores**.

This can be increased in a pinch, but not overall recommened (there is a reason there is the throttle, afterall.)

### Note:
.NET 7 Has Rate Limiting.



## TLDR: Don't Block Threads!

No `.Result()`, `.Wait()`, `.GetResult()`