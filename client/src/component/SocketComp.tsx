import React from 'react'
import { useSocket } from '../context/SocketContext'

export const SocketComp = () => {


    const socket = useSocket();

    if(!socket) return <div>socket not connected</div>


    socket.on('connect', () => {
        console.log('connected', socket.id)
    })



  return (
    <div>socketComp</div>
  )
}
