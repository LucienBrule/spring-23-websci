import {useEffect, useState} from "react";
import {Map} from "@/components/map";
import styles from "@/styles/weather.module.css"

export interface IWeatherResponse{
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ]
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number

    }
    visibility: number,
    wind: {
        speed: number,
        deg: number
        gust: number
    }
    rain: {
        "1h": number
    }
    clouds: {
        all: number
    }
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    }
    timezone: number,
    id: number,
    name: string,
    cod: number
}
export function Weather(){

    const [coords,setCoords] = useState({lat:0,lon:0})
    const [weather,setWeather] = useState<IWeatherResponse>({} as IWeatherResponse)

    useEffect(() => {
        const fetchWeather = async () => {
            const res = await fetch("/api/weather?lat="+coords.lat+"&lon="+coords.lon)
            const data: IWeatherResponse = await res.json()
            setWeather(data)
        }

        fetchWeather()
            .catch((err) => {
                console.log(err)
                alert("Error fetching weather data. Please try again later.")
            })

    },[coords])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({lat:position.coords.latitude,lon:position.coords.longitude})
            })
        }

    },[])


    if(!weather.cod || weather.cod !== 200){
        return <div>Loading...</div>
    }

    return (

            <div className="weather-container">
                <div className="weather-item">
                    <div className="weather-label">Location:</div>
                    <div className="weather-value">{weather.name}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Weather:</div>
                    <div className="weather-value">{weather.weather[0].description}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Temperature:</div>
                    <div className="weather-value">{weather.main.temp}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Feels Like:</div>
                    <div className="weather-value">{weather.main.feels_like}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Low:</div>
                    <div className="weather-value">{weather.main.temp_min}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">High:</div>
                    <div className="weather-value">{weather.main.temp_max}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Pressure:</div>
                    <div className="weather-value">{weather.main.pressure}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Humidity:</div>
                    <div className="weather-value">{weather.main.humidity}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Visibility:</div>
                    <div className="weather-value">{weather.visibility}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Wind Speed:</div>
                    <div className="weather-value">{weather.wind.speed}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Wind Direction:</div>
                    <div className="weather-value">{weather.wind.deg}</div>
                </div>
                <div className="weather-item">
                    <div className="weather-label">Clouds:</div>
                    <div className="weather-value">{weather.clouds.all}</div>
                </div>

                <Map lat={coords.lat} lon={coords.lon} zoom={9}/>
            </div>

    )
}
