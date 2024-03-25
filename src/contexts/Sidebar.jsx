import { createContext, useContext, useEffect, useState } from 'react'
import { EXPAND_SIDEBAR_KEY } from '../constants/storage'

const SidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(null)

  const updateExpanded = (expandedState = null) => {
    let definedState = true

    if (expandedState !== null) {
      definedState = expandedState
    }

    sessionStorage.setItem(EXPAND_SIDEBAR_KEY, definedState)
    setExpanded(definedState)
  }

  useEffect(() => {
    const isExist = sessionStorage.key(EXPAND_SIDEBAR_KEY)

    if (isExist != null) {
      const expandedState = sessionStorage.getItem(EXPAND_SIDEBAR_KEY)
      updateExpanded(JSON.parse(expandedState))
    } else {
      updateExpanded()
    }
  }, [])

  return (
    <SidebarContext.Provider value={{ expanded, updateExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => {
  const { expanded, updateExpanded } = useContext(SidebarContext)
  return { expanded, updateExpanded }
}

export { SidebarProvider, useSidebar }
