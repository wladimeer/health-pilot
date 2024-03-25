import axios from 'axios'
import { SERVER, HOLDING_PATH, PROVIDER_PATH } from '../constants/paths'

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

export { getAllHoldings, findProvidersByHoldingId, findProviderById }
