import { useState } from 'react'
import './App.css'

function App() {
    const [motd, setMotd] = useState('Welcome to the Motd App!')

    let fetchNewMotd = async () => {
        const data = await fetch('/api/v1/quiz2/1')

        const json = await data.json()

        setMotd(json.quote)
    }


  return (
    <div className="App">
        <h1>{motd}</h1>
        <div>
            <button onClick={
                () => fetchNewMotd()
            }>Click Me</button>
        </div>
    </div>
  )
}

export default App
