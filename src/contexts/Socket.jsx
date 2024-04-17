import { SERVER } from '../constants/paths'
import React, { createContext, useContext, useMemo } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(SERVER), [])
  const value = { socket }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

const useSocket = () => {
  return useContext(SocketContext)
}

export { SocketProvider, useSocket }
