import React, { useEffect } from 'react';
import AddAuctionButton from '../components/AddAuctionButton'; 
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
      <h1 className=''>Live Auctions</h1>
      <AddAuctionButton />
    </div>
  )
}

export default Auction;
