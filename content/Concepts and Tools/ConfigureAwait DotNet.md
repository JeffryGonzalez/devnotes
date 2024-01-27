---
title: ConfigureAwait
draft: false
tags:
  - dotnet
  - csharp
  - threading
date:
---
## ConfigureAwait

[.net - ConfigureAwait(false) relevant in ASP.NET Core? - Stack Overflow](https://stackoverflow.com/questions/42053135/configureawaitfalse-relevant-in-asp-net-core)

.NET Core APIs do not have a `SynchronizationContext` by default so you don't need it. `ConfigureAwait(false)` is saying "I don't need this to be completed by the same context (thread)", but since that doesn't exist in .NET core, it is a noop.  

It **is** useful on tasks running in a UI - like a windows app. Because it has to continue on the UI thread.

## Cancellation Token

```csharp
public class SlowRequestController : Controller
{
    private readonly ILogger _logger;

    public SlowRequestController(ILogger<SlowRequestController> logger)
    {
        _logger = logger;
    }

    [HttpGet("/slowtest")]
    public async Task<string> Get(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting to do slow work");

        // slow async action, e.g. call external api
        await Task.Delay(10_000, cancellationToken);

        var message = "Finished slow delay of 10 seconds.";

        _logger.LogInformation(message);

        return message;
    }
}
```

Great stuff here: [Using CancellationTokens in ASP.NET Core MVC controllers (andrewlock.net)](https://andrewlock.net/using-cancellationtokens-in-asp-net-core-mvc-controllers/)
