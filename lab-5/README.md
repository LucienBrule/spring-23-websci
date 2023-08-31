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


### Task 1: Preload the Database
- [ ] Call the external API(s) from Lab 3 a hundred times and fetch the data
- [ ] Preload your Mongo database with the fetched documents

### Task 2: Implement /db API Endpoint
- [ ] Implement a new /db endpoint in your Node API
- [ ] Create sub-endpoints for each document (/db/:number), supporting GET, POST, PUT, and DELETE requests

### Task 3: Implement a New React Component
- [ ] Create a new React component with an input field for the document number and a larger input field for POST and PUT request bodies
- [ ] Implement four buttons for the HTTP verbs (GET, POST, PUT, DELETE)
- [ ] Configure the component to communicate with your API and handle user input and output
- [ ] Display appropriate output or error messages for different verb and endpoint combinations

### Task 4: Documentation
- [ ] Write a comprehensive README.md for your project
- [ ] Document your work progress, any difficulties encountered and how they were resolved
- [ ] Discuss your creative process and how you designed your application
- [ ] Cite any sources used during the development of your application

### Task 5: Repository Management
- [ ] Ensure regular commits and pushes to the repository
- [ ] Ensure all components and functionalities are working as expected
