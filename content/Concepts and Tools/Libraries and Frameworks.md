---
title: Libraries and Frameworks
draft: false
tags: 
date: 2024-02-19
---
I sometimes hear developers use the terms "library" and "framework" almost interchangeably. It's understandable because *sometimes* the differences can be confusing, and sometimes the creator of a library or framework doesn't really know the difference.

## Libraries

Libraries are almost always expedients. Some code that someone else wrote, that, if given enough time, you could write it to. Your decision to use a particular library could be simply to save time, or it could be because the library provides some functionality that is very precise or specific and requires lots of technical knowledge. Sometimes libraries are provided by a vendor as a way to interface with their product. An example would be use the IBM DB2 library for .NET.  If you are working for a company selling widgets, they probably don't want you to spend weeks or months implementing a network library for securely connecting to a database. If you were writing code to make an HTTP request from a .NET application, you could study up on socket programming, TCP, and read RFC 2616 and implement the HTTP protocol, or you could use the provided library for HTTP in .NET.

They are not very opinionated in terms of the application you are building, or any particular architectural style. Most libraries are fairly easy to learn and to use and provide great value. Since libraries are pretty general purpose, they do tend to get "bloated" over time. Since they don't have any opinions on how you write your application, you often run into "edge cases" that your  application needs that are not covered by the library. Your code then becomes a sort of negotiating session with the library, you end up wrapping it up, extending it, and eventually the code you have created to accommodate your cases for the library are actually more complex than if you didn't use it at all.

> [!hint] A library is code that your code uses.
> Your code is still at the center, it just helps out and saves some time.

Libraries, like Frameworks, are *early bound*. Your application takes a dependency on a specific version of a library, and will not receive the benefits (or bug fixes) of new versions of that library until you update it, rebuild, and re-deploy your application.

For this reason, you might want to resist the temptation to take a dependency on a library or framework that has a drastically different rate of change then your application.  They are *not* suitable for sharing "business rules" across projects, for example. 

A good library author is saying "Hey, I've done this specific thing a bunch of times, and I sort of have it figured out to the point where you might find it useful in your applications as well."

