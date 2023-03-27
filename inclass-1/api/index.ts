import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {MongoClient,ServerApiVersion} from "mongodb";
dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';
const mongoURL = "mongodb+srv://developer:developer@cluster0.9d6sggx.mongodb.net" || process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(mongoURL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
        }
    }
)

// Routes

// app.get('/', (req: Request, res: Response) => {
//   res.send('api root');
// });

// app.get('/api/hello', (req: Request, res: Response) => {
//     console.log("GET api/hello")
//     return res.send('Hello World!');
// } );


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
    const resumes = await client.db('resumes').collection('In Class Project').find().toArray();
    return res.json(resumes);

    // console.log("GET api/get")
    // const db = client.db("test");
    // const collection = db.collection("test");
    // const result = await collection.find().toArray();
    // return res.json(result);
});




app.listen(Number(port),"0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});