---
title: Observability
draft: false
tags:
  - devops
date: 2024-02-18
---
https://opentelemetry.io/docs/concepts/observability-primer/#what-is-observability

> Observability lets us understand a system from the outside, by letting us ask questions about that system without knowing its inner workings. Furthermore, it allows us to easily troubleshoot and handle novel problems (i.e. “unknown unknowns”), and helps us answer the question, “Why is this happening?”


## Telemetry
Data emitted from a running system.

### Metrics
Stats about your applications, things like memory, cpu, network, SQL calls, HTTP, etc.

> **Metrics** are aggregations over a period of time of numeric data about your infrastructure or application. Examples include: system error rate, CPU utilization, request rate for a given service.

### Logs
Records of system events.

> A **log** is a timestamped message emitted by services or other components. Unlike [traces](https://opentelemetry.io/docs/concepts/observability-primer/#distributed-traces), however, they are not necessarily associated with any particular user request or transaction.

Logs are often added as spans in traces.

### Traces
How requests flow through a system, or across systems.

> A **distributed trace**, more commonly known as a **trace**, records the paths taken by requests (made by an application or end-user) as they propagate through multi-service architectures, like microservice and serverless applications.


## Tools

### Tracing (Distributed Tracing)
[Jaeger](https://www.jaegertracing.io/)
[Zipkin](https://zipkin.io/)

### Metrics (and Alerts)
[Prometheus](https://prometheus.io/)

### Visualization / Dashboards, etc.

[Grafana](https://grafana.com/)
