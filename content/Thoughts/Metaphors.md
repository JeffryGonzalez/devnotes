---
title: Metaphors
draft: false
tags: 
date: 2024-01-27
---
This is just me thinking through some things. It's not well organized and super clear yet.


Recently, I said the following sentence to a group of developers I was mentoring:

> Your **containers** run in **pods**. Those pods are assigned to **nodes** by the **scheduler**. Since the nodes are assigned somewhat arbitrarily and can change, if you need to communicate with containers in a pod, you create a **Service** which creates a **stable internal DNS name** for the container in the pod. If you need to get network access to the container from **outside** the **cluster**, you configure an **Ingress**. Got it?

Each of the nine or so bold words are (mostly) words *any* educated English speaker would be able to identify, and perhaps even give some definition for. If you were in a job interview, and decided to bullshit your way through an answer to a question like "In a Kubernetes cluster, what is the responsibility of the scheduler?" you could probably say *something*. That is *a* sign of a good metaphor, I think. They are an *expedient*. They let us borrow some understanding from some sphere of knowledge and apply it to another as a way to bootstrap our understanding.

## Terms vs. Words

For this discussion, a *word* is a single meaningful element. A *term* is a word in a specific context of meaning. 

Sometimes when mentoring or teaching developers and introducing a new term they skip the step of touching in with their their understanding of the word. They sometimes see these terms as something distinct with no connection to any graph of preexisting knowledge they may already have. 

In some cases they may not have the tacit knowledge to really get the "charge" of the metaphor being used. It could be a language barrier, or just some missing concept in their mind. It isn't hard to imagine a developer that has never really considered the word "adapter", for example. It's a mechanical term used to indicate some contraption to connect two pieces of equipment that cannot be connected directly. If you don't know the *word* "adapter", then any use of it as a *term* will feel like a *specific*, *particular* use. 

When we say we need to "define our terms" when working in a specific context, we are saying something like "we need to differentiate how these *words* are being used as *terms* in this context". We are assuming some *tacit* knowledge of the general use of the word, and trying to impart *explicit* knowledge within a context.

When we are presented with a term, which is a word used in a specific context, we'd *like*
to be able to assume our *tacit* knowledge of the word the term is elevating or adopting in some way to elevate our understanding in that context or sphere. For example, in the world of Kubernetes, which is what the above quote was in relation to, the term "Container" *relies* on the word "container". Containers hold stuff. They might offer some level of protection for either the things in the container from things outside the container, or for things outside the container from things inside the container, and they could be used to provide some level or organization and categorization of related things. Those understandings of the word "container" are perfectly aligned with the *term* "container" as used in Kubernetes.

In Kubernetes, the term "container" refers to a specific way to deliver software according to the specifications of the "Open Container Initiative". [[content/Teaching/index|See Containers for Developers]]

The word "Pod" from the example isn't as clear. Any tacit knowledge of the word "pod" seems weaker somehow. Looking at the definition with a quick Google search gives me something that doesn't seem to help at all. ("an elongated seed vessel", or a "detachable or self-contained unit on an aircraft"). In the world of Kubernetes, the term "pod" is actually a kind of second-order metaphor. It is a *term* that is borrowed from another context and reused in a slightly ironic way. Let me explain.

The word "Pod" seems similar in use to "container", perhaps. But "pod" is *also* a term used in biology as the term for a group of whales. It is the most common collective noun for a group of whales. 

But what does that have to do with Kuberenetes, you might ask? Well, pods define a self-contained set (1 or more) *containers*. Containers were introduced to the general public by a company called Docker. Docker's logo and mascot is, you guessed it, the whale.
## Terms Detached from Words

For example, the word "apple". The same word given in response to different questions giving the word "apple" completely different meanings differentiates it from the "word" and the "term".

> What is your favorite fruit? 

> What kind of computer do you use?

If you use an Apple computer, the term "Apple" is a brand name. It is almost completely distanced from the commonly used word "apple" (which, perhaps, is a credit to the success of the company Apple). Having tacit knowledge of the word "apple" will give you almost no advantage in understanding the term "Apple" in the context of computer manufacturing companies.

## Terms Attached to Words

From the example above, the *word* "container" has mostly general understanding meaning. Even if you didn't have a definition for it on hand, if someone asked you for a container to put their leftover dinner in. 

Sometimes we have a very high level of tacit recognition for words, but very little explicit knowledge of them. A famous example used by the philosopher Wittgenstein is the word "game". You can ask almost anyone if they know what a game is, and they'd look at you like you are crazy. But if you asked them to define the word, it is *very* difficult to come up with a definition that holds true in all uses (terms) of the word. It seems to denote a group of things with a "family resemblance" (again, Wittgenstein). Football, Soccer, Baseball, Tennis, Arm Wrestling, Chess, Solitaire, Far Cry 6, and Super Mario World? Games.

The use of the word "news" is also interesting to contemplate. From "watching the evening news", talking to a "news reporter", to just reading the newspaper. Seeing that the term "News" is from the root-word "new", for me that was a weird moment of "getting something". "Watching the news" was meaningful and mutually relatable *before* I related to it for a moment of "I am going to watch this program that will inform me of all the novel things that have occurred since the last broadcast". Is there a difference between asking a friend "what is new?" vs. "what's the news"? It does show how metaphors work as an expedient. It is simpler to answer, if one asks you "what are you watching?" with "the news", than to say "a daily television program where the presenters keep track of what things have happened since the last broadcast and decide if it is worthy of informing us" or something like that.

