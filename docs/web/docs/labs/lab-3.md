# Lab 3 - Node+Express

**Due Date: 2/17, before class**

## Overview

In this lab, you will work with an external API of your choice to create a web app with a professional frontend experience. You will also design your own API using Node and Express, which will communicate with the external API.

## Objectives

1. Select an external API with a zero-cost option and substantial data.
2. Design a responsive, professional frontend experience using data from the selected API.
3. Design your own API using Node and Express.
4. Implement at least one action for each verb in your API: GET, POST, PUT, DELETE.
5. Use the external API with your API following the provided app workflow.
6. Make sure your app is available on your VM.

## Guidelines

### Part 1: Selecting an External API

- Choose an API that provides a substantial amount of data in a single call.

### Part 2: Creating a Professional Frontend Experience

- Design a responsive frontend that uses around a dozen pieces of data from the selected API.
- Look to other web apps and mobile apps for inspiration.

### Part 3: Designing an API

- Your frontend should only communicate with your API, not the external one.
- Your API may be organized in any way, but should not go more than three levels deep.
- "Fake" the POST, PUT, and DELETE actions or write them to the filesystem.
- Use Postman to test your API.

### Part 4: Using the External API with Your API

Follow this app workflow:

1. User inputs information and selects an action from the form.
2. The form produces an HTTP request that your API picks up and parses.
3. The parsing result is reassembled into an API request for the external API.
4. Node sends the API request to the external API and receives an answer.
5. Node writes the answer to a JSON file on the filesystem.
6. Node sends the contents of the JSON file to the frontend.
7. Frontend updates after reading the JSON file.

## Grading

- Frontend: 5 pts.
- Your API: 15 pts.
- Handling external API: 10 pts.
- Creativity (individual): 10 pts.
- README.md: 10 pts.
- Pushing node_modules folder: -5 pts.
- Total: 50 pts.

## README.md

Include a detailed worklog, difficulties encountered and resolutions, creativity efforts, and documentation of the API you designed in the README.md file.

