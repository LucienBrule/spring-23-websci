import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
console.log("[info] main.tsx loaded")
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

const getBackendHealthStatus = async () => {
  const response = await fetch('/api/health')
  const json = await response.json()
  return json.status
}

console.log('Checking backend health...')
getBackendHealthStatus().then((status) => {
  console.log(`Backend health is ${status}`)
}).catch((error) => {
  console.error('Error checking backend health:', error)
})
