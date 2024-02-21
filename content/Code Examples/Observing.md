---
title: WIP Observables
draft: false
tags: 
date: 2024-01-29
---
```csharp
using System.Reactive.Linq;

public class FakeHub
{
    public FakeHub()
    {
        var numbers = new MySequenceOfNumbers();
        numbers
        .Throttle(TimeSpan.FromSeconds(1)) // Could use this for counters. Maybe buffer for Histograms?

        .Select(async n => await Observable.FromAsync(() => SendAsync(n)))
            .Concat()
            .Subscribe();
    }

    public async Task SendAsync(int n)
    {
        await Task.Delay(1);
        Console.WriteLine($"Sending {n}");
    }
}
```

```csharp
// See https://aka.ms/new-console-template for more information
public class MySequenceOfNumbers : IObservable<int>
{
    public IDisposable Subscribe(IObserver<int> observer)
    {
        var d = 1500;
        observer.OnNext(1);
        Thread.Sleep(d);
        observer.OnNext(1);
        Thread.Sleep(d);
        observer.OnNext(1);
        Thread.Sleep(d);
        observer.OnNext(4);
        Thread.Sleep(d);
        observer.OnNext(5);
        observer.OnNext(1);
        observer.OnNext(1);
        observer.OnNext(42);
        observer.OnCompleted();
        return System.Reactive.Disposables.Disposable.Empty; // Handy do-nothing IDisposable
    }
}
```