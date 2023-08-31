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


### Task 1: Select an External API
- [ ] Research APIs with zero-cost options and substantial data
- [ ] Choose a suitable API and understand its data structure and endpoints

### Task 2: Design a Frontend Experience
- [ ] Sketch a layout of the frontend including components
- [ ] Implement a form for user inputs and actions
- [ ] Create a responsive design for the frontend
- [ ] Display data from the selected API in the frontend

### Task 3: Design Your Own API
- [ ] Plan the structure of your API, defining endpoints and methods
- [ ] Implement the API using Node.js and Express.js
- [ ] Implement 'fake' POST, PUT, DELETE actions or write them to the filesystem
- [ ] Test the API using Postman

### Task 4: Integrate the External API with Your API
- [ ] Parse the form data and reassemble it into an API request for the external API
- [ ] Send the API request to the external API and receive a response
- [ ] Write the response data to a JSON file on the filesystem
- [ ] Send the contents of the JSON file to the frontend

### Task 5: Deploy the App on VM
- [ ] Ensure the app runs correctly on your local environment
- [ ] Deploy the app on your VM and ensure it works correctly

### Task 6: Documentation
- [ ] Document your work progress, issues, and resolutions
- [ ] Explain your creative process and how you designed the API
- [ ] Write a comprehensive README.md for the project

### Task 7: Repository Management
- [ ] Ensure node_modules folder is included in .gitignore
- [ ] Regularly commit changes and push to GitHub
