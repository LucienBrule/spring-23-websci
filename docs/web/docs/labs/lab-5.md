# Lab 5

**Due Date: 3/24 before class**

## Overview

In this lab, you will preload a Mongo database, create a database API with various endpoints and HTTP verbs, and implement a new React component that communicates with the API.

## Objectives

1. Preload your Mongo database with 100 documents from the external API(s) used in Lab 3.
2. Create a database API with a /db endpoint and /db/:number endpoints, supporting GET, POST, PUT, and DELETE requests.
3. Implement a new React component that talks to the API and handles user input and output.

## Guidelines

### Part 1: Preloading the Database

Preload your Mongo database by calling your external API(s) from Lab 3 100 times and loading those documents into a collection. The data in each document doesn’t necessarily need to differ, but it will make things easier if they do. You may modify the documents in any way you need to make the rest of this lab easier.

### Part 2: Creating a Database API

Create a new endpoint for your Node API: name it /db. Implement /db/:number endpoints for each document in the collection, supporting GET, POST, PUT, and DELETE requests.

### Part 3: New React Component

Make a new React component that presents an input box for :number, a large input field for the body of POST and PUT requests, and four buttons for each HTTP verb. This component will talk to the API implemented in Part 2. Display sensible output for successes and errors for all verb and endpoint combinations.

### README.md

Include a README.md file with citations, a work log, information about where you got stuck and how you got unstuck, and any creativity notes.

## Grading

| Criteria          | Points |
|-------------------|--------|
| Part 2            | 20     |
| Part 3            | 10     |
| Creativity        | 10     |
| README.md         | 10     |
| **Total**         | 50     |

