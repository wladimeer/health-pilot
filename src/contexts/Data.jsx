import { v4 as randomId } from 'uuid'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './Socket'

const user = {
  username: 'admin',
  sessionId: randomId(),
  password: 'admin'
}

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [services, setServices] = useState({
    fonasa: []
  })

  const { sessionId } = user
  const { socket } = useSocket()

  useEffect(() => {
    socket.emit('fonasa:all', { sessionId })

    socket.on('fonasa:all', (data) => {
      setServices(({ fonasa, ...props }) => ({
        fonasa: data,
        ...props
      }))
    })

    return () => {
      socket.off('fonasa:all', { sessionId })
    }
  }, [socket])

  const value = { services }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

const useData = () => {
  return useContext(DataContext)
}

export { DataProvider, useData }
