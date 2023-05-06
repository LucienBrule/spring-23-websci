import React, {useEffect, useState, useRef} from "react";

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export interface MapProps{
    lat: number,
    lon: number,
    zoom: number
}
export function Map(props:MapProps){

    const mapContainer = useRef<any>(null)
    const map = useRef<mapboxgl.Map | any>(null)
    const [lng, setLng] = useState(props.lon || -73.6876)
    const [lat, setLat] = useState(props.lat || 42.7327)
    const [zoom, setZoom] = useState(props.zoom ||  9)

    useEffect(() => {
        if (map.current) return // initialize map only once

        console.log("Mapbox API Token: " + process.env.NEXT_PUBLIC_MAPBOX_API_KEY)
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        })
    }, [lng, lat, zoom])

    return (
        <div>
            <div id={"map"} ref={mapContainer} className={"map-container"}></div>
        </div>
    )
}