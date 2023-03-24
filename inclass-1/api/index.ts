import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Configuration, CreateCompletionResponse, OpenAIApi} from "openai";
import * as crypto from "crypto";
import {MongoClient,ServerApiVersion} from "mongodb";
dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(mongoURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
        }
    }
)
// OpenAI
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));

// KV Store
// base64 sha256 hash of prompt -> completion
// to prevent duplicate requests
const kv = new Map<string, CreateCompletionResponse>();

const hashFunction = (str: string) => {
    return crypto.createHash('sha256').update(str).digest('base64');
}


// Routes

app.get('/*', (req: Request, res: Response) => {

//     Debug, send back the request and headers

    const headers = JSON.stringify(req.headers,null,2);
    const request = JSON.stringify(req,null,2);
    res.send('Hello World! \n\n' + headers + '\n\n' + request);

});

app.get('/', (req: Request, res: Response) => {
  res.send('api root');
});

app.get('/api/hello', (req: Request, res: Response) => {
    console.log("GET api/hello")
    return res.send('Hello World!');
} );


// Add json to database
app.post('/api/add', async (req: Request, res: Response) => {
    console.log("POST api/add")
    const json = req.body;
    if(!json) return res.status(400).send("No json provided");
    const db = client.db("test");
    const collection = db.collection("test");
    const result = await collection.insertOne(json);
    return res.json(result);
});

// Get json from database
app.get('/api/get', async (req: Request, res: Response) => {
    console.log("GET api/get")
    const db = client.db("test");
    const collection = db.collection("test");
    const result = await collection.find().toArray();
    return res.json(result);
});


app.get("/api/completion?prompt=:prompt",async (req: Request, res: Response) => {

    if(!req.params.prompt) return res.status(400).send("No prompt provided");

    const prompt = req.params.prompt;

    if(prompt.length > 2048) return res.status(400).send("Prompt too long (max 2048 characters)");

    const hash = hashFunction(prompt);

    if(kv.get(hash)) return res.json(kv.get(hash));


    const completion = await openai.createCompletion({
        prompt: prompt,
        model: "text-davinci-003",
    })

    console.log("GET api/completions, \n" + JSON.stringify(completion.data,null,2));

    if(!completion.data) return res.status(500).send("No completion data returned");

    kv.set(hash,completion.data);

    return res.json(completion.data);

});






app.listen(Number(port),"0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});