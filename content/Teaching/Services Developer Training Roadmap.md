---
title: Services Developer Training Roadmap
draft: false
tags:
  - services
  - training
  - devops
  - API
  - architecture
date: 2024-03-18
---
The Services Developer Training path of courses are designed to accomplish two primary goals:

1. Give .NET Developers experience with the tools, technologies, and patterns to deliver high-quality solutions for service-oriented applications written in .NET that meet the business and technical requirements of the application.
		* We use the current version of .NET (.NET 8 at the time of this document's creation), with ASP.NET Core APIs as the centerpiece of the services we create. 
		* Most services will be HTTP ("REST", or "RESTful" APIs)
		* Other service types will be introduced as part of the training, including "Hosted" services that work as background workers, and services driven by protocols other than HTTP (like gRPC, and Messaging/Event-Driven services).
1. Embracing the DevOps mindset, especially patterns for Continuous Integration and Continuous Delivery of Deployment using pipelines, testing feedback loops.
	1. After *decades* of effort with methodologies like Agile, Extreme Programming, Lean Software Development, Scrum, etc. we finally have the tools available to go the final mile - delivering frequent software updates.
	2. Frequent updates (deployments, deliveries) allow our teams to deliver business value more rapidly, and adapt to changes in business and customer needs.
	3. The tools don't, however, in and of themselves, enable this. We have to change the way we think about constructing and testing our code at the level of source code.

The series of courses created for C# developers are as follows.

The should be taken in the following order:
	1. Beginning .NET Service Development
		1. Sets the stage for all the rest of the courses. Without this course, the material in later courses will be confusing or seem suspect to many developers.
	2. Web APIs with .NET
		1. The "meat" for most developers. How to create HTTP based APIs, using the conventions of the REST architectural style, and configuration and databases.

After these two courses, developers can take either of the remaining courses in whatever order matches their interests/needs:
- Services Developer Testing
	- We won't write tests in the Web APIs with .NET Course - no time to treat it adequately. But this course is essential knowledge for developers
- Microservices Development
	- This is largely an "architecture" course, on how to fulfill the dream presented in the first course of team autonomy and "independently deployable" services.

## Beginning .NET Service Development

### Technology / Pattern Keywords
- HTTP
- DevOps
- Pipelines
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- REST
- .NET Core
- ASP.NET MVC
- Containers
- Docker
- OpenShift
- Kubernetes
- Developer Testing
- Manifests


For most developers, this is the *most important course* in the series. This is the "big picture" course, and in this course, developers:
* Write a multi-service application using .NET that integrates with remote procedure calls (RPCs) using HTTP.
* We learn techniques to make our distributed applications *resilient* to failures with *retries*, *circuit breakers* and other essential "Site Reliability Engineering" techniques. 
* We learn "Cloud Native*" development techniques that enable Continuous Integration and Continuous Delivery/Deployment, including:
	* Containers (a.k.a. Docker)
		* Understanding the problems solved by containerized applications
		* Building containers for a variety of services
		* Optimizing and securing containers
		* Testing our containerized applications
	* Observability
		* Using OpenTelemetry to be able to gain insight into our running applications, including:
			* Logs
			* Traces
			* Metrics
* Introduction to Developer Testing of our Applications
	* The goal of our practices is to create "independently deployable" services where each team that owns a service is able to be responsive to the needs of the business that owns that particular service without needing coordination with other teams that either use our services, or own services our service needs.
	* "Developer Testing" is a subset of software testing that includes:
		* The tests we write *as we create our application* (as opposed to other tests that are created *after* the application is created)
		* Low-level unit tests to verify complexity in our source code
		* Functional testing to verify it meets the "contract" exposed by that application that other services rely upon.
		* Functional testing to verify our service interacts with the contracts exposed by the other services we use, including being resilient to failures in those applications.
* How Services Get Deployed
	* Understanding the various environments our applications run in, and how configuration changes per environment.
	* Understanding deployment environments like:
		* "Serverless" environments (e.g. Azure Functions, Amazon Lambda)
		* Virtual Machines (Ansible, etc.)
		* Kubernetes/OpenShift Orchestration
			* As a Cloud Native approach, this is the primary focus of this training. 
			* Creating Kubernetes/OpenShift:
				* Deployments
				* Services
				* Paths (ingress)
			* Rolling Upgrades / Downgrades
			* Horizontal Scaling
* "Ops 101"
	* With the tools available to us now (virtual machines, containers, OpenShift/Kubernetes), we get, as developers, unprecedented control over the tools, technologies, and approaches to delivering on business requirements. The "process" part of our job is minimized, however, we have to learn a *little* of the the things that we've relied on operations folks for in the past.
	* Networking
		* Basic understanding of networking, including the TCP protocol, TCP Ports, etc.
		* HTTP fundamentals - how HTTP sits "on top of" HTTP and provides an *application layer* protocol for services to communicate.
		* Basic DNS - how service names are translated to IP addresses.
		* The basics of network security
			* OIDC/Oauth2 for Identity
			* How authorization works 
			* How Transport Layer Security in TCP works to create private communication.
	* Processes
		* Basics of processes in terms of memory and CPU requirements
		* How threading works in .NET Services (async/await).
		* Creating resource requests and limits for our deployments.

While all the technology is fascinating (if not confusing), the most important thing for developers moving into a DevOps environment is understanding how to structure and write code that has frequent deployments (at least daily!) without creating a merge-conflict mess. The *real* purpose of this course is to give developers the confidence that they can solve the problems or requirements at hand without having to over-engineer their solution and spend multiple sprints in design and planning before verifying their design by getting it in front of users as quickly as possible. 

Developers should leave this course with *confidence* that they have the ability to build software services that are reliable, resilient, observable, and can grow at the pace of the business and their ever-changing requirements.
## Web APIs with .NET

### Technology / Pattern Keywords
- ASP.NET Core MVC
- .NET Core
- C#
- HTTP
- HTTP API Design
- HTTP API Patterns
- REST
- RESTful
- Databases
- Entity Framework
- Document Databases
- Configuration Management
- Swagger
- OpenAPI


If the Beginning Service Development course gives developers confidence to get started, the Web APIs with .NET course gives them the actual skills to build the lions-share of the type of services they are most likely to create: HTTP-based services with ASP.NET Core MVC.

Extending the patterns from the first course, we dig deeply into the runtime and configuration models for .NET Web APIs. We learn about the "services collection" and memory management, data access approaches, writing "stateless services", and documenting their services with the OpenAPI specification format (formerly known as "Swagger").

We learn HTTP API Design, but within the context of the *kind* of HTTP API they are building. We explore common patterns such as "Backend for Frontend (BFF, or "adapter" APIS)", shared, or "Open Host" services, and their requirement for aligning with the *semantics* of the HTTP Protocol.

HTTP is a *synchronous* protocol: It is based on the "request/response" model. A client makes a request, and is functionally "blocked" until a response is returned from the server. We learn how to optimize the performance of that exchange, and common patterns in HTTP for implementing long-running tasks that can't happen in a single request/response cycle. 

We learn how to accomplish *routing* in ASP.NET Core MVC - the technology that maps an HTTP Request Message to our code that produces the response. We use both so-called "minimal APIs" and the classical "Controller Based" routing, and talk about the benefits and limitations of each.

We dig into validation of incoming requests, including route parameters, query strings, and entities (bodies) sent to the server with the built-in `System.ComponentModel.DataAnnotations` library, as well as the `FluentValidation` 3rd party library (which allows asynchronous validation). 

Much of the emphasis of this course is in designing HTTP-based APIs that are, along with the theme of the first course, "independently deployable". In other words, how can we remain responsive to the needs of the business or changing technical and regulatory requirements while minimizing the chances our our applications breaking other services or applications that *depend* on our service. Our goal is that the testers are both happy and a little bored each time we deploy a new version. 

We talk about security in terms of Authorization and Authentication using the standards of OIDC/OAuth2, the differences between authorization and authentication, and how to design APIs that integrate with that model correctly. 

Good API design also allows you add new functionality for the consumers of our API without degrading the experience for existing consumers. We will learn techniques like using subordinate resources, creating discoverable affordances using the REST architectural model, as well as "micro caching" to improve overall performance and throughput.

A big part of security is being diligent to not *leak* sensitive data to the users of your API, so we will learn industry-standard patterns for mapping our "domain" types and data to custom bespoke representations for a variety of clients.
## Services Developer Testing

### Technology / Pattern Keywords
- Testing
- Unit Testing
- Functional Testing
- Developer Testing
- HTTP APIs
- Test Doubles
	- Stubbing
	- Mocking
	- Fakes
	- NSubstitute library
- Integration Testing
- Testing in the Pipeline
- Test Design
- Optimizing Test Run Speeds
- Using Containers for Testing
- Faking External APIs
- Playwright

While there is a quite a bit of overlap between the kinds of software testing that developers do as opposed to what software testers create, there are vast areas where each have additional responsibilities, tools and techniques. 

Software testers *primarily* do "white box" testing of our applications. They will create a test or staging environment that as closely as possible mirrors the production environment and use a variety of techniques to ensure the application meets the requirements before passing it along to production. This is a *crucial* step to have the confidence to put our code in front of customers. And developers *need* someone else to verify that the developers *understanding* of the requirements is correct. You can *never* test an application enough to verify it is 100% correct. The better code we deliver to the testers, the more time they will have to do *exploratory* testing, to really dig in and do the work of a software tester. 

Software developers often have privileged information about how a particular business or technical requirement is accomplished since they've written the code. Developers can often write more exhaustive tests for complicated algorithms than could easily or economically be tested by software testers automating tests with tools like Playwright. As an example, an API that validates the format and content of a credit card number could have *hundreds* of low-level "unit tests" that test many more scenarios that can be tested through standard API testing automation tools. These "white box" tests test not only the code, but are dependently on the actual types, methods, etc. that implement the code. While this is crucial for many part of our application, they also have the negative effect of "doubling down" and "locking in" our design.  Knowing *how* to write good "white box" unit tests is crucial to allow us to change our mind later about how a particular algorithm is implemented. Good unit tests should make us *more* confident in improving our code, but bad unit tests often make us reluctant because we have to not only change our code, but "fix" a bunch of unit tests. We can do better. 

Another issue is the relatively short support lifetime for our frameworks (where Microsoft comes out with a new major version *every year* and drops support for earlier versions in either 18 or 36 months) means we have to learn how to test our code in a way that when it is time to upgrade, we don't have a bunch of tests to update because *someone else's code* changed. We will learn good "domain separation" techniques to accomplish this.

The developers of the service also have intimate knowledge of the *backing services* (databases used, other services integrated with, etc.) and can do a form of "gray box" testing (somewhere between the "black box testing" of software testers and "white box" testing of unit tests).  Using *risk based* testing techniques, is is *much* more economical for developers to write tests that simulate conditions that are difficult and costly to simulate in a testing or staging environment.

Examples include:
* How should my service react if a backing service (a service owned by another team) is temporarily unavailable?
	* Crashing our API is *not* an option. Cascading failures will spread like wildfire.
	* Can we have a "plan B"?
		* Retries?
		* Send a notification (Event for OpenTelemetry)?
		* Etc.
* How should my Backend for Frontend API react if the access of the user making the request is revoked while the application is processing work for that user?
	* Much of the most important "stuff" we should test is security related, and it is challenging to test anything but the "happy path" in white-box tests.
* How can we test the background "side effect" type stuff our service does that isn't visible through the API?
	* For example, when an employee is hired, a message (event, email, whatever) is sent "behind the scenes" to the folks them send them their new laptop?
* How can we test that the process for getting a new instance of our application up and running works correctly before we start receiving requests?
	* Health Checks?
	* Copying configuration data from our environment?
* And maybe **most importantly** how can I have the most confidence that the change I just made to this API isn't going to break my "contract" with other services or applications that are relying on my API?
	* We have to verify the "independently deployable" status of our service *before* we deploy.

We will learn how to order the various *kinds* of tests we run against our API in our Integration pipeline for the best, fastest feedback.

In short, Services Developer Testing is *additional*  software testing that will give your team much more confidence in doing what we, as application developers love to do: deploying great code and making our customers happy. All with limited (or no!) coordination with other teams. 

Our testers will love us. We'll be less stressed, and we will all be happier.
## Microservice Development

### Technology/ Pattern Keywords

- Twelve Factor App
- Bounded Context
- Integration Patterns
- NuGet
- Deployment Models
- Eventual Consistency
- Messaging
- Event Streaming
- Kafka
- SNS
- RabbitMQ
- Azure Service Bus
- Microservices
- Monoliths
- Modular Monoliths
- ASP.NET MVC Core
- Frontend Development
- Backend For Frontend
- Data Liberation

The final course in the series is "Microservice Development".  The term "Microservice" has gone from the hot new buzz word in our industry, to being the fodder for link-baity controversial takes on "Why you don't need Microservices". 

We'll take that right on by starting with a good working definition of "Microservice". 

> Hint: It isn't about size, so much. It's about the "independently deployable" thing, along with writing services that have "boundaries" - we write services for our domain, for our business folks, for their needs.  Our services have to live in *that* world, and meet *those* requirements.

Many have said that "Microservices are Service Oriented Architecture *done right*" and I tend to agree with that. 

This course mirrors and extends the material from the first course, "Beginning .NET Service Development" by showing how in larger companies, we can't all work from the same source code repository and deploy our whole "thing" together at the same time. The folks responsible for inventory control have to deploy at a different rate than the developers who do HR functionality. 

We will mature our language a bit in this course and begin to refer to the code the team owns and deploys as a single unit not as a *service* but as an *app* (borrowing the term from the holy text of DevOps development, the [The Twelve-Factor App (12factor.net)](https://12factor.net/) ). Our "app" then is a "Bounded Context" (to borrow a term from Domain Driven Design) that is focused on a key part of the business. 

We will explore how to implement that "app" or bounded context *technically* by deploying:
- So-called "Monolithic" services.
- "Modular Monoliths"
- Multiple, independent services that are deployed and run separately (late-bound, networked) to accomplish:
	- Scaling and economical resource utilization
	- Speeding time-to-market for new functionality
	- "Hypothesis Driven Development" where we release "experiments" to ensure our design is going in the right direction.
	- These same technique will be explored as steps to take when moving from a "monolith" to a "microservice" architecture, including patterns like the Strangler Fig.

We will learn good guidelines for sharing code and functionality across services:
	- When is a NuGet package a good idea? When is it a bad idea?
	- When should you introduce another service instead?
		- Deployment patterns for "helper" services: Ambassadors, Adapters, Proxies, SideCars, etc.

## The "Big Thing" - No Shared Databases

The *most important* topic to be addressed in this course is the gate-keeper admonition from many that "Microservices do not share databases". For many developers (and ironically, the more experience the developer has, the more of a negative reaction they have) this is a show-stopper. 

It doesn't seem possible - that each service we create will need it's *own database*? 

In all the previous courses we will *never* create an application that doesn't own it's own database. Most developers write it off to being "just a classroom" and give me a pass on it. Some will either quietly or vocally call it into question. This is the course for them.

We have *generations* of developers that have lived in the ideology of centralized databases. Big Oracle databases, DB2, SQL Server, stored procedures that protect the data, scores of DBAs and Data Architects that keep it all going. 

We know the only "authoritative" copy of the data that *ever* exists is on the bits on the hard drive owned by the database. The database is the sole source of truth, and *transactional consistency* is our motto. 

There is no denying that works. It has served us well for decades. But it is showing cracks:

- A huge percentage of production issues, statistically speaking, is related to shared database schema or data changing in a way that negatively impacts other applications using that data. (see "Independently Deployable"). 
- A developer working on a "straight forward" feature like "adding a place for alternate email address for a customer" might score this with a relatively few number of points on the story card, but then find that there is *tons* of process to go through to make that change on the shared database, and they will have to extricate themselves from their "bounded context" and learn all about the intricacies of how our 30 year old database is structured. Can be interesting stuff, but the product honor will most likely not be impressed.
- We are *distributed as heck* now. In the old days, having large, geographically centralized databases made some sense. Now, because of reliability (redundancy) and latency (getting data closer to the users) we distribute our applications across data centers (either owned by the company or increasingly "in the cloud").  The problem with that is:
- **There is no such thing as a "Distributed Transaction"**.
	- We tried. Smart people created things like the "distributed transaction coordinator" but they failed.
	- A *transaction* is a "unit of work" that is "atomic" (i.e. it either all works, or none of it works).
	- On a single database you can write a transaction that says something like "Add this vehicle to this policy, but only if it isn't on someone else's policy, it isn't already on this person's policy, and it hasn't been reported as totaled in another claim", etc. But what if the service that *owns* the "policies" is using a different database than the one that *owns* vehicles, and that is different one that owns historical claims?


There are a *lot* of pattens that attempt to solve this problem, each with their own advantages and disadvantages.

A common practice, if you don't just keep using the shared database, is to "integrate with RPCs". In the scenario above, the service that allows the customer to add a vehicle to their policy might, when that request comes in, make a series of network calls to the other services, which each own  a piece of the functionality.  This has the advantage of fairly easy code reviews - it's called a "transaction script" because you can just sort of read the code from top to bottom and see what the "plan is".
	- Ok, first we call the service to see if this vehicle is already on someone's policy"
	- Then we call the claims service to see if it has been totaled, or whatever,
	- And then if they both say that's good, then we tell them both that we want to add it, so:
		- The policy service adds the vehicle to the policy.
	- But what if in the intervening time the vehicle *was* added to another policy (that claims API was a little slow, lots of data)?
	- You have to have the policies API create a way for you to say "never mind", or a way from the claims application to tell the policy application when a vehicle is totaled, etc. 
	- You create a MESS really quickly.
	- Not to mention the likelihood of my application failing is now a product of ALL the applications I'm calling being available.
	- And the performance of *my* application is tied to the performance of every other application I use! How will I maintain my SLA!?

No *wonder* we like sharing databases!

It'll take a few days to convince people, because when you start throwing out terms like "Eventual Consistency", "Messaging", "Queues", "Event Streaming", and "Command/Query Responsibility Separation" people think "to heck with it, I'm staying on DB2 or whatever". But it isn't *that* hard. 

Some myths we will dispel *by showing you in this course*:
	- "Eventual Consistency" does work, and it *doesn't* mean "slow". 
	- Performance is usually *better* in these kind of "microservices" than in services that integrate using databases or remote procedure calls.
	- They are *certainly* more reliable.
	- These techniques are often the *only way* that you get "team autonomy" (e.g. the ability to independently deploy your apps as needed)
	- They are (or can be!) secure, and scalable.

This course will emphasize the architecture and patterns for implementing "reactive" apps (services) using queues, event streaming and messaging. 

While teams have a wide range of choices in technologies to implement these patterns we will utilize primarily one technology because it is Cloud Native (can run anywhere, I don't want to teach just something you can run on X cloud platform, though those are often good choices), and it has facilities to demonstrate all common patterns (e.g. Message Queues, and Event Streaming), so we'll use Apache Kafka.

The code we write in class can easily be adapted to other tools as well, and we will briefly discuss, and perhaps implement, some of those choices and their pros and cons. For example:
- Amazon SNS
- Azure Service Bus
- Redis Streams
- Rabbit MQ

My choice of .NET libraries to accomplish this will prefer libraries that abstract away the underlying transport mechanism so we don't waste a bunch of time teaching you the details of a particular tool.

This course will also be the first one in the series where we have "real life" running applications at the end of the course, for reference.

We will end with:
	- An ASP.NET Core MVC Application with a Razor Pages user interface.
	- A backend-for-frontend application with a browser app (Angular, or Vue) that uses a ASP.NET Core API with authentication and authorization.
	- Several ASP.NET Core "business" apps that process messages, each "owning" their own database.



