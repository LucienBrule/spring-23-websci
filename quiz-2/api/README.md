# Endpoints:


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
