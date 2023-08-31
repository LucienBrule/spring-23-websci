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


### Task 1: Choose APIs and Create a New Collection
- [ ] Choose three APIs or data sources that provide similar data to your external API from the previous labs
- [ ] Create a new collection in MongoDB

### Task 2: Download and Compare Documents
- [ ] Download one document from each of the three new APIs/data sources
- [ ] Compare these documents to each other and to the documents from your previous external API

### Task 3: Decide Important Data
- [ ] Decide what data from these documents is important for your application
- [ ] Identify any data that is not important and can be omitted

### Task 4: Devise a Schema
- [ ] Create a schema that normalizes the data into a consistent format

### Task 5: Load Documents into the Collection
- [ ] Write a program that loads the normalized documents into your new MongoDB collection
- [ ] Repeat this process 100 times for each API/data source

### Task 6: Extend React Component and Node Server/API
- [ ] Extend your existing React component to interact with the new MongoDB collection
- [ ] Extend your Node server/API to support GET, POST, PUT, and DELETE requests for the new collection

### Task 7: Implement ETL Pipeline in JavaScript (optional for bonus credit)
- [ ] Rewrite your ETL pipeline from Part 1 in JavaScript
- [ ] Create four new API endpoints in your Node server/API
- [ ] Implement GET requests on these endpoints to fetch data, run the ETL pipeline, and load the transformed data into MongoDB

### Task 8: Documentation
- [ ] Write a comprehensive README.md for your project
- [ ] Document your work progress, any difficulties encountered and how they were resolved
- [ ] Discuss your creative process and how you designed your application
- [ ] Cite any sources used during the development of your application

### Task 9: Repository Management
- [ ] Ensure regular commits and pushes to the repository
- [ ] Ensure all components and functionalities are working as expected
