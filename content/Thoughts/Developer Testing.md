---
title: Developer Testing
draft: false
tags:
  - testing
date: 2024-01-27
---
# Developer Testing

I'm a software developer, and one part of my work is teaching specific software development skills to other developers. I don't so much teach how to go from zero to "Hello World". I don't teach what a variable is, what a method or function is, etc. I teach professional software developers that already received that kind of training in other contexts.

So, for example, I might teach a group of developers how to create a front-end web application using something like Angular. How to build applications that meet customer requirements, and do it with some elegance. 

I also teach developers how to write services that run on on premesis infrastructure, or "In the Cloud". HTTP-based APIs that are used by customer facing applications, gRPC services used internally, event-driven services that talk to each other by passing notes, that kind of thing.

Each one of these examples - and there are others - there is a *lot* to teach. There is a lot to learn. A ton of new concepts to get your head around. Each one of these areas has its own set of concepts and metaphors you have to get used to. RxJs in Angular has "streams", that go through "pipes", and you "observe" stuff with code. Stuff that happens over time. For an HTTP API you have to learn the metaphors for not only the particular framework you are using (ASP.NET Core MVC? NestJs? Gin?), but also the time-proven metaphors of the HTTP application-layer protocol itself. Resources. Authorities. Headers. Methods. 

It's a lot. Not too much, because it sure is easier (usually) adopting someone else's *proven* conceptual model than developing your own. If, for example, you wanted to develop a protocol for applications to talk to each other in a stateless, client-server, message passing way over the internet, it's hard to discount the success of the WorldWideWeb, and, therefore, HTTP.

Now there are some pretty smart people that have figured out a lot of this stuff for us already. They think about it a lot, and it works pretty well. They build the protocols, the operating systems, the networks, the libraries, the frameworks, all that stuff that we inherit and use to put to a specific use. 

> Taking something general purpose and putting it to specific use is called *Application*.

## Application Development
That is the lion's share of what I do. I take tools of various generality and put them to use for a particular thing. I create an *application* of the general things. 

I stand on the shoulder's of giants. To those of you software developers that specialize on creating general things that I use, I owe you. A lot. Without operating systems, databases, networks, programming environments and languages, compilers, libraries, frameworks, testing tools, etc. meant to be used by people creating applications, I probably would have quit this gig a long time ago. 

I'm not one of these developers that say everyone in the business should learn assembler, or C, or whatever "first". **But**, get yourself a C compiler, and allow yourself only the C standard library, a copy of "Teach yourself C Programming in 24 Hours or Less" and see what you come up with. I mean, it will be *fun*. I mean that non-ironically. It will be educational. But then after those 24 hours look at whatever it is you've created with pride. And then think "how much of this would I have to write to create a database engine? Or a file system? Or a programming language?". **Humbling** stuff.

This is why people in our business mention names like:

- Grace Hopper: Compilers. COBOL
- Kernigan and Ritchie: C Programming Language, UNIX
- Ken Thompson: Unix
- Tim Berners Lee: The WorldWideWeb
- Anders Hejlsberg: C#, Turbo Pascal, Delphi, TypeSript
- Guido van Rossum: Python Programming Language
- Yukihiro Matsumoto: The Ruby Programming Language
- Edgar Codd: SQL and Relational Databases
- Vint Cerf: TCP/IP

 And so many more, we do it with some reverence on our lips.  These people went beyond just creating "applications" - something that delivers (near?) immediate business value. They created some of the very bedrock upon which our profession stands.

Working at that level - what we might call "systems programming", or "framework programming", or "language design" is a huge act of generosity. It takes *tremendous* effort. Of course none of these people worked alone. They built on previous work, worked with scores of developers while building their "thing", and scores of developers have added to and refined what they've created over the years. 

> To believe your own thought, to believe that what is true for you in your private heart, is true for all men - that is genius... Whoso would be a man must be a nonconformist... What I must do, is all that concerns me; not what the people think... Nothing can bring you peace but yourself; nothing, but the triumph of principles. - Ralph Waldo Emerson

This quote is, perhaps, a little hyperbolic for these example, but there is something really admirable in saying "I am going to build this thing and I believe (in my 'private heart') that this will be a good thing for you, too". Grace Hopper said, basically "There has *got* to be a more reasonable way for us to provide instructions to computers than *this*",  and created a language. And the compiler. Sir Tim Berners-Lee said something like "Hey, this decentralized internet thing that Vint Cerf and the gang created is great. Wouldn't it be great if we could create a decentralized way of sharing data?" and created the WorldWideWeb.

And that's a **big freaking deal**. That is a *lot* of responsibility. Because, frankly, if it sucks, nobody will use it. But if it sucks not too much, people will use it, then get mad at your when it doesn't work. Wow bother? 

Because of the amount of *generality* those tools provide (anything is possible on ~zombo.com~, the WorldWideWeb!), the testing requirements are *incredible*. You do your best to say "here is the expected environment that this is expected to run", but within that environment, there are so many variables. I mean just *look* at the stuff that uses the WorldWideWeb! The stuff that is written in Python! No *way* could the creators of these things anticipated what would be built with their tools. 

It is a heavy crown. Go look at the Github issues for your favorite (or not so favorite) library, database, or operating system.

At the time of this writing, the [Angular Github Repo](https://github.com/angular/angular/issues) has +1.4 THOUSAND issues.

The [AspNetCore](https://github.com/angular/angular/issues) has over 2.3 THOUSAND issues. The Roslyn compiler for C# and VB.Net has over 5,000 issues. 

When you write stuff like that, you have to make the whole world happy! Or at least all the weirdos out there that are doing things with your code that you never even dreamed of.

Imagine the tests you'd need. Tests for everything. Super low-level tests. Think of a compiler - you can feed those things any ridiculous stuff and they don't *usually* crash. You can *try* to compile your grocery list: `gcc grocerylist.txt` and it won't crash! I mean, it won't create a program that gets your groceries, but it won't *crash*. That is some SERIOUS coding there. 

I just looked at one test from the C# Roslyn Compiler. One test file that is for the [command line for the compiler.](https://github.com/dotnet/roslyn/blob/main/src/Compilers/CSharp/Test/CommandLine/CommandLineTests.cs) Over FOURTEEN THOUSAND LINES OF CODE. In ONE test file. I looked at it, closed it, and backed out slowly like Homer Simpson in disappearing into the shrubberies.

But those test, wow. They are going to haunt my dreams. Many that run only if you are testing on Windows, others for Mac, other for Linux. So many strange weird things to consider.

So, here's the point. If I was teaching my students how to test an Angular application, or an API that runs a simple database query and returns the results in JSON format or something, I would be doing a *great* disservice if I showed them tests like this and said "Well, here's the bar, folks. These is the kind of coverage we are going for. Oops, it's almost 5:00. Quitting time. Good luck to you."

As *application developers* we don't have to be super paranoid and write tests that say "What if someone tries to use my application to compile their grocery list! I can't crash!". I haven't created an application in over 20 years that would allow someone, someone evil, to even *try* to do something that ridiculous. (I did create a kind of "compiler" once years ago. And it mostly crashed even if you gave it valid source code.)

So, as I said above:
> Taking something general purpose and putting it to specific use is called *Application*.

Also means:

> I am removing all scary ambiguity from these general purpose tools and collapsing them into something very specific and mostly predictable.

If I create a form on a web page that collects data to send to a function I've written in JavaScript, and the form asks for a numeric quantity, doesn't allow the user to enter anything other than a number, do I have to write a test for that function that says "OMG what if someone gives me their grocery list instead of an integer?!?". 

No.


