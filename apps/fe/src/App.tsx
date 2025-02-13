import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

// web socket
// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
const SOCKET_URL = "https://connect-4-o4ye.onrender.com/"
// const SOCKET_URL = "http://localhost:3001/"


const socket = io(SOCKET_URL)

function App() {

  useEffect(() => {
    socket.on('connection', () => {
      console.log('fe connected')
    })

    socket.on('message', (data) => {
      console.log('received data:', data)
    })

    return () => {
      socket.off('connection')
      socket.off('message')
    }
  }, [socket])

  return (
    <>
      <div>test</div>
      <button type="button" className='mt-4 bg-blue-300 p-2 rounded-lg hover:bg-blue-500 hover:cursor-pointer' onClick={() => {socket.emit('msg', 'client message sent')}}>send message</button>
    </>
  )
}

export default App
