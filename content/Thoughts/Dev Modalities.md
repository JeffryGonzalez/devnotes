---
title: Developer Modalities
draft: false
tags: 
date: 2024-01-27
---
# Software Development Modalities

A good mantra to use throughout the day as you write code is to ask yourself, over and over "What kind of code am I writing *right now*?". Having some categories is helpful for this. Each of these categories have a difference in on our approach in terms of testing, our thinking, estimating, etc.

These modalities are a hierarchy of *generality* towards *specificity*. Developers working at the Systems Programming level are creating solutions to general problems (like storing files, compiling software, persisting data). Library Programmers are providing more specific solutions to focused tasks (parsing JSON data, animating stuff on a web page), Framework Programmers have identified a *category* of applications that are being built that have common patterns that are duplicated (or done "wrong") and provide an expedient for Application Developers, who are creating something more *tangible*, and specific for a customer.

## Systems Programming

Examples: Operating Systems, Databases, Compilers, software runtimes.

I'm using "Systems Programming" here is a more open way than it is typically used. My use includes the development of things like operating systems, database engines, programming languages, runtimes (both application and systems) and network infrastructure.

Systems programming is nearly 100% dedicated to **[[Technical Requirements]]** as opposed to **[[Business Requirements]]**. 


It is interesting how the world of Open Source has sort of taken over this level of software development.


## Library Programming

Examples: lodash, jQuery, ADO.NET, Kafka SDKs, Angular Material, SQL Query Builders, GUI Libraries, etc. 

There are gray areas between each of these categories, but generally it is safe to say that libraries are "code that your code uses". They are written usually for a focused task - logging, talking to a database, validating data, etc. 

They are much more *opinionated* than Systems Programming. They are for a specific task, but still well in the **Technical Requirements** side of the house.

Libraries are coupled to the systems stuff "below" them: For a specific database, operating system, or programming language (but not necessarily all of those things). 

[[Using a Library]]

[[Creating a Library]]

> Note on libraries: Because of the coupling issues, and because of the overhead of the mostly one-way nature of the contract (Application X takes a dependency on version 1.1.0 of Library B, the application decides when it will take the next version), if is sometimes best to replace what might be traditionally considered a library with some sort of API. or service. The application takes a dependency on a contract then, not an implementation. This is particularly common in orchestrated applications using Sidecars, Adapters and Ambassadors in multi-container pods. [[K8s Pod Patterns]]


## Framework Programming
Examples: ASP.NET Core MVC, Angular, NestJS, Gin, the WWW

There is a thin line between a framework and a library.  There is more committment with a framework. In essence, with a framework, you *start* with the framework, and with a library, you start with your application, and use libraries as you find need and benefit.

### Using a Framework

Frameworks can be a huge expedient for your software development project. The business says they want to start selling pizzas online. Do you really want your team to crack open Vim and the C standard library and start writing code to process TCP stack frames and implement the HTTP specification properly, while actually having a bit of code in there about cheese, pepperoni, and delivery instructions? Frameworks are all about abstracting away Technical Requirements from Business Requirements. 

A good framework should intentionally *constrain* your software development choices. It should have a "happy, easy" path that lets you do common things within the domain of application you are building. 

We outgrow frameworks. The constraints implicit (or explicit) in a framework will eventually make doing the things you need to do harder than they would be without the presence of that framework. All frameworks I've used have eventually lead to grief.

That isn't to say that aren't usually worth it. To use anyhow. But know that the code you write that *depends* on a framework is most likely, on a long enough timeline, to be *ephemeral*. Without the framework, your code is DOA. 

The code you write within a framework should be *primarily* the code that interfaces with your framework and your more *framework agnositic* domain code.

Where possible, as mentioned above, *extract* your domain knowledge into libraries (or services) that are as framework agnostic as possible.

Frameworks give value by being *opinionated*. The more they take care of for you, the more you'll be dependent on its way of doing things. However, those opinions are always (literally) codified at a *point in time*. In other words, they are formed at a particular understanding of what kind of software *is* being written, and *should* be written. Which is fine until you need to do something else.

Application code inside of a framework rots in direct proportion to how far it varies from the opinions of the framework.

One of the biggest, best, investments for developers when working in a framework is to actually *learn* the framework. Get inside the developers of that frameworks head. What are the metaphors here? How do they expect me to write my code?

A good framework will be easy to use if you stay inside their opinions on how things should be done. If something is challenging, it either means you don't understand the framework, or *you've outgrown it*. 

Your ability to *move on* from that framework when the time comes has to be your focus from the beginning. Don't put all your eggs in one basket, so to speak.  Be suspect from the beginning. Ignore the Midwest Work Ethic mentality of "I will bend this framework to do my bidding!". You aren't going to fix him. Sometimes its best to just say goodbye and move on. 

