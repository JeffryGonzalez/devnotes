---
title: Shared Database
draft: false
tags:
  - integration-pattern
  - anti-pattern
date: 2024-01-27
---

> **Shared Database** is an *anti-pattern* in Microservice architecture. It is an almost certain violation of the "independently deployable" guard rail.

Two or more microservices may share a database, and this is often a common step on decomposing a monolithic application into Microservices. The problem with this approach, long term, is the diverging concerns of each service will most likely require schema changes in the shared database, and that invalidates the "independently deployable" guard rail.

Using a shared database that your team "owns" is less of a liability than using a database not owned by your team.

When using relational databases the challenges become related to database optimization. If your microservices are focused on a single responsibility, they tend to be largely "write" intensive, or "read (query)" intensive, and it is difficult to adequately index and optimize a database for both at the same time.

When Microservices are each making changes to the database, you may have the need to transactions that have to be distributed. Distributed transactions aren't just an anti-pattern, they just don't work reliably and can cause huge problems in service availability.

**Shared databases are technical debt**. They may - and often are - worth it in the short term, but should be factored to other techniques in the long term.

Note: When I say "shared databases require coordination between service owners" that means you *MUST* provide that coordination. That means someone has to "own" the database and coordinate any schema changes, etc.

Shared Databases are such a bulwark in software architecture that it seems impossible to move away from them. We will look at some patterns and ways of thinking about software architecture later that will give you alternatives.