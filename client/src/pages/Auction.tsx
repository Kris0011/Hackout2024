import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketContext'

function Auction() {

  const socket = useSocket();
  if(!socket) return <h1>Loading ... </h1>

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to server')
    })
    
  }
  , [socket])

  return (
    <div>
      Auction
    </div>
  )
}

export default Auction
