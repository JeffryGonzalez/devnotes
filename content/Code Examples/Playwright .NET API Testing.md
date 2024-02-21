---
title: Playwright .NET API Testing
draft: false
tags:
  - "#testing"
  - "#API"
  - playwright
date: 2024-02-21
---
Testing using Playwright for .NET APIs

## Packages

```xml
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.8.0"/>
<PackageReference Include="Microsoft.Playwright" Version="1.41.2" />
<PackageReference Include="Microsoft.Playwright.NUnit" Version="1.41.2" />
<PackageReference Include="NSubstitute" Version="5.1.0" />
<PackageReference Include="NSubstitute.Analyzers.CSharp" Version="1.0.17">
```


## Custom WebApplicationFactory

```csharp
using System.Net;
using System.Net.Sockets;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BusinessClockApi.ContractTestsPlaywright;


public class PlaywrightWebApplicationFactory
    : WebApplicationFactory<Program>
{
    private IHost? _host = null;
    protected override IHost CreateHost(IHostBuilder builder)
    {
        var testHost = builder.Build();
        builder.ConfigureWebHost(whb => whb.UseKestrel(opts =>
        {
            opts.Listen(IPAddress.Loopback, GetRandomUnusedPort());
        }));

         _host = builder.Build();
         
        _host.Start();
        var server = _host.Services.GetRequiredService<IServer>();  
        var addresses = server.Features.Get<IServerAddressesFeature>();  
 
        ClientOptions.BaseAddress = addresses!.Addresses  
            .Select(x => new Uri(x))  
            .Last();  
        
        testHost.Start();  
        return testHost;  
    }

    public string ServerAddress  
    {  
        get 
        {  
            EnsureServer();  
            return ClientOptions.BaseAddress.ToString();  
        }  
    }
    private void EnsureServer()  
    {  
        if (_host is null)  
        {  
            // This forces WebApplicationFactory to bootstrap the server  
            using var _ = CreateDefaultClient();  
        }  
    }
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(ConfigureServices);
    }

    protected virtual void ConfigureServices(IServiceCollection serviceProvider)
    {
        // could make this abstract, but this is a template method.
    }
    protected override void Dispose(bool disposing)
    {
        _host?.Dispose();
    }

    // From https://khalidabuhakmeh.com/end-to-end-test-with-aspnet-core-xunit-and-playwright
    private static int GetRandomUnusedPort()
    {
        var listener = new TcpListener(IPAddress.Any, 0);
        listener.Start();
        var port = ((IPEndPoint)listener.LocalEndpoint).Port;
        listener.Stop();
        return port;
    }
}
```

## Concrete Fixtures

```csharp
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;

namespace BusinessClockApi.ContractTestsPlaywright.GettingStatus;

public class ClosedFixture : PlaywrightWebApplicationFactory
{
    protected override void ConfigureServices(IServiceCollection serviceProvider)
    {
        var openClock = Substitute.For<IProvideTheBusinessClock>();
        openClock.IsOpen().Returns(false);
        serviceProvider.AddScoped(sp => openClock);
    }
}
```

```csharp
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;

namespace BusinessClockApi.ContractTestsPlaywright.GettingStatus;

public class OpenFixture : PlaywrightWebApplicationFactory
{
    protected override void ConfigureServices(IServiceCollection serviceProvider)
    {
        var openClock = Substitute.For<IProvideTheBusinessClock>();
        openClock.IsOpen().Returns(true);
        serviceProvider.AddScoped(sp => openClock);
    }
}
```


## Test Cases

```csharp
using System.Text.Json;
using Microsoft.Playwright.NUnit;

namespace BusinessClockApi.ContractTestsPlaywright.GettingStatus;

public class GettingStatusWhenClosed(ClosedFixture fixture) : PageTest, IClassFixture<ClosedFixture>
{
    private readonly string _serverAddress = fixture.ServerAddress;

    [Fact]
    public async Task ReturnsContractedSupport()
    {
        using var playwright = await Microsoft.Playwright.Playwright.CreateAsync();
        var apiRequest = await playwright.APIRequest.NewContextAsync(new()
        {
            BaseURL = _serverAddress
        });

        var response = await apiRequest.GetAsync("support-info");
        Assert.True(response.Ok);
        var expected = new SupportInfoResponse("TechSupportPros", "800-STUF-BROKE");
        
        var actual = await response.JsonAsync<SupportInfoResponse>(new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        Assert.Equal(expected, actual);
    }
    
}
```

```csharp
using System.Text.Json;
using Microsoft.Playwright.NUnit;

namespace BusinessClockApi.ContractTestsPlaywright.GettingStatus;

public class GettingStatusWhenOpened(OpenFixture fixture) : PageTest, IClassFixture<OpenFixture>
{
    private readonly string _serverAddress = fixture.ServerAddress;

    [Fact]
    public async Task ReturnsContractedSupport()
    {
        using var playwright = await Microsoft.Playwright.Playwright.CreateAsync();
        var apiRequest = await playwright.APIRequest.NewContextAsync(new()
        {
            BaseURL = _serverAddress
        });

        var response = await apiRequest.GetAsync("support-info");
        Assert.True(response.Ok);
        var expected = new SupportInfoResponse("Graham", "555-1212");
        
        var actual = await response.JsonAsync<SupportInfoResponse>(new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        Assert.Equal(expected, actual);
    }
    
}
```