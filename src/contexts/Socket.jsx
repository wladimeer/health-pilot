import { SERVER } from '../constants/paths'
import React, { createContext, useContext } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(SERVER), [])
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
  }

  useEffect(() => {
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [socket])

  const value = { socket, isConnected }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

const useSocket = () => {
  return useContext(SocketContext)
}

export { SocketProvider, useSocket }
