---
title: SystemTime Demo
draft: false
tags:
  - dotnet
  - csharp
  - datetime
---
```csharp
using NSubstitute;

namespace TestProject1;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        var dateTimeToReturn = DateTime.SpecifyKind(new DateTime(2023, 10, 25), DateTimeKind.Local);
        DateTimeOffset dt = dateTimeToReturn;
        var fakeClock = Substitute.For<ISystemTime>();
        fakeClock.GetCurrent().Returns(dt);

        var clock = new BusinessClock(fakeClock);

        Assert.True(clock.IsBillable());


    }
    [Fact]
    public void Test2()
    {
        var dateTimeToReturn = DateTime.SpecifyKind(new DateTime(2023, 10, 28), DateTimeKind.Local);
        DateTimeOffset dt = dateTimeToReturn;
        var fakeClock = Substitute.For<ISystemTime>();
        fakeClock.GetCurrent().Returns(dt);

        var clock = new BusinessClock(fakeClock);

        Assert.False(clock.IsBillable());


    }
}

public class SystemTime : ISystemTime
{
    public DateTimeOffset GetCurrent() => DateTimeOffset.UtcNow;
}
public interface ISystemTime
{
    DateTimeOffset GetCurrent();
}

public class BusinessClock
{
    private readonly ISystemTime _systemTime;

    public BusinessClock(ISystemTime systemTime)
    {
        _systemTime = systemTime;
    }

    public bool IsBillable()
    {
        var localNow = _systemTime.GetCurrent().ToLocalTime();

        return localNow.DayOfWeek != DayOfWeek.Sunday && localNow.DayOfWeek != DayOfWeek.Saturday;
    }
}
```