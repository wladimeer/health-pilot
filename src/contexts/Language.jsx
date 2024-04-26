import { useTranslation } from 'react-i18next'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from '../constants/language'
import { LANGUAGE_STORAGE_KEY } from '../constants/storage'

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [_, { changeLanguage }] = useTranslation()
  const [languageData, setLanguageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateLanguageData = (languageData = null) => {
    let definedLanguage = DEFAULT_LANGUAGE_CODE

    if (languageData !== null && VALID_LANGUAGE_CODES.includes(languageData)) {
      definedLanguage = languageData
    }

    sessionStorage.setItem(LANGUAGE_STORAGE_KEY, definedLanguage)
    setLanguageData(definedLanguage)
    changeLanguage(definedLanguage)
  }

  useEffect(() => {
    const exist = sessionStorage.getItem(LANGUAGE_STORAGE_KEY)

    if (exist != null) {
      const languageData = sessionStorage.getItem(LANGUAGE_STORAGE_KEY)
      updateLanguageData(languageData)
    } else {
      updateLanguageData()
    }

    setLoading(false)
  }, [])

  return (
    <LanguageContext.Provider value={{ languageData, updateLanguageData }}>
      {!loading && children}
    </LanguageContext.Provider>
  )
}

const useLanguage = () => {
  const { languageData, updateLanguageData } = useContext(LanguageContext)
  return { languageData, updateLanguageData }
}

export { LanguageProvider, useLanguage }
