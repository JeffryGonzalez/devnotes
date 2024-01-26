---
title: Docker on Linux
draft: false
tags:
  - containers
  - linux
  - systemd
date: 2022-08-22
---
## Configure Docker to start on boot with systemd[](https://docs.docker.com/engine/install/linux-postinstall/#configure-docker-to-start-on-boot-with-systemd)

Many modern Linux distributions use [systemd](https://docs.docker.com/config/daemon/systemd/) to manage which services start when the system boots. On Debian and Ubuntu, the Docker service starts on boot by default. To automatically start Docker and containerd on boot for other Linux distributions using systemd, run the following commands:

```bash
$ sudo systemctl enable docker.service
$ sudo systemctl enable containerd.service
```

To stop this behavior, use `disable` instead.

```bash
$ sudo systemctl disable docker.service
$ sudo systemctl disable containerd.service
```

