# Lab 6 - ETL, Mongo

**Due:** April 4 before class

## Part 1
- Choose three APIs or data stores/data warehouses/gov’t sites with data sets that broadly provide the same genre of data as the external API used in the previous labs.
- Create a new collection in MongoDB.
- Download one document from each of the three new APIs/data stores and compare them to each other and to the documents from the external API used in the previous labs.
- Decide what data is important and what data is not important for the application.
- Devise a schema and write a program that normalizes the data into a single, consistent format.
- Load the documents into the new collection, repeating this process 100 times for each API.

## Part 2
- Extend the React component and Node server/API to be able to GET, POST, PUT, DELETE with the new collection.

## Part 3 (optional, bonus credit)
- Re-write the ETL pipeline from Part 1 in JavaScript.
- Create four new API endpoints in Node where running a GET on each endpoint will get data from one of the external sources, perform the whole ETL pipeline in Node, and put the transformed data into MongoDB.

## README.md
Please provide a README.md file that includes:
- All citations
- A running worklog
- Details on where you got stuck, and how you got unstuck
- Anything to be considered for creativity.

## Grading
- Part 1: 15 pts.
- Part 2: 15 pts.
- Creativity: 10 pts.
- README.md: 10 pts.
- Part 3 (optional): +10 pts.
- Total: 50 pts.
