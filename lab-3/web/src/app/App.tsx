import React from 'react'
import './App.css'

function App() {

  const [health, setHealth] = React.useState('unknown')

  React.useEffect(() => {

    const getBackendHealthStatus = async () => {
      const response = await fetch('./api/v1/health')
      const json = await response.json()
      return json.status
    }


    const periodicHealthCheck = setInterval(() => {
      console.log('Checking backend health...')
      getBackendHealthStatus().then((status) => {
        console.log(`Backend health is ${status}`)
        setHealth(status)
      }).catch((error) => {
        console.error('Error checking backend health:', error)
        setHealth('error')
      })
    }, 5000)

    return () => {
      clearInterval(periodicHealthCheck)
    }


  }, [])

  return (
    <div className="App">
      <h1>Web</h1>
      <pre>
          health status: {health}
        </pre>
    </div>
  )
}

export default App
