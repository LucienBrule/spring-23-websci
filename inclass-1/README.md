# Web Science Lab 3

Step 1.: Build

```podman-compose build```

Step 2.: Run

```podman-compose up -d```

Step3.: Logs

```podman-compose logs --follow```

---

Architecture:

This project implements a basic client server architecture with the codebase split between client and server, namely web and api in the codebase. 

It uses nginx as a reverse proxy to handle routing between both services, exposing them on the same url.


