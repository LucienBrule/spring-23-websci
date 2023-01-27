import {useEffect, useState} from "react";


interface IWeatherResponse{
    coord: {
        lon: number,
        lat: number
    },
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }

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



    return (
        <div>
            {weather && <pre> {JSON.stringify(weather,null,2)} </pre>}
        </div>
    )
}