And the less *attached* you (your code) is to that framework, the better. The easier it will be to go your separate ways.

Another note about using frameworks. Many frameworks have been developed over the years to insulate you from technical deficiencies in underlying systems. The problem is the Systems stuff keeps improving. Sometimes it improves in line with the direction your choice of framework thinks is the right way, sometimes another. I'm thinking here, for example, of Angular JS. It was created when JavaScript was still somewhat of a "toy" programming language (it wasn't very expressive), and the state of browsers for application developers was a bit of a mess. That changed. Those things got much better. They had to rewrite Angular JS and make it Angular 2. Or think of an ORM like Microsoft's Entity Framework. It is all about the mismatch between *relational* data and *objects*. And it does that really nicely. But most of my services are *stateless*. Basically Entity Framework is a library to assist in the process of turning relational data into JSON. The objects (entities) it creates do things like change tracking, etc. which make sense in a stateful service. But kind of overkill for just returning a JSON array of state codes. 

The point here is make sure you are evaluating the state of the Systems level stuff - things that are in frameworks sort of flow "downhill" to those worlds over time. Promises and Observables were once libraries, and now they are in browsers.  `document.querySelector()` is about 80% of jQuery. Document databases make most ORMs redundant.  Watch for the "new kids" in the framework world and see what they are doing. Years ago I discovered HAPI, a framework for Web APIs, and it embraced the platform. For frontend development, frameworks like Next.JS or Remix.Run are shocking in their overall simplicity (compared to something like Angular). They aren't as opinionated, true, but they also embrace the platform (HTTP, modern browsers) so there isn't as much abstraction, not as much magic. Which means, frankly, they will be easier to leave when the time comes. Less baggage and all that.


### Creating a Framework
> To believe your own thought, to believe that what is true for you in your private heart, is true for all men - that is genius... - Ralph Waldo Emerson

I am no genius. I've never felt like, in any application I've written, that I've arrived at the enlightenment moment. Where what I've done should be the *template* from which all things *like mine* should be cut.

I've created my own unit testing framework. I've created a blogging framework. They worked for me. And in the case of the Unit Testing framework, they worked for some other projects as well. It was probably worth the time and effort I put into it. But it is gone, like tears in the rain.

Big businesses and enterprises often need to develop framework like things. Businesses that have, beyond the Technical and Business Requirements, requirements in terms of compliance, etc. are particularly prone to create these kind of things. There is no way we can trust developers to keep all these details in their heads all the time. 

I get it.

Just know that you will almost certainly outlive your framework. A company in the early 2000's developed a framework for providing user interface using HTML. And then the mobile thing happened and they could use zero of that framework for native applications. That sucker cost *millions*. It was *beautiful*. I can still read the code like a fantasic romance novel. So much adoring attention to *design patterns!*. Makes me misty. But it became a huge boat anchor that kept the company from moving at the velocity they needed after the world and the set up suppositions that its creators imbued it with (that the Web was the forever thing, that API calls will all happen in our SOA architecture. That developers will *prefer* coding in XML configuration files (it's all the rage!)). 

