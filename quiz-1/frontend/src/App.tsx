import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [online, isOnline] = useState(false)
    const [university, setUniversity] = useState("")
    const [response, setResponse] = useState([])
    useEffect(() => {

        const healthCheck = async () => {

            try {
                const res = await fetch('/api/v1/health')
                const data = await res.json()
                console.log(data)
                if (data["status"] === "ok") {
                    isOnline(true)
                }
            } catch (e) {
                console.error(e)
                isOnline(false)
            }
        }

        const interval = setInterval(() => {
                healthCheck()
            }
            , 1000)
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = (event: any) => {
        console.log(event)
        fetchUniversityData()


    }

    const fetchUniversityData = async () => {
        try {
            const res = await fetch('/api/v1/university' + "?name=" + university)
            const data = await res.json()
            console.log(data)
            setResponse(data)
        } catch (e: any) {
            console.error(e)
            alert("Error" + e.message)
        }
    }

    const handleOnChange = (e: any) => {
        setUniversity(e.target.value)
    }

    return (
        <div className="App">

            {online ? <div className="online status_indicator"/> : <div className="offline status_indicator"/>}

            <div className="card">
                <div className="input-group">
                    <input type="text" id="input" onChange={handleOnChange} value={university}/>
                    <button type="submit" id="button-addon2" onClick={handleSubmit}>Button</button>
                </div>
            </div>

            {/*<div style={{textAlign:"left"}}>*/}
            {/*{*/}
            {/*    response && <pre>{JSON.stringify(response, null, 2)}</pre>*/}
            {/*}*/}
            {/*</div>*/}

            {/*

              {
    "domains": [
      "unr.edu"
    ],
    "state-province": null,
    "name": "University of Nevada, Reno",
    "web_pages": [
      "http://www.unr.edu/"
    ],
    "country": "United States",
    "alpha_two_code": "US"
  },

            */}

            {
                response && response.map( (item: any) => {

                    return(
                        <div className="university">
                            <h3>{item.name} </h3>
                            <b>{item.domains[0]} </b>
                        <br/>
                            <a href={item["web_pages"]}>{item["web_pages"][0]} </a>
                            <div>{item.country} </div>
                        </div>
                    )

                })
            }
            <div style={{textAlign:"left"}}>
            </div>


        </div>
    )
}

export default App
