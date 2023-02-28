import express, { Request, Response } from 'express';
import axios from 'axios';
const router = express.Router();

const UNI_API_URL = 'http://universities.hipolabs.com/search?name=';

const RPI_JSON = [
    {
        "domains": [
            "rpi.edu"
        ],
        "state-province": null,
        "name": "Rensselaer Polytechnic Institute",
        "web_pages": [
            "http://www.rpi.edu/"
        ],
        "country": "United States",
        "alpha_two_code": "US"
    }
]
router.get('/', async (req: Request, res: Response) => {

//     Check for query string parameters
    const query = req.query;
    if(!query.name) {
        res.status(400).json({ error: 'Missing name query string parameter' });
        return;
    }

    console.log("query.name: " + query.name)

    try{
        const response = await axios.get("http://universities.hipolabs.com/search?name=" + query.name)
        const json = response.data;

        if(response.data.length == 0) {
            res.json(
                RPI_JSON
            )
        }
        res.status(200).json(json);
    }
    catch (e) {
        console.log(e)
        res.json(RPI_JSON)
    }



});

export default router;
