import { USER_STORAGE_KEY } from '../constants/storage'
import { USER_DEFAULT_USERNAME, USER_DEFAULT_PASSWORD } from '../constants/auth'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { v4 as randomId } from 'uuid'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(true)

  const updateUserData = (userData = null) => {
    let definedUser = {
      username: USER_DEFAULT_USERNAME,
      sessionId: randomId(),
      password: USER_DEFAULT_PASSWORD
    }

    if (userData !== null) {
      if (userData?.username !== definedUser.username) {
        if (!Object.keys(userData).includes('sessionId')) {
          userData.sessionId = randomId()
        }
      } else if (!Object.keys(userData).includes('sessionId')) {
        userData.sessionId = randomId()
      }

      definedUser = userData
    }

    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(definedUser))
    setUserData(definedUser)
  }

  useEffect(() => {
    const exist = sessionStorage.getItem(USER_STORAGE_KEY)

    if (exist != null) {
      const userData = sessionStorage.getItem(USER_STORAGE_KEY)
      updateUserData(JSON.parse(userData))
    } else {
      updateUserData()
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
  const invalidData = [null, undefined, '', 'undefined', 'null']

  let isUserValid = true

  if (invalidData.includes(userData)) {
    isUserValid = false
  } else if (userData?.username === USER_DEFAULT_USERNAME) {
    isUserValid = false
  }

  return { userData, updateUserData, isUserValid }
}

export { AuthProvider, useAuth }
