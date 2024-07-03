import axios from 'axios'
import { SERVER, HOLDING_PATH, PROVIDER_PATH, AUTH_PATH } from '../constants/paths'
import { EXCEPTION_STATUS } from '../constants/states'

axios.defaults.withCredentials = true

// Holding Endpoints
const getAllHoldings = async () => {
  const REQUEST_URL = `${SERVER}/${HOLDING_PATH}/all`
  const { data } = await axios.get(REQUEST_URL)
  return await data
}

// Provider Endpoints
const findProviderById = async (providerId) => {
  const REQUEST_URL = `${SERVER}/${PROVIDER_PATH}/find`

  const DATA = {
    provider_id: providerId
  }

  const { data } = await axios.post(REQUEST_URL, DATA)
  return await data
}

const findProvidersByHoldingId = async (holdingId) => {
  const REQUEST_URL = `${SERVER}/${PROVIDER_PATH}/find-all`

  const DATA = {
    holding_id: holdingId
  }

  const { data } = await axios.post(REQUEST_URL, DATA)
  return data
}

// Auth Endpoints
const signIn = async (username, password) => {
  const REQUEST_URL = `${SERVER}/${AUTH_PATH}/login`

  const DATA = {
    username,
    password
  }

  let response = {}

  try {
    const { data } = await axios.post(REQUEST_URL, DATA)
    response = data
  } catch ({ message }) {
    response = {
      status: EXCEPTION_STATUS,
      message: message,
      data: {}
    }
  } finally {
    return response
  }
}

const signOut = async (username) => {
  const REQUEST_URL = `${SERVER}/${AUTH_PATH}/logout`

  const DATA = { username }

  let response = {}

  try {
    const { data } = await axios.post(REQUEST_URL, DATA)
    response = data
  } catch ({ message }) {
    response = {
      status: EXCEPTION_STATUS,
      message: message,
      data: {}
    }
  } finally {
    return response
  }
}

export { getAllHoldings, findProvidersByHoldingId, findProviderById, signIn, signOut }
