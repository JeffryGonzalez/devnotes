---
title: TypeScript for Application Developers
draft: false
tags:
  - typescript
  - training
date: 2024-03-18
---
Many developers learn TypeScript almost accidentally, as a side-effect of learning frameworks like Angular, React, or Vue, or NodeJS applications like tools and APIs.

This course is designed to help developers to understand and *embrace* TypeScript as a helpful tool for building all sorts of applications.

A stumbling block for a lot of developers moving from languages like C# or Java is the emphasis on functions and functional programming idioms in TypeScript. Unlike C#, or Java, in JavaScript functions are "first class citizens", and so they are very prominent in web programming. Believe it or not, TypeScript makes the kind of programming JavaScript programmers have done for decades *easier* and just importantly, *safer*.

In this course, we will take a bit of time to actually learn "the way of TypeScript". Spoiler: It's "types". In other languages, like C#, we use things like classes and maybe some interfaces to build a solution, in TypeScript we create various *types*, and to advanced TypeScript developers, these types allow us to:

* Express clearly the intention of our code, and allow us confidence in changing our mind without breaking things (fearless refactoring!).
* Create self-documenting code that deflects bugs by making invalid states impossible.
* Have a stable code base that bridges the gap between our type system and the chaotic world of dynamically typed JavaScript that is running in the browser.
## Target Audience

In this course, we assume you've been using TypeScript for a bit. Maybe you are an Angular, React, or Vue programmer, or have been doing some NodeJS programming and you are ready to take your skills to the next level.

This course is *perfect* for developers that have reached the stage in their TypeScript programming career where they have a combination of annoyance with the constant errors and warnings from TypeScript and a curiosity about why everyone thinks it is so great.
## Objectives

### Understanding the Role of TypeScript and Transpilation
We will look at how the TypeScript compiler produces JavaScript code. We will dig into compiler options, and gain an understanding of the key pieces of the typescript compiler configuration (`tsconfig.json`). *Transpilation* is a borrowed word from math. In programming, we use it to mean that we have one language (in this case TypeScript), that when put through the compiler, produces *another* language (here, JavaScript). Sometimes our TypeScript code produces the exact same code as the JavaScript, sometimes it produces markedly *less* JavaScript code than our TypeScript source, and sometimes even more. We'll understand how this process works. We will also explore (`x.d.ts`) type definition files and how those are used by TypeScript when integration with 3rd party libraries.

### Use Object-Oriented Programming in TypeScript
We will start on what, for many developers, is somewhat familiar ground. We will learn how to create types using classes, how to design constructors, methods, and properties. We will explore common OOP idioms like *encapsulation*, *inheritance*, and *polymorphism*. Finally, we will explore more advanced OOP patterns like factories, and dependency injection and see how TypeScript makes these patterns even easier than many statically typed languages (like C# or Java).

We will, in this section, explore the "limited" primitive types in JavaScript/TypeScript, and later we will learn to extend and customize them.
### Use Functional Programming in TypeScript
While JavaScript (and therefore TypeScript) isn't a strictly *functional* language like Lisp, Scheme, or Haskell, it does lean heavily into functional programming styles. We will learn how to solve the same old problems (and some new ones!) we create classes by composing our solution with a set of related functions. We will learn about higher-ordered functions (functions that take one or more functions as an argument, and/or return a function), explore immutability, and learn how functions can be *typed*, and provide elegant solutions to common web programming tasks.

### Defining Our Own Types
This is the major shift in our thinking that TypeScript demands.. As C# or Java programmers, "Types" are a sort of side-effect of creating classes. In languages like TypeScript, we have the most success when we think about the kind of things we need (types), and *then* provide the code that accomplishes our intentions.
TypeScript has a *rich* set of features for defining, extending, and even limiting existing types. We will learn the built in type utilities (like `Pick`, `Omit`, etc.), learn to define types with interfaces and type aliases, explore union and intersection types, solve common programming issues with discriminated unions, learn pattern matching and type assertions, and learn the difference between the `any` type and the `unknown` type.

We will learn how to implement generic types, so that we can easily reuse type definitions to create order in our code base.

Then we will take it to the *next level* and learn how TypeScript allows us to create new types from existing types. Using Mapped Types and Template Literal Types, we will do things that you just can't do in statically typed languages like C# or Java - we will have our TypeScript code create new types for us, opening up a new world of possibilities, particularly for library or framework developers.
### Organizing TypeScript Code within an Application
A nice thing about TypeScript being a *superset* of JavaScript is the ability to do *eventual typing*. As application developers, TypeScript will largely stay out of our way, and *infer* types for us. Even with minimal type annotations, the TypeScript compiler will replace literally hundreds of unit tests we used to have to write if we were writing "raw" JavaScript. We can decide to add additional type information to both better document our code, as well as protect other developers on our project when they decide to reuse something we've created and tested.

In this section we will divert a bit into talking about JavaScript modules, bundlers, and how the code is built to send to the browser, then explore patterns like exports, imports, and "barrels" within our project. The TypeScript compiler provides some *early-bound*, compile time protection against changes in monolithic applications, and we will optimize our code to provide the best developer feedback.

### Packaging TypeScript Libraries For Others with NPM
When we have some TypeScript code that *graduates* from being specific to a project, to more generally useful across other projects, we might consider creating a reusable package for our code. We will learn how to compile, bundle, and make our dependencies explicit in these packages, as well as providing human documentation, as well as the type declarations, for other developers. We will implement Semantic Versioning and provide tests that help us decide when a part of the version (major, minor, or patch) needs incrementing.

### TypeScript Can't Do *Everything*
As great as TypeScript is, it has it's limitations.  TypeScript developers *must* be aware that no matter how expressive of a type system you create for your application, it does not exist at the level of the JavaScript code running in the browser or NodeJS. Many TypeScript programmers are shocked when their well-designed code fails (sometimes spectacularly, sometimes slowly "rotting" as the application runs) when your code encounters unverified code from the "outside" world, like malformed data from an API. We will explore how to validate and ensure the *sanctity* of our types with type assertions, and take a look at schema validation tools that are essential for TypeScript developers. In this course, we will learn the basics of the [Zod](https://zod.dev/) schema validation library.
### TypeScript Patterns in Frameworks
We will finish up the course looking at how particular web frameworks use TypeScript, including Angular, Vue, React, and server-side applications like Express and NestJS. If time allows, we will look at "hybrid", "backend for frontend" TypeScript applications like NextJS, Nuxt, and AnalogJS allow us to have the type safety of TypeScript extended across the network boundary.

## Classroom Environment
For this class you will be provided with a pre-configured Virtual Machine. We will use (primarily) Visual Studio Code for writing TypeScript code, and use Git and Github for source code control. If you use tools other than this, it might be helpful to read up on these tools a bit before class. You don't need to be a master at either, but knowing your way around a bit will allow you to focus better on the material at hand.

For the first part of the course, we will focus on TypeScript without the context of a specific framework (like Angular, React, etc.). We will write unit tests for the code as we go, which will give developers a partial introduction to unit testing TypeScript applications.  Functional tests will not be part of this course.
