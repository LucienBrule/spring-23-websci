Web Science Quiz 2
Spring 2023
April 18, 2023

Instructions:
Read everything twice before you do anything.
Submit everything you want graded to GitHub, in your personal repo in a folder named quiz2.
It must be hosted on your Azure VM using Node (no Apache!). I will go to https://[yourFQDN]/node and grade whatever I see unless you give me explicit instructions to do something else.
Good luck!

Question 1
Find 2 or 3 new APIs that, when combined with any/all of the APIs you’ve worked with this semester, might tell some interesting stories that can be visualized with something like D3. Preload a MongoDB collection (making a new collection is fine) with some of that data.

Extend your Node.js server and, using Express.js, create the following API for your React frontend to talk to:

- GET /quiz2
    - Get a listing of all nodes from the collection
    - Do not simply dump the entire database.

- GET /quiz2/:number
  - Get the document corresponding to :number
- POST /quiz2
  - Connect to one of the external APIs you’ve used this semester and put a new document from that API into your collection. You do not need to perform any ETL on it (though you can if you’d like, as something that gets counted as creativity).
- POST /quiz2/:number
  - Create a proper error with a proper error code and human-readable error description.
- PUT /quiz2
  - Bulk update all documents in the collection
- PUT /quiz2/:number
  - Update the document corresponding to :number
  - If the document corresponding to :number does not exist, create a proper error with a proper error code and human-readable error description.
- DELETE /quiz2
  - Bulk delete all documents in the collection
- DELETE /quiz2/:number
  - Delete the document corresponding to :number

Extend your React frontend with at least two new visualizations. What those visualizations contain will depend on your data. Tell interesting stories.

After you have accomplished this, your task is to go far above and beyond this minimum. Show me everything you’ve learned over the past two semesters. We’ll call it creativity. Include a README.md file that has all of your citations and everything you’d like me to consider for creativity.

Grading
Database			25 pts
Node+Express API		25 pts
React/Visualizations		25 pts
Creativity			25 pts
Total				100 pts
Extra credit (+5): What did Dr. Callahan major in as an undergraduate?
