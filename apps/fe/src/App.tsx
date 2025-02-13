import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

// web socket
const socket = io('http://localhost:3001')

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
