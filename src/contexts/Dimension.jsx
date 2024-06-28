import { useState, useEffect } from 'react'

const getDimension = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

const useWindowDimension = () => {
  const [dimension, setDimension] = useState(getDimension())

  useEffect(() => {
    const handleResize = () => {
      setDimension(getDimension())
    }

    window.addEventListener('resize', handleResize)

    return handleResize
  }, [])

  return dimension
}

export default useWindowDimension