One of my favorite examples of a *great* library (and I'm going to show my age here a bit) is the venerable jQuery JavaScript library. It's used on something like 80% of the top websites in the world, and it has absolutely *no* opinion on what kind of website you are building. It just is there (globally) to sort of help you do things that are hard (or were hard) on the web. It's only real "opinion" was that it would run in a web browser. You could use it to make a website for your band, your company, the government, online games, whatever. 
## Frameworks

Frameworks are more opinionated than libraries. They are used for building specific types of applications. They are not simply a box of utilities that you decide to use or not use.  The best frameworks are extracted from running applications after they have proven themselves
as a worthwhile tool to generalize for other applications. Even frameworks that can be used in lots of different contexts have hard opinions on how they "think" things should be done. For example, Microsoft's Entity Framework says "Ok, you are using a relational database, and you want to retrieve data into objects, and have those objects state tracked so that can be synchronized back to the database when you are ready." Then structure your code this way. Create a class that extends `DbContext`, create your entities *this way*. Oh, we think the best way to build applications is to not let them share an existing database, so that is the easy way to do it. You *can* use shared databases, but it's going to hurt a bit. Maybe more than it is worth to get the benefits of using Entity Framework, but you do you.

Even ASP.NET Core, as a framework, has opinions. You either create classes that extend some base `Controller` class, decorate things with some attributes so the framework will know that it should create an instance of your `CustomerController` class when an `HTTP GET` request is made, and which method to execute.

Things usually get turned on their head a bit when using frameworks instead of libraries. Libraries are more polite and unassuming. "Just here to help, boss! Let me know if you need anything!". Frameworks on the other hand are more *authoritarian*, meaning they *claim* to be an authority on a specific type of application. Needing to overcome the Object Relational Impedance Mismatch? Entity Framework has you covered. Need to create a website with server-side processing? ASP.NET Core with Razor Pages know how that *is done*.  

A good framework author is saying "Hey, I've built this *kind* of application many times, and I sort of have it figured out to the point where, if you are building a similar type of application, this may save you some time".

A Framework is someone else's code you build your application upon. Frameworks use various mechanisms to "hook into" your code and give it super powers. Sometimes there are classes you extend, services you register, interfaces to implement, or attributes you apply to your types. 
These are all ways to make your code connascent with the framework. They typically do not provide good separation between your code and the framework code.

A problem with frameworks is they really are *connascent* with your code. That just means something like "they are born and grow up together". An ASP.NET Core controller class isn't a normal .NET class. It can't really do anything for you, without the guiding hand of the *authority*, the framework, instantiating it for you. 

Notice what a pain in the butt it is to try to write unit tests for things like Entity Framework, or ASP.NET Core Controllers or Minimal APIs? Your tests have to reference the same frameworks as your application. Most of your test will be setting up stubs and mocks for code that you don't even own or control. It's so hard that we come up with all sorts of excuses and justifications for implementing things like "Clean Code" to "abstract" everything away, make it *replaceable*, etc.  Meanwhile onboarding new developers, even if they are competent C# developers (for example), means they have to know become *NAME OF YOUR APPLICATION HERE* developers. "Where in the *hell* are the validators in this application, anyhow? I know it's in one of these 22 class libraries *somewhere*!"

> [!tip] I was talking to an Angular developer recently and he told me they are always afraid to upgrade to the latest version. When they do, as far as they can tell, their app works just as well as before, sometimes even better. But *a bunch of their tests break* and they have to take the time to fix them. This is because the tests are mimicking and relying on the internal implementation of the framework. If that changes, even for the better, your tests will break.
> 

Surprisingly, we sort of get a Stockholm Syndrome type thing going with these code bases. After we learn the "conventions" of an application, we start to identify with it. We identify with the *authority* of the framework you are using. We say "Why of *course* you have to put that empty marker interface on this type. It's *for the framework*". And then justify it by saying "Well, how *else* would a developer know that this method called `Handle` that takes an argument of type `PlaceOrderCommand` would actually, uh, handle the place order command? THERE IS NO INTERFACE! YOU AREN'T INHERITING SOMETHING!".  

> [!warning] When you start thinking your code is superior because it is sprinkled with all sorts of interfaces, base classes, and attributes by someone else, you make have Framework Stockholm Syndrome

And I bet your tests *suck*. They aren't as meaningful as they could be. When another developer reads your test, are they able to see it as *documentation* on how something in your application works? If you are writing a test for how the `PlaceOrder` command is processed, how much of the code is aligned with the business of placing orders, and how much of it is with the business of your framework?

Even when you do figure out how to test this stuff, you just don't do it enough. Your confidence comes from your ability to add the right *types* to things, and the *magic* of the framework to somehow pull it all together. Meanwhile when you get a defect for shipping to non-existent addresses or something, can you find those tests?

One of the main reasons for things like having to implement interfaces, derive from a base class, add attributes, etc. when working with frameworks in .NET is because the framework needs to know *something* about your code to do it's thing. 

The framework will "know" about your code because it shares *its* code. That `ControllerBase` class your API controller extends is *not your code*. The `[HttpPost]` attribute on a method of that class is so the framework will know what that method is *for*. 

Another way for a framework to have the necessary familiarity and insight into your code is to proscribe *conventions*. 

For example, I learned Unit Testing with Java many years ago. There was (still is!) a testing library for Java called "jUnit". Java did not have at the time attributes. It didn't make sense to have your test classes have to inherit from some class or implement an interface. What you did is you followed the documented conventions. When you ran your tests, it would look for any public classes that ended in the word "Tests". The test runner would create an instance of that class, and then look for any methods that were `void`, parameterless methods that ended in the word "`Test'".

So you might have a class in your test suite called `CustomerTests`, and some methods on it like `CanIncreaseBalanceTest` or `CanSendJunkMailTest`. The jUnit library would use "runtime type inspection" - the so-called "fourth pillar" of Object Oriented programming, to look at those classes at runtime for those specific names. If you misspelled a test name for example (e.g. `CanSendJunkMailTst`), it simply would not see it, and not run it.

No `[TestMethod]` or `[Fact]` attributes, just spelling things right. 

The problem with this convention approach is, yeah, it can be a little flaky and annoying. You have to *learn and abide by the conventions*, and more importantly, it relied on runtime type inspection (called "Reflection" in .NET) and your favorite YouTube personality has said over and over that reflection is *bad*. Well, sometimes it is. It is often way slower than direct, early binding.

I remember in the early days of ASP.NET MVC, they used a *lot* of conventions for things like routing.  It was called "ConventionalRouting" and it was *totally* based on reflection and naming things [[Routing to controller actions in ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing?view=aspnetcore-8.0#conventional-routing)

It wasn't particularly slow, because the reflection to find those routes happened at application startup. When your app started, as part of the boot-up process, it would use reflection to find all the routes that matched the conventions, and create a "route table". After that initial delay in starting your API, requests were fulfilled from this route table.

This was the time when there was no difference for us, as lowly developers, between build time and run time. 

What if those conventions could be used and *verified* at *build time*? You could get build warnings or errors when you compile your application if you didn't follow the conventions.

### Enter Roslyn

Microsoft introduced a new C# compiler *years* ago called "Roslyn". It is a C# compiler written in C# (feels good, man), and it is a "compiler as a service". That means you can actually get in on the build process with your own code. You can write code that is *only* used during the build of your application that uses reflection to verify stuff - like your frameworks conventions being followed. This can also be used by your IDE as you write the code. For example, create an xUnit test class and add a method without the `[Fact]` or `[Theory]` attribute on it. You'll get a warning from the compiler. The C# compiler doesn't know about these things, it's the code provided by the xUnit team to *analyze* your code with the compiler.

If you think about it, with this example, this is pretty close to exactly what we want. The old "icky" Java thing with reflection would just silently be ignored. Of course, an xUnit test will be ignored if you don't have the proper attribute on it. With Roslyn, it can warn you about it. 