## Usage

So, this is a lot of navel-gazing. Perfect for a "thoughts" entry here. But in software development, we are the benefactors or the victims of other people's metaphors. 

To repeat the quote that started this all off:

> Your **containers** run in **pods**. Those pods are assigned to **nodes** by the **scheduler**. Since the nodes are assigned somewhat arbitrarily and can change, if you need to communicate with containers in a pod, you create a **Service** which creates a **stable internal DNS name** for the container in the pod. If you need to get network access to the container from **outside** the **cluster**, you configure an **Ingress**. Got it?

After uttering this to the group of developers, I had a weird moment of clarity. None of those *things* (pods, containers, clusters, nodes, etc.) have any kind of existence outside of our usage of them. 

> Your **foos** run in **bars**. Those bars are assigned to **bazs** by the **qux**. Since the bars are assigned somewhat arbitrarily and can change, if you need to communicate with foos in a bar, you create a **splat** which creates a **deepler** for the foo in the bar. If you need to get network access to the foo from **outside** the **dingo**, you configure an **klump**. Got it?

Thank god they didn't name things like *that*. However, if you don't take the time to connect in with and get the charge from your tacit knowledge of the *word* that is being used as a *term* in this given context, they might as well have named everything some kind of `foo`, or `bar`, or `baz`, etc.

I think we often collapse our understanding of the metaphors involved when we are under stress or pressure. This is why the phenomena of figuring out your own problem in the act of just asking someone else a question about it is so common. I've been asked a thousand times for help on something, and by the time the person is done describing their problem, they laugh, say "oh, never mind, I figured it out". Somehow we have to elevate our thinking from the level of code back up to the level of language, of terms, words, and metaphors. 

I also think that sometimes Computer Science programs are almost designed to be *metaphor killers*. When I'm teaching a new group of C# programmers something like the `List` type in .NET, a recent Computer Science grad will usually "out" themselves immediately by asking about the internal implementation details of said `List`. I mean, I *get* it. But it is in the vast majority of cases much more important to understand how to put this to *use* as opposed to how it is implemented. As a matter of fact, if you don't know how to put it to use, even if you know every detail about it's implementation, you are going to be pretty worthless as a developer of applications. I often want to say something like, "Here's a metaphor. 

Application Development is about *applying* the metaphors others have created to solve business problems. And when you aren't doing that, you are creating new metaphors for yourself or others. In programming, with our desire to be an "engineering" discipline instead of an "art", we call these metaphors "abstractions". 

Sometimes the metaphors/abstractions we work with are great and appropriate and empowering. Sometimes they suck and are hard to work with. Eventually, the good ones will start to suck and be hard to work with. The metaphors and abstractions are built on top of assumptions, and those assumptions won't be true forever.

## Reducing Terms to Words in Tech / Software

Just an off-the-top-of-my-head list of common terms used in programming that are words that have some level of meaning outside of our usage. 

- "Connection"
	- Word Definition
		- a relationship or link between two people or things.
	- Examples
		- "Database Connection"
			- The one "end" of the relationship is defined (the Database) but the other is assumed (self, or this) - the "application creating the connection"
		- Network Connection
- "File"
	- Word Definition
		- "a folder or box for holding loose papers that are typically arranged in a particular order for easy reference."
	- This one seems to have been co-opted from common usage. The common definition of the word "file" is actually the usage of the word "Directory" (below).
	- File is a thing that holds the state of something at the time the file was produced?
	- There seems to have been some effort on the behalf of operating systems developers to differentiate between "files" and "documents", but I don't know if that really became a meaningful distinction for most people. 
	- File has a pretty low semantic weight. 
- "Directory"
	- Word Definition
		- A list of stuff, organized in some way (alphabetical, thematically)
		- The phone directory, employee directory.
	- In tech has a different meaning, and I'm not convinced the metaphor has paid off. It's better than the "Folder" metaphor, perhaps.
- "Identity"
	- Word Definition
		- the fact of being who or what a person or thing is.
- "Stream"
	- A continuous flow (of liquid, gas, people)
- "Object"
	- A material thing that can be seen or touched.
- "Instance"
	- An example or single occurrence of something
- "Function"
	- a relationship or expression involving one or more variables.
- "Module"
	- each of a set of standardized parts or independent units that can be used to construct a more complex structure, such as an item of furniture or a building.
- "Procedure"
	- an established or official way of doing something.
- "Pool"
	- a group of people available for work when required or considered as a resource.
	- a common fund into which all contributors pay and from which financial backing is provided.
- "Repository"
	- a place, building, or receptacle where things are or may be stored.
- "Branch"
	- diverge from the main route
- "Application"
	- the action of putting something into operation.
- "Server"
	- a person or thing that provides a service or commodity
- "Attribute"
	- a quality or feature regarded as a characteristic or inherent part of someone or something.
- "Property"
	- A thing that belongs to someone
	- an attribute, quality, or characteristic of something.
- "Behavior" 
	- the way in which an animal or person acts in response to a particular situation or stimulus
- "Method"
	- a particular form of procedure for accomplishing or approaching something, especially a systematic or established one.
- "State"
	- the particular condition that someone or something is in at a specific time.
- "Event"
	- A thing that happens