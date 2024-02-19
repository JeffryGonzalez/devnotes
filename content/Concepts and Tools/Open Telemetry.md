---
title: OpenTelemetry
draft: false
tags:
  - concepts
  - observability
  - metrics
  - tracing
---
> OpenTelemetry is an [Observability](https://opentelemetry.io/docs/concepts/observability-primer/#what-is-observability) framework and toolkit designed to create and manage telemetry data such as [traces](https://opentelemetry.io/docs/concepts/signals/traces/), [metrics](https://opentelemetry.io/docs/concepts/signals/metrics/), and [logs](https://opentelemetry.io/docs/concepts/signals/logs/). Crucially, OpenTelemetry is vendor- and tool-agnostic, meaning that it can be used with a broad variety of Observability backends, including open source tools like [Jaeger](https://www.jaegertracing.io/) and [Prometheus](https://prometheus.io/), as well as commercial offerings.

> OpenTelemetry is not an observability backend like Jaeger, Prometheus, or other commercial vendors. OpenTelemetry is focused on the generation, collection, management, and export of telemetry. A major goal of OpenTelemetry is that you can easily instrument your applications or systems, no matter their language, infrastructure, or runtime environment. Crucially, the storage and visualization of telemetry is intentionally left to other tools.

From https://opentelemetry.io/docs/what-is-opentelemetry/

## Links

- *THE* Site: [OpenTelemetry](https://opentelemetry.io/)
- [Getting telemetry data from inside or outside a .NET application - Meziantou's blog](https://www.meziantou.net/getting-telemetry-data-from-inside-or-outside-a-dotnet-application.htm)
	- Great stuff for capturing stuff inside the application.
- [OpenTelemetry in .NET Explained - YouTube](https://www.youtube.com/watch?v=LPh1YzIc39U&t=9s)
- [Building End-to-End Diagnostics: ActivitySource and OpenTelemetry 1.0 (jimmybogard.com)](https://www.jimmybogard.com/building-end-to-end-diagnostics-activitysource-and-open/)
	- Some good stuff for ActivitySource stuff.