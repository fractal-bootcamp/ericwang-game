import { useEffect, useState } from 'react'
import { GameState, getColPlayers, Column, Player } from '../../be/src/game'
import { io } from 'socket.io-client'
import './App.css'

// web socket
// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
// const SOCKET_URL = "https://connect-4-o4ye.onrender.com/"
const SOCKET_URL = "https://ericwang-game-production-ad74.up.railway.app/"
// const SOCKET_URL = "http://localhost:3001/"

const socket = io(SOCKET_URL)

type ColumnProps = {
  column: Column
}

function ColumnComponent( {column}: ColumnProps ) {
  console.log(column)

  const getChipColor = (player: Player) => {
    if(player === 1) {
      return 'bg-red-500'
    } else if (player === 2) {
      return 'bg-amber-500'
    } else {
      return 'bg-neutral-800'
    }
  }

  return (
    <div className='hover:bg-green-600'>
      {column.map((player, index) => <div className={`${getChipColor(player)} rounded-full h-full w-full`}>{index}</div>)}
    </div>)
}


function App() {
  const [gameState, setGameState] = useState<GameState>()

  const defaultGameState: GameState = {
    board: [],
    status: 'ongoing',
    currentPlayer: ''
  }
  
  useEffect(() => {
    socket.on('connection', () => {
      console.log('connection fe')
    })

    socket.on('game', (data) => {
      console.log('received data:', data)
      setGameState(data)
    })

    socket.on('move', (data) => {
      console.log('received data:', data)
    })

    return () => {
      socket.off('connection')
      socket.off('game')
      socket.off('move')
    }
  }, [socket])

  useEffect(() => {
    console.log('gameState:', gameState)
  }, [gameState])

  return (
    <>
      <main className='max-w-[1440px] w-full mx-auto'>
        <div className='flex gap-4'>
          <div className='grow bg-neutral-600'>
            <h1 className='text-4xl font-bold mb-8 p-4'>Tailwind CSS Connect Four</h1>
          </div>
          <div className='grow bg-neutral-500 p-4'>
            <div className='px-3'>
            <div className='rounded-full w-[75px] h-[75px] bg-red-800 mb-4'></div>
          </div>
          <div className='grid grid-cols-7 w-full rounded-xl overflow-hidden p-4 bg-neutral-700'>
            {Array.from({ length: 7 }, (_, index) => {
              return (
                <div onClick={() => socket.emit('move', { gameState: gameState, index: index })}>
                  <ColumnComponent column={getColPlayers(index, gameState ?? defaultGameState)} />
                </div>)
            })}
          </div>

          </div>
        </div>
      </main>
      <div>test</div>
      <button type="button" className='mt-4 bg-blue-300 p-2 rounded-lg hover:bg-blue-500 hover:cursor-pointer' onClick={() => {socket.emit('move', gameState)}}>send message</button>
    </>
  )
}

export default App
