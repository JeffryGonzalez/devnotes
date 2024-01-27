---
title: Application Developer
draft: false
tags: 
date: 2024-01-27
---
## In Praise of the Corporate Application Developer

>[!Definition] Application is the process of *applying* or using something with a specific purpose.


For purposes of this talk I'm going to differentiate three different modes a software developer can work in. Some adroitly switch from one to another, others find one and build their entire career there, and others mindlessly mix them together.

### Application Developer

Moving fast balanced with reducing risk.
A key thing here is that the value of the work you produce is usually *directly correlated* with how fast you can move. Something becomes a *business* requirement because there is an immediate *perceived* business need.

So, we develop a hypothesis. There is something that the business feels would be of benefit. What can we create *right now* that would allow us to see if this something that would be really beneficial? 

Application developers in a corporate environment have a lot of ground to stand on. They are entrenched in an existing business domain. They aren't really trying to "change the world", and "disruption" isn't really the goal here either. What we are trying to do in this realm is often becoming invisible. We want to find a friction point for our users and minimize it. We want to make it *easier* for them to do what we *want them to do*. For example, people have been buying insurance for millennia. But did you know that there was a time when to get car insurance you had to *talk to an agent*? Like fill out paperwork and stuff. And then *wait*. At some point in the future they would offer you a quote, and then you'd have to fill out some more paperwork that said you agreed with the terms of that quote, and you'd like a *policy*. 

Now, if I want to get insurance for a new car, I can get quotes from every leading provider of insurance in minutes, and when I find one that I think is the best, I can turn that into a policy *instantly*. 

Early on, just the ability to *do this* sort of thing was enough. Companies that could provide this option as a service had an advantage over companies that couldn't. 

How often are you searching for something you need online and you run across a place that has what you need, but their call-to-action is to "Contact us for pricing"? How often have you actually done that? Contacted them? I'm not sure I ever have.

This was largely the time when I became an "application developer". It was mostly taking established business practices and just making them "automated". E-Commerce, document storage and retrieval, all that stuff. 

The underlying premise during that time was that the company *knew what they were doing*, and our job, as software developers, was to just *replicate that* in a way that removed friction. 

> [!quote] All software development is some form of creating an automated checkout process at your grocery store.

You *hope* it is a win. Often it is. Sometimes it isn't. Can we use *engineering and business practices* to find out what is good and what isn't? What is moving us towards our goal, and what is a distraction?

Application developers use (apply) technology, software engineering practices to evolve business. 

Their job is to be the *translators* between business requirements and software. 

Application developers are the enablers? curators? midwives? of business requirements. 

### Application Developers Align with the Business
Every human brain is relatively finite in what it can have close-at-hand. Of course the quantity of datum an individual can hold varies based on experience, talent, etc. it is always finite.
Application developers need a large percentage of this pool of datum to be dedicated to the business domain in which they are working.

We choose tools, languages, libraries, frameworks, etc. mostly for their ability to help us express the needs of the business in code, stay out of our way, and *abstract* away, as much as possible, [[Technical Requirements]].

### Tools / Library Developer

Maybe "Infrastructure" developer, in the DDD sense? Or Infrastructure/Domain

Business requirements aren't the only requirements. We also have technical requirements, compliance requirements, security requirements, accessibility, etc. etc.  

These kind of requirements are the *invariants* of working within a particular business domain. They are *cross cutting* for each, or nearly each, of the applications that are created.

Where "Application" means "specific use", developers in this mode are working at a lower, more general use. 

These kind of things are often (and best) extracted from applications.  We want our application developers heads in the *business* world. 

#### Example 1
Your third application's velocity is stalled out because the application developer is creating a React component that allows the customer to select a range of dates, in their local time zone, including some black-out dates. And it must be accessible. At the daily standup, for the third day, they are still blocked on this.

> [!note] As a team lead, don't have them do this work. Have them create a component in a library as a "stand in". Keep them moving. 

**A sort of 'Onion Architecture'** for building at the presentation layer. 

#### Example 2
Your application developer is creating a backend-for-frontend API in support of an iOS application. We are getting close to release, but they have discovered some of the data the API needs access to is using Kerberos authentication. There is another developer on the team that has successfully done this in the past, so they are paired up. But it is slow going. The "Experienced" developer's implementation, while sound for the use she had, isn't easily translated to this new API. She had written (read: applied) code that met her specific need. And it was in a different language. And, now, looking at her code, she sees some shortcuts she had taken, and doesn't feel confident *replicating* those shortcuts to another project that might have completely different security requirements. Now you have a couple of developers that are doing a Kerberos *deep dive*. They haven't mentioned the widgets you are selling for *days*. 

In both of these examples what you need is a more *general* interface with a more *specific* implementation. General in that it can be reused in a breadth of projects, and specific in that it *encapsulates* the knowledge of the particular implementation. Time Zones are hard. They are a show stopper for even seasoned developers. Security protocols that must also reflect the security requirements of your specific business are complex. 

### Systems Programmer


An overview of this stuff might be starting with application development. There are ton of corporate developers out there that are under-served. A lot of the content they see online just makes them sort of feel bad. You can get a real "FOMO" vibe going - should I be using Rust? Should I be using the new hotness in the React world? *Am I even a **real** Programmer if I'm not doing these things*? 

> Application developers *apply* technology to fulfill business requirements and technical requirements.

The YouTube vibe is a lot of resume building, and having people that aspire to working in the startup space showing off their toys.

There are several modes you can work in as a software developer. Any documentation or training that doesn't differentiate or discern for you what modality it is addressing can be confusing. 

There is an issue too, where one of the *best* sources for learning coding is browsing repos at Github. I don't want to undersell this - it is fabulously helpful. But you maybe you've noticed that a lot of what is there is *not* applications. It's tools. Libraries. Those are the things that, understandably, get written in the open. If you look at the source code for these, and try to find things you can use as an application developer, it can be a little discouraging.

