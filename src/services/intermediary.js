import axios from 'axios'
import { SERVER, HOLDING_PATH, PROVIDER_PATH, AUTH_PATH } from '../constants/paths'
import { EXCEPTION_STATUS } from '../constants/states'

axios.defaults.withCredentials = true

// Holding Endpoints
const getAllHoldings = async () => {
  const REQUEST_URL = `${SERVER}/${HOLDING_PATH}/all`

  let response = {}

  try {
    const { data } = await axios.get(REQUEST_URL)
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

// Provider Endpoints
const findProviderById = async (providerId) => {
  const REQUEST_URL = `${SERVER}/${PROVIDER_PATH}/find`

  const DATA = {
    provider_id: providerId
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

const findProvidersByHoldingId = async (holdingId) => {
  const REQUEST_URL = `${SERVER}/${PROVIDER_PATH}/find-all`

  const DATA = {
    holding_id: holdingId
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