One of the biggest pitfalls with frameworks is that if they are really *great*, they get used. A lot. They are like a black hole. Everything gravitates towards them. Gets assimilated into them. Becomes dependent on them. They become egregore like. They influence your line of thinking about how to solve every problem. Entire corporate cultures are swayed by the framework. There is a lot of talk about Conway's Law:

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.[[2]](https://en.wikipedia.org/wiki/Conway%27s_law#cite_note-Conway-2)[[3]](https://en.wikipedia.org/wiki/Conway%27s_law#cite_note-3)

— Melvin E. Conway

But it goes the other way, too. Sort of a self-reinforcing symbiotic relationship.

As a software developer, I wouldn't brag too much about my skills with a particular framework. I've seen companies have all their developers latch on to the new "cool" framework. Angular comes to mind. And then every business requirement becomes a new opportunity to leverage that framework. Applications that could have been created in a fraction in the time with something like ASP.NET MVC or Rails take months to create in Angular.

Large companies love frameworks in that they can provide a way to attain their dream: Making developers fungible resources. They can shift them around from platform to platform and they'll always feel at home, because it is the same framework everywhere. Until there is a rift, a paradigm shift, and that framework is no longer an expedient but a detriment. Then you have a bunch of lost framework developers. Protect your own career. Don't get overly attached to a specific framework. And "Architects", don't be afriad to allow projects to sometimes use new tools or frameworks. The payoff can be tremendous.


Frameworks are always a compromise. You are using other people's concepts here. A framework is an opinion on top of a system to work as an expediant. 
Frameworks add value to your code through a variety of techniques. AOP, Inheritance are common examples.

In creating a framework you are saying, in essence, that you know, at least generally, how a particular *kind* of application should be developed.

"I know a good way to build applications that run in a web browser - Angular"

"I know a good way to build HTTP-Based APIs - .NET MVC"

More power to you. And despite all the negativity in this section, **thank you** to the developers that have created the frameworks that I have known, loved, made money from, and eventually despised and left in the gutter.

And despite my saying don't get too attached to a framework, remember that doesn't mean you don't actually have to learn it. Embrace it. Use it. Nothing worse than seeing islands of code in an application within a framework that totally ignore the constraints and, frankly, benefits of that framework.  I saw an API service created not that long ago that had a ton of code that would serialize database data into XML. It was fantastic. And totally redundant and frankly not as good as the code that was built into the framework. When I replaced that developers 1000's of lines of code with just a few, they at first got defensive, then turned green and left the room, sweating.

## Application Development
> Taking something general purpose and putting to a specific use is called *Application*.

This is where the technology above is *applied*. "Making an Application of the technology to meet some (business) need."

Building applications means developing software on top of a System, often using a Framework, aggregating libraries in response to **Business Requirements**. Everything flows from that. The more we focus on the business requirements, the more "win" we have. The more technical requirements can be abstracted away from what we are doing, the better off we are. 

The recurrent dream/nightmare of "drag and drop" software development, of "putting together things like LEGO bricks" is repulsive to me, but it *is* the goal.

If you work for a big company that isn't a software development company, I can almost guarantee if they could find a way to make money without us application developers, we'd be gone by lunch time.

I don't see that happening any time soon, fortunately. But what I have seen is *tremendous* business growth *because* of technology and software development over the years. We are earning our keep. We are *applying* technology in ways that benefit our overlords.

I also see an under-acknowledged change in what we do. Software development used to be defined by *automation* of business processes. We took mail order catalogs and created Amazon.com. Dinner reservations are a click or two away. You can get insurance without ever talking to an agent. All those activities (and many more) were possible *before* software, but we just made it better(?).

In that world there were the people that know things. The "business". They know how to run a business. Our job is to take good notes, then disappear into a cave and do whatever it is we do on our computers to as closely as possible replicate what they are already doing, or, at least in their minds what they think they are doing.

And now a lot of our effort, our work, is creating things out of whole cloth. Things that have never existed before. Things that have no established, "real world" correlate.  My phone notifying me when I get near a hardware store that I need to buy a rake. Our job as application developers is to not *only* be beholden to "established business practices" but also demonstrate the "yes, and what if..." part of business. And it isn't just the "business" people that are a problem. Even people in our own industry with "decades of experience" have a *lot* of inertia to overcome. So *much* software architecture is just a recapitulation of the same shit we've been doing since the days of the mainframe. The problems I mentioned above with frameworks have their root in that kind of thinking. The "single source of truth" for all data, etc. 

If you are an application developer, and I assume that is mostly why you are here, your job is to propel the business, any business, through the *application* of technology. It is a creative act. If you are in an environment where they don't respect that, don't embrace it, you are in the wrong environment. 

If you are a newer software developer, there is something from our history that you have to know about. It is often talked about in mystified language like "Waterfall Development". 

### The Code Monkey
I remember this term from my early days of software development. It means something like a "grunt", or a "mindless factory worker". When all we were doing was automating business processes, the idea was that the "business" would be in charge. Then you'd have a legion of the "Consultant Class" come in and do "systems analysis", which invoved a lot of golf and tassel loafers and gold button blazers. They'd hand their findings off to some "smart" people to do a design, with training in Rational Rose on drawing software, then they'd get sign off (usually by the 16th hole), and then they'd send it off to the drones to "code up".  It would be best if those drones were located in some far off land so we can pay them even less. Programming at that point *has* to be just typing, right? I mean we've already *designed* it. All the smart people did all the hard work. 

This *obviously* isn't the world we live in any longer. But the mythology remains in the minds of many. 

For *years* I'd wear a suit and tie to work every day. I'd get made fun of. "Hey man, we are casual here! We can wear shorts! Flip flops!".  Or "Hey have a job interview today?". 

I always felt that if I didn't get to *choose* the way I dressed, if someone else did it for me, it was to send me a message. The suit and tie was the uniform on those that *know*. Flip flops and ironic t-shirts were for the Code Monkeys.  They were saying "You should dress like you are working in a factory, in a warehouse. Because that is how we see you and that is how we want you to see yourself". 

I got over it. Comfort rules. But don't be a code monkey. Unless you want to. You are an important part of the business. And if they haven't noticed yet, someday they will. They will see that actually you, in large parts, *are* the business. The more that is acknowledged by *everyone* the better we can do our jobs, and the better we can actual deliver value. Which is what they *really* want, outside of their fantasies of superiority.




