import type { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.OPENWEATHERMAP_API_KEY



// @ts-ignore
const getWeatherByLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if(data.cod !== 200) {
        return dummyData
    }
    // if the api would accept authorize the damn key already...
    return data
}


type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {lat, lon} = req.query
    const weather = await getWeatherByLocation(lat, lon)
    res.status(200).json(weather)
}


const dummyData = {
    "coord": {
        "lon": 10.99,
        "lat": 44.34
    },
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 298.48,
        "feels_like": 298.74,
        "temp_min": 297.56,
        "temp_max": 300.05,
        "pressure": 1015,
        "humidity": 64,
        "sea_level": 1015,
        "grnd_level": 933
    },
    "visibility": 10000,
    "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
    },
    "rain": {
        "1h": 3.16
    },
    "clouds": {
        "all": 100
    },
    "dt": 1661870592,
    "sys": {
        "type": 2,
        "id": 2075663,
        "country": "IT",
        "sunrise": 1661834187,
        "sunset": 1661882248
    },
    "timezone": 7200,
    "id": 3163858,
    "name": "Zocca",
    "cod": 200
}
