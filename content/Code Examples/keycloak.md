---
title: Keycloak Dev Environment
draft: false
tags:
  - auth
  - identity
  - keycloak
date: 2024-01-27
---


Example Docker Compose File:

```yml
version: "3"
services:
  keycloak:
      image: quay.io/keycloak/keycloak:18.0.2
      command: ["start-dev", "--import-realm"]
      environment:
        KEYCLOAK_ADMIN: admin
        KEYCLOAK_ADMIN_PASSWORD: TokyoJoe138!
        KC_REALM_NAME: "hypertheory"
      volumes:
        - ./keycloak/realm-export.json:/opt/keycloak/data/import/realm.json:ro
      ports:
        - 8080:8080
volumes:
  mongo-data:
networks:
  registrations:
  
```

Export the realm from your setup into the `./keycloak/realm-export.json` file.

The big thing is the lines for the `command` and the `KC_REALM_NAME` environment variable. Of course, you need the volume as well.