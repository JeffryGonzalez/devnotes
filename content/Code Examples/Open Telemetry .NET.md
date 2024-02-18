---
title: OpenTelemetry ,NET
draft: false
tags: 
date: 2024-02-18
---


Packages

```xml
<PackageReference Include="OpenTelemetry.Exporter.Console" Version="1.7.0" />
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.7.0" />
<PackageReference Include="OpenTelemetry.Exporter.Prometheus.AspNetCore" Version="1.7.0-rc.1" />
<PackageReference Include="OpenTelemetry.Exporter.Prometheus.HttpListener" Version="1.7.0-rc.1" />
<PackageReference Include="OpenTelemetry.Exporter.Zipkin" Version="1.7.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.7.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.7.1" />
<PackageReference Include="OpenTelemetry.Instrumentation.Http" Version="1.7.1" />
<PackageReference Include="OpenTelemetry.Instrumentation.Runtime" Version="1.7.0" />
```

Docker Compose:

```yml
services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
    ports:
      - 9090:9090
    restart: unless-stopped
    volumes:
      - ./prometheus:/etc/prometheus
      - prom_data:/prometheus
  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - 3000:3000
    restart: unless-stopped
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=grafana
    volumes:
      - ./grafana:/etc/grafana/provisioning/datasources
  zipkin:
    image: openzipkin/zipkin
    container_name: zipkin
    ports:
      - 9411:9411
    restart: unless-stopped
volumes:
  prom_data:

```

In the folder with the above `docker-compose`, create a folder called `grafana` and place this:

```yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
    access: proxy
    editable: true
```

In the folder with the above `docker-compose`, create a folder called `prometheus` and place this:

```yml
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"
    scrape_interval: 1s # poll very quickly for a more responsive demo

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["host.docker.internal:8080"]

```

> [!Note] This is assuming your API is running on the localhost at 8080. Set your `launchsettings.json` appropriately.


The `appsettings.json` file:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    },
    "OpenTelemetry": {
      "IncludeFormattedMessage": true,
      "IncludeScopes": true,
      "ParseStateValues": true
    }
  },
  "AllowedHosts": "*"
}

```

Create a `WeatherMetrics.cs` class with this:

```csharp
using System.Diagnostics;
using System.Diagnostics.Metrics;

namespace OtDemo;

public class WeatherMetrics : IDisposable
{
    internal const string ActivitySourceName = "WxForecast";
    internal const string MeterName = "WxMeters";

    private Counter<int> WxRequested { get; }
    private Histogram<double> WxDistributions { get; }

    private readonly Meter meter;

    public WeatherMetrics()
    {

        string? version = typeof(WeatherMetrics).Assembly.GetName().Version?.ToString();
        this.ActivitySource = new ActivitySource(ActivitySourceName, version);

        meter = new Meter(MeterName, version);

        WxRequested = meter.CreateCounter<int>("wx.requested", "Times", "Number of times weather was requested");

        WxDistributions = meter.CreateHistogram<double>("wx.temp.distributions", "Temperature", "The Temperatures");
        


    }
    public ActivitySource ActivitySource { get; }



    public void IncrementWxRequested()
    {
        WxRequested.Add(1);
    }

    public void SetWxDistributions(params double[] temps)
    {
        foreach (var temp in temps)
        {
            WxDistributions.Record(temp);
        }
    }

    public void Dispose()
    {
        this.ActivitySource.Dispose();
        this.meter.Dispose();
    }
}

```

In the `program.cs` file, add this:

```csharp
builder.Services.AddOpenTelemetry()
    .ConfigureResource(b => b.AddService("weather-api"))
    .WithTracing(b => {
        b.AddAspNetCoreInstrumentation().AddConsoleExporter().AddZipkinExporter().AddHttpClientInstrumentation();
        b.AddSource(WeatherMetrics.ActivitySourceName)
        .SetSampler(new AlwaysOnSampler());
    })
    .WithMetrics(opts =>
    {
        opts.AddMeter(WeatherMetrics.MeterName);
        opts.AddPrometheusExporter();
        opts.AddHttpClientInstrumentation();
        opts.AddRuntimeInstrumentation();
        opts.AddAspNetCoreInstrumentation();
    });
```

Add the Metrics and the HttpClient:

```csharp
builder.Services.AddSingleton<WeatherMetrics>();
builder.Services.AddHttpClient();
```

For Logging, in `program.cs`:

```csharp
builder.Logging.ClearProviders();
builder.Logging.AddOpenTelemetry(options =>
{
    var resourceBuilder = ResourceBuilder.CreateDefault();
    resourceBuilder.AddService("weather-api");
    options.SetResourceBuilder(resourceBuilder);

    options.AddOtlpExporter(oltpOptions =>
    {
        oltpOptions.Endpoint = new Uri("http://localhost:9090"); // Prometheus
    });
    options.AddConsoleExporter(); // So we can see it too.
});
```

Before the `app.run()` add this:

```csharp
app.MapPrometheusScrapingEndpoint();
app.Run();
```


The Get request can have this:

```csharp
app.MapGet("/weatherforecast", async (WeatherMetrics meters, HttpClient client) =>
{
    using var scope = app.Logger.BeginScope("{Id}", Guid.NewGuid().ToString("N"));


    var res = await client.GetStringAsync("https://www.google.com");

    using var activity = meters.ActivitySource.StartActivity("getting forecast");

    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();

    meters.IncrementWxRequested();
    var dist = forecast.Select(f => (double)f.TemperatureC).ToArray();
    meters.SetWxDistributions(dist);
    app.Logger.LogInformation("Weather Forecast Created {count} {forecasts}", forecast.Length, forecast);
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();
```

## The Urls:

For Zipkin: http://localhost:9411

For Prometheus: http://localhost:9090

For Grafana: http://localhsot:3030 (username is Admin password is grafana).

Some pre-made Grafana dashboards for .NET [aspire/src/Grafana/dashboards at main · dotnet/aspire (github.com)](https://github.com/dotnet/aspire/tree/main/src/Grafana/dashboards)

