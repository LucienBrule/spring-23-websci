import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [resume, setResume] = useState({} as any)


  useEffect(() => {
    
    let fetchResumeJSON = async () => {

      try{
        let response = await fetch('/api/get')
        let data = await response.json()
        console.log(data)
        setResume(data)
      }catch(e){
        console.log(e)
      }

    
      
    }


    fetchResumeJSON()


  }, [])

  return (
    <div className="App">
        <pre>
          {JSON.stringify(resume, null, 2)}
        </pre>
    </div>
  )
}

export default App
