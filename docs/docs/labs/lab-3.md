# Lab 3 - Node+Express

Due 2/17, before class.

## Part 0: Selecting an External API

For this lab, select an API that you would like to work with for the rest of the semester. The API you select must have a zero-cost option, and should provide a substantial amount of data in a single call.

## Part 1: Creating a Professional Frontend Experience

Design a responsive, professional frontend experience that uses around a dozen pieces of data from the API you selected. Look to other web apps and mobile apps that use similar APIs for inspiration.

## Part 2: Designing an API

In addition to the external API, your app should provide its own API. The frontend should only communicate with this API, not the external one. Your API may be organized in any way you'd like, but should not go more than three levels deep.

Your API should implement at least one action for each verb: GET, POST, PUT, DELETE. Although you don't have a database yet, you can "fake" the POST, PUT, and DELETE actions or write them to the filesystem.

You can use Postman to test your API.

## Part 3: Using the External API with Your API

Your app should work like this:

1. User inputs information and selects an action from the form.
2. The form produces an HTTP request that your API (created using Node+Express) picks up and parses.
3. The parsing result is reassembled into an API request for the external API.
4. Node sends the API request to the external API and receives an answer.
5. Node writes the answer to a JSON file on the filesystem.
6. Node sends the contents of the JSON file to the frontend.
7. Frontend updates after reading the JSON file.

Please make sure your app is available on your VM.

## Grading

- Frontend: 5 pts.
- Your API: 15 pts.
- Handling external API: 10 pts.
- Creativity (individual): 10 pts.
- README.md: 10 pts.
- Pushing node_modules folder: -5 pts.
- Total: 50 pts.

### README.md

Your README.md file should include a detailed worklog, things you found difficult and how you resolved them, and your creativity efforts. Please document the API you designed in the README.md file as well.
