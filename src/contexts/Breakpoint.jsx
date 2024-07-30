import { createContext, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const BreakpointContext = createContext()

const BreakpointProvider = ({ children }) => {
  const initial = {
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
    is2ExtraLarge: false
  }

  const [breakpoints, setBreakpoints] = useState(initial)

  const isSmall = useMediaQuery({ maxWidth: 768 })
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isLarge = useMediaQuery({ minWidth: 1024, maxWidth: 1280 })
  const isExtraLarge = useMediaQuery({ minWidth: 1280, maxWidth: 1536 })
  const is2ExtraLarge = useMediaQuery({ minWidth: 1536 })

  useEffect(() => {
    if (isSmall) initial.isSmall = isSmall
    if (isMedium) initial.isMedium = isMedium
    if (isLarge) initial.isLarge = isLarge
    if (isExtraLarge) initial.isExtraLarge = isExtraLarge
    if (is2ExtraLarge) initial.is2ExtraLarge = is2ExtraLarge

    setBreakpoints(initial)
  }, [isSmall, isMedium, isLarge, isExtraLarge, is2ExtraLarge])

  return <BreakpointContext.Provider value={breakpoints}>{children}</BreakpointContext.Provider>
}

const useBreakpoint = () => {
  return useContext(BreakpointContext)
}

export { BreakpointProvider, useBreakpoint }
