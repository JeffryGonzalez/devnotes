---
title: OpenTelemetry for Wolverine
draft: false
tags:
  - Wolverine
  - OpenTelemetry
---
```c# /serviceName/
var serviceName = "CritterWatch-BFF-API";  
builder.Host.ApplyOaktonExtensions();  

builder.Services.AddOpenTelemetry()  
    .ConfigureResource(r =>  
    {  
  
        r.AddService(serviceName);  
    })    .WithMetrics(metrics =>  
    {  
        metrics.AddMeter("Wolverine");  
        metrics.AddMeter("Wolverine:" + serviceName);  
    })    
    .WithTracing(tracing =>  
    {  
        tracing.AddSource("Wolverine");  
    });
    
    builder.Services.AddMarten(opts =>  
    {  
        var connectionString = builder.Configuration.GetConnectionString("database") ??  
                               throw new InvalidOperationException("No Connection String Configured");  
        opts.Connection(connectionString);  
        opts.Projections.Add<AuthSummaryProjection>(ProjectionLifecycle.Inline);  
        opts.UseDefaultSerialization(EnumStorage.AsString);  
    }).IntegrateWithWolverine()  
    .EventForwardingToWolverine(opts =>  
    {  
  
    }).UseLightweightSessions();  
  
builder.Host.UseWolverine(opts =>  
{  
    opts.ServiceName = serviceName;  
    // opts.CodeGeneration.TypeLoadMode = TypeLoadMode.Static;  
    opts.OnException<NpgsqlException>().Or<MartenCommandException>()  
        .RetryWithCooldown(50.Milliseconds(), 100.Milliseconds(), 250.Milliseconds());  
    opts.UseFluentValidation();  
    opts.Policies.AutoApplyTransactions();  
    opts.Policies.UseDurableLocalQueues();  
    opts.Policies.UseDurableOutboxOnAllSendingEndpoints();  
    });
```