# Lab 5

**Due:** 3/24 before class

## Part 1
Preload your Mongo database by calling your external API(s) from Lab 3 100 times and loading those documents into a collection. The data in each document doesn’t necessarily need to differ, but it will make things easier if they do. You may modify the documents in any way you need to make the rest of this lab easier.

## Part 2: Creating a database API
Create one new endpoint for your Node API: name it /db.
There is a second level of hierarchy: a number that begins at 1 and increases from there. So endpoints like /db/50 and /db/75 are legal. Each /db/:number endpoint is tied directly to a specific document in the collection (you might consider adding a key:value pair to each  document, where the value matches the :number, to make this easier for you).

The /db endpoint and the /db/:number endpoints should listen on all four HTTP verbs: GET, POST, PUT, and DELETE.

- The GET request logic on /db/:number should fetch one specific document from the collection, whichever document corresponds to that number. If the GET request is on /db, you should get a listing of all valid documents in the collection (do not simply print every document!).
- The POST request logic should allow you to add a new document to the collection. The document to add will be in the body of the POST request. This logic must be done on the /db endpoint only. A POST request to a /db/:number endpoint should result in an error.
- The PUT logic on /db/:number should allow you to update an existing document. The desired changes to the document should be specified in the body of the PUT request. A PUT request on a document that does not exist should return an error. A PUT request on the /db endpoint should bulk update all documents in the collection.
- The DELETE logic on /db/:number should allow you to delete an existing document. You don’t need a body for this logic. A DELETE request on a /db/:number that does not exist does not return an error (it returns OK). A DELETE request on /db should mass delete all documents in the collection.

## Part 3: A new React component
Make a new React component that presents an input box for :number (or 0 or empty for the /db endpoint), a large input field to be used for the body for POST and PUT requests, and four buttons: one for each HTTP verb. This component will talk to the API implemented in part 2. Display sensible output for successes and errors for all verb and endpoint combinations.

## README.md file
README.md files are not optional. Put in it all your citations, a running work log, where you got stuck, how you got unstuck, and anything you’d like us to consider for creativity.

## Grading
- Part 2: 20 points
- Part 3: 10 points
- Creativity: 10 points
- README.md: 10 points
- **Total: 50 points**
