---
title: Beginning .NET Service Development
draft: false
tags: 
date: 2024-02-18
---
## Defining Services / Apps / "Microservices"

[The Twelve-Factor App (12factor.net)](https://12factor.net/)

I think the term "App" (or "Application") is more useful than a "service" or certainly "Microservice".

An "application" is a putting to use of general technology for a specific purpose.

> "The act of putting something into operation" - Google search for a definition of "application".


An "app" is often bigger than a single unit of compilation, but is always a unit of deployment. Since an application is built for a specific thing (it's "service responsibility", or "bounded context"), it "owns" some part the business. It is owned by a team, and must be ***independently deployable*** by that team in response to changing business or technical requirements.

Some (largely outdated) thinking about "Services" is that a team will provide a general purpose solution to a cross-cutting requirement for the company. It will provide a mechanism of authority within the company, as well as a axis of reuse. This is the "Lego" dream, and it means you will be trying to be all things to all people. 
### Connascence

[Connascence - Wikipedia](https://en.wikipedia.org/wiki/Connascence)

The "simultaneous birth of two or more things." and "the act of growing at the same time".

> In software engineering, to components are connascent if a change in one would require the other to be modified in order to maintain the overall correctness of the system.

Therefore, the boundaries of your app or service are those things it is connascent with.

Some "Ingredients" of an App:

- Hardware (processor architecture, storage, memory, processor)
- Operating System and Version
- Network (names, *it's always DNS*)
- Our code
- Our binary, early-bound dependencies
	- Version of .NET?
	- Version of frameworks / libraries (NuGet)
- Backing Services / Attached Resources (late-bound)
	- Databases / Caches / Etc.
	- Other services we don't own.
	- Configuration

Historically, we had the most control over just a small part of this: Our code, and our early-bound dependencies (what versions of things we were using and testing against).

## Dev/Prod Parity

Spoiler: Containers. 

Containers allow us to make the first two or three bullet points from above (the "ingredients") connascent with our code. 

In the past we would develop software on often *vastly* different platforms than where it would be tested and run in production. We might be writing our code on a laptop with a consumer grade operating system, very little concern for security, etc. with minimal resources, and running that code on "enterprise " servers.

Things like the underlying operating system could be changed/upgraded, reconfigured without our knowledge. 

Since the expectation was that we *couldn't* do most of our development on our local machines, "dev environments" that are external to our local machine are relied upon. Minimizing this will help keep you from becoming overly dependent on non-connascent resources. Over reliance on existing attached resources cements those resources in place. They soon become "legacy software" in that they can't be changed without breaking other things.

Our code and our dependencies (NuGet packages, version of .NET, etc.) is delivered as part of our application.

#### A Note about Early Bound vs. Late Bound Dependencies

Early bound dependencies are verified at compile time. If there is a class your code uses and your code tries to call a method that doesn't exist on that class, or you are calling it incorrectly, your code won't compile (assuming a statically typed compiled language here). 

Late-bound dependencies are not evaluated at compile time, but at run time.  If you are using, for example, Entity Framework, and someone changes the schema of the database your application will fail at run time. 

NuGet packages are *early bound*. You code is compiled against a *specific version* of a dependency, and must be redeployed if that version needs to be changed.

NuGet packages are a way to share code between teams and projects, but always in an early-bound way. If the team owning a package fixes a bug in their code, for example, there is no (good) way to force *every user* of that package to upgrade to the new version.  

As example: Suppose you and your team owns credit card processing for the company. You decide to publish a NuGet package as a "shared library" that other .NET developers can use to do credit card processing, card number validation, etc. in their applications. They simply install it and use it.  This is probably a *poor* choice for a package, because it will no doubt *not* be connascent with their code.  For something like credit card processing, if there is a change in the library, you need to users of that library to update *right now*. Even a small change in your library can create a cascading set of redeployments of applications across the company. 

It also means your team is going to have to maintain various versions of the library for teams on different versions of .NET, perhaps. You could be holding up the deployment of another business critical application because your team hasn't created an updated version of a library!

Another problem with this is sort of obvious - you have decided that (in this example) the *only* applications that can process credit cards must be .NET applications (and of specific versions of .NET). What if another team decides it is in the best interest of *their* customers to create a Java application, or NodeJS, or Go, or whatever? 

This is exactly the thing that late-bound dependencies are for. Create a service for this that can be called at runtime.

> [!warning] Be Careful of Encoding Connascent Business Rules in Packages
> Even between apps on your own team, forcing other applications to redeploy frequently based on changes in a library will really harsh your mellow.






### Backing Services

These are things your application needs to run, and are usually accessed across a network (based on config). 

According to the guidance of the "twelve factor app", all backing services are treated the same: as "Attached Resources". 

These are the things we are "late bound" to, and our connascence to these services has to be based on their *interface*, not their implementation or even their availability.

A thing that is in common with backing services is that *we don't own nor control them*. For example, we might be using a database backing service - maybe a Postgres database. In "production" that will be housed on a server maintained by a DBA, who ensures proper security, backup/restore capability, etc. Since backing services are always "provided" through our applications configuration, that means that it will be, most likely, changed during the lifetime of your application. For example, a database server may fail, and your application's configuration could be updated to use a different instance of the database, perhaps restored from backup.  It is even likely that one minute your application could be running queries against a specific version of the database, and the next on a newer version.

Another reason we use backing services is for *scaling*. We might discover that a portion of our application has become the bottleneck for our throughput in our entire application. Using *horizontal scaling*, we can extract that portion of the application to it's own backing service and scale it independently from the rest of the application.

#### Connascence on Interface

By interface here, I mean "Contract". What is the promise made be the service, separate from how it fulfills that contact? 

In terms of reliability, and fulfilling our duty in being able to *independently deploy new versions of our application based on the needs of the business*, it would be *best* if we didn't need *any* backing services, and if we did (which we do), if our team "owned" them. 

The *stability* of that contract is the thing we want to be connascent with. 

Some examples:

"Shared Language":

- **Identity**: Standards for verifying identity exist using OIDC / OAuth2. Several specific pieces of software *implement* those standards, but the closer we can stay to using those standards while being ignorant or agnostic about *what* software is implementing them the more connascent our application will be. 
- **Mail**: The standard for sending mail using SMTP is decades old. Hundreds of mail servers "speak" SMTP. If we program to this standard, we are "safer" and more resilient. 
- **SQL**: This one is a bit tricker. While there *are* standards for SQL, each database vendor has their own particular dialect slightly different, and often not compatible. Using light abstractions over the particular *provider* for a SQL database can be helpful (for example, Microsoft's Entity Framework), but changes will require a redeploy. 

davi
As a counter-example, suppose your application needs to read data from a specific table in a specific database. Maybe it is an IBM DB2 table, and it is *massive*. It's schema was designed years ago, and it's schema and data are shared across many teams. There are competing interests that make this type of thing a source of *rot* in your enterprise. On one hand, because so many applications rely on this, any changes *might* have unintended consequences. Even changing indexing, which is *supposed* to be a performance optimization at the physical level, could possibly break applications. On the other hand, because of this, performance, usability, and reliability of the database degrades over time. 

## Observability

[[Open Telemetry]]



## SRE
## Testing

> Test with the finest grained mechanism that tells you something important.
> [Jeremy’s Only Rule of Testing – The Shade Tree Developer (jeremydmiller.com)](https://jeremydmiller.com/2012/10/11/test-with-the-finest-grai/)

Trying to define what "something important" is:
1. **Does what it is supposed to do** - from the perspective of the user using our code, our API, our application - meets our understanding of the requirements.
	1. More "black box". 
2. **Remove defects and risk**.
	1. As developers, we will have more insight on this (than "testers")
	2. More "white box". 

## HTTP

From [RFC 9110: HTTP Semantics (rfc-editor.org)](https://www.rfc-editor.org/rfc/rfc9110.html#name-terminology-and-core-concep) 

### Resources

> The target of an HTTP request is called a "resource". 

In other words, the idea of a resource is something that exposes and HTTP *interface* and is available through a URI.



### Representations

> A "representation" is information that is intended to reflect a past, current, or desired state of a given resource. 

## Integration Patterns

