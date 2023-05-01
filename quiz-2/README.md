# Web Science Quiz 2

Step 1.: Build

```docker-compose build```

Step 2.: Run

```docker-compose up -d```

Step3.: Logs

```docker-compose logs --follow```

---

Architecture:

This project implements a basic client server architecture with the codebase split between client and server, namely web and api in the codebase. 

It uses nginx as a reverse proxy to handle routing between both services, exposing them on the same url.

**NOTE** The class lab VMS don't have enough resources to run this stack, so you'll need to run it on your own machine.
(which is incredibly easy, just follow the steps above)

