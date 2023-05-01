import express, { Router } from 'express';
import bodyParser from "body-parser";
const router: Router = express.Router();
const BASE_PATH = '/quiz2';

router.use(bodyParser.json());

const Quiz2Mock = {
    listing: [
        {
            "number": 1,
            "quote": "Mocks are my favorite"
        },
        {
            "number": 2,
            "quote": "I love mocks"
        },
        {
            "number": 3,
            "quote": "Mocks are the best"
        }
    ],
    addDocument: (document: any) => {
        const documentNumber = Quiz2Mock.listing.length + 1;
        Quiz2Mock.listing.push({...document, number: documentNumber});
    },
    updateDocument: (number: number, document: any) => {
        if(number > 0 && number <= Quiz2Mock.listing.length)
            Quiz2Mock.listing[number - 1] = document;
    },
    bulkUpdate: (documents: any[]) => {
        Quiz2Mock.listing = documents;
    },
    deleteDocument: (number: number) => {
        if(number > 0 && number <= Quiz2Mock.listing.length)
            Quiz2Mock.listing.splice(number - 1, 1);
    },
    getDocument: (number: number) => {
        if(number > 0 && number <= Quiz2Mock.listing.length)
            return Quiz2Mock.listing[number - 1];
        else
            throw new Error('Document not found');
    },
    getDocuments: () => {
        return Quiz2Mock.listing;
    }
}
/**
 * GET /quiz2
 * Get a listing of all nodes from the collection
 * Do not simply dump the entire database.
**/
router.get(BASE_PATH, (req, res) => {
    res.json(Quiz2Mock.getDocuments());
});


/**
 * GET /quiz2/:number
 * Get the document corresponding to :number
 */
router.get(`${BASE_PATH}/:number`, (req, res) => {
    const number = Number(req.params.number);
    try{
        res.json(Quiz2Mock.getDocument(number));
    }
    catch (e) {
        res.status(404).send("Not Found");
    }
});

/**
 * POST /quiz2
 * Connect to one of the external APIs you’ve used this semester and put a new document from that API into your collection.
 * You do not need to perform any ETL on it
 * (though you can if you’d like, as something that gets counted as creativity).
 *
 */
router.post(BASE_PATH, async (req, res) => {

    //     make request to kanye.rest
    const response = await fetch('https://api.kanye.rest');

    //     parse the response
    const data = await response.json();

    //     add the data to the collection
    Quiz2Mock.addDocument(data);

    res.json(data);
});

/**
 * POST /quiz2/:number
 * Update the document corresponding to :number
 *
 */

router.post(`${BASE_PATH}/:number`, (req, res) => {
    const number = Number(req.params.number);
    const document = req.body;
    Quiz2Mock.updateDocument(number, document);
    res.json(document);
});

/**
 * PUT /quiz2
 * Bulk update all documents in the collection
 */

router.put(BASE_PATH, (req, res) => {
    const documents = req.body;
    Quiz2Mock.bulkUpdate(documents);
    res.json(documents);
});

/**
 * PUT /quiz2/:number
 * Update the document corresponding to :number
 * If the document doesn't exist, throw a human readable error
 */
router.put(`${BASE_PATH}/:number`, (req, res) => {
    const number = Number(req.params.number);
    const document = req.body;
    if(number > 0 && number <= Quiz2Mock.listing.length) {
        Quiz2Mock.updateDocument(number, document);
        res.json(document);
    }
    else {
        res.status(400).send("Bad Request");
    }
});

/**
 * DELETE /quiz2
 * Delete all documents in the collection
 */

router.delete(BASE_PATH, (req, res) => {
    Quiz2Mock.bulkUpdate([]);
    res.json({"message": "All documents deleted"});
});

/**
 * DELETE /quiz2/:number
 * Delete the document corresponding to :number
 */

router.delete(`${BASE_PATH}/:number`, (req, res) => {
    const number = Number(req.params.number);
    Quiz2Mock.deleteDocument(number);
    res.json({"message": "Document deleted"});
});



export { router as Quiz2Router };