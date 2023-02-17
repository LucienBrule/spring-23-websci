import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <div
          style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                height:"100px",
                width:"300px"

          }}
          className="card">
        {[...Array(10).keys()].map((i) => (
            <MyButton key={i} number={i} />
        ))}
      </div>
    </div>
  )
}

interface MyButtonProps {
    key: number
    onClick?: (key: number) => void
    number?: number

}
function MyButton({key,onClick,number}: MyButtonProps){
    const [count, setCount] = useState(0)
    return (
        <button
            onClick={
            ()=>{
                setCount((count) => count + 1)
                onClick && onClick(key)
            }
        }>
            {number} |  {count}
        </button>
    )
}

export default App
