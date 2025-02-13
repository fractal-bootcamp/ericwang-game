import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

// web socket
const socket = io('https://connect-4-o4ye.onrender.com/')

function App() {

  useEffect(() => {
    socket.on('connection', () => {
      console.log('fe connected')
    })
  }, [socket])

  return (
    <>
      <div>test</div>
    </>
  )
}

export default App
