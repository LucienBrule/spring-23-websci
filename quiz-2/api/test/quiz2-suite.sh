#!/usr/bin/env bash

export BASE_URL="http://localhost:3000"

# Test 1
# Make request to endpoint, pipe to jq
# Expected: A JSON array of objects
echo "Test 1: GET /api/v1/quiz2"
curl localhost:3000/api/v1/quiz2 | jq .

# Test 2
# Make request to endpoint, it grabs new data and stores in database
echo "Test 2: POST /api/v1/quiz2"
curl -X POST localhost:3000/api/v1/quiz2
curl localhost:3000/api/v1/quiz2 | jq .

# Test 3
# GET /quiz2/:number
# make request to endpoint, get document corresponding to number
echo "Test 3: GET /api/v1/quiz2/:number"
curl localhost:3000/api/v1/quiz2/1 | jq .

# Test 4
# POST /quiz2/:number
# Update document corresponding to number with new data
# as JSON object in request body
echo "Test 4: POST /api/v1/quiz2/:number"
curl -X POST -H "Content-Type: application/json" -d '{"quote":"Mmm thats some good testing","number":1}' localhost:3000/api/v1/quiz2/1
curl localhost:3000/api/v1/quiz2/1 | jq .

# Test 5
# PUT /api/v1/quiz2
# Bulk update all documents with new data
# as JSON array in request body
echo "Test 5: PUT /api/v1/quiz2"
curl -X PUT -H "Content-Type: application/json" -d '[{"quote":"Mmm thats some good testing","number":1},{"quote":"Mmm thats some good testing","number":2},{"quote":"Mmm thats some good testing","number":3},{"quote":"Mmm thats some good testing","number":4},{"quote":"Mmm thats some good testing","number":5}]' localhost:3000/api/v1/quiz2
curl localhost:3000/api/v1/quiz2 | jq .

# Test 6
# PUT /api/v1/quiz2/:number
# Update document corresponding to number with new data
# as JSON object in request body
echo "Test 6: PUT /api/v1/quiz2/:number"
curl -X PUT -H "Content-Type: application/json" -d '{"quote":"Mmm thats some good testing","number":1}' localhost:3000/api/v1/quiz2/1
curl localhost:3000/api/v1/quiz2/1 | jq .

# Test 7
# DELETE /api/v1/quiz2
# Delete all documents
echo "Test 7: DELETE /api/v1/quiz2"
curl -X DELETE localhost:3000/api/v1/quiz2
curl localhost:3000/api/v1/quiz2 | jq .

# Test 8
# DELETE /api/v1/quiz2/:number
# Delete document corresponding to number
echo "Test 8: Adding document to delete"
curl -X POST localhost:3000/api/v1/quiz2
curl localhost:3000/api/v1/quiz2 | jq .
echo "Test 8: DELETE /api/v1/quiz2/:number"
curl -X DELETE localhost:3000/api/v1/quiz2/1
curl localhost:3000/api/v1/quiz2 | jq .