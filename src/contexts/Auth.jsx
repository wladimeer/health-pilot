import React, { useEffect, createContext, useState, useContext } from 'react'
import { USER_STORAGE_KEY } from '../constants/storage'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateUserData = (userData = null) => {
    if (userData !== null) {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    } else {
      sessionStorage.removeItem(USER_STORAGE_KEY)
    }

    setUserData(userData)
  }

  useEffect(() => {
    const isExist = sessionStorage.key(USER_STORAGE_KEY)

    if (isExist != null) {
      const userData = sessionStorage.getItem(USER_STORAGE_KEY)
      setUserData(JSON.parse(userData))
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ userData, updateUserData }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const { userData, updateUserData } = useContext(AuthContext)
  return { userData, updateUserData }
}

export { AuthProvider, useAuth }
