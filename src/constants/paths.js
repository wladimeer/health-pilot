const SERVER = import.meta.env.VITE_SERVER
const PROVIDER_PATH = import.meta.env.VITE_PROVIDER_PATH
const HOLDING_PATH = import.meta.env.VITE_HOLDING_PATH

const NO_PATH = ''
const DASHBOARD_PAGE_PATH = '/'
const ADMIN_PAGE_PATH = '/admin'
const HOLDING_PAGE_PATH = `${ADMIN_PAGE_PATH}/holding-list`
const PROVIDER_PAGE_PATH = `${HOLDING_PAGE_PATH}/provider-list/:holdingId`
const DEVICE_PAGE_PATH = `${ADMIN_PAGE_PATH}/device-list`
const LOGIN_PAGE_PATH = '/login'

export {
  SERVER,
  PROVIDER_PATH,
  HOLDING_PATH,
  DASHBOARD_PAGE_PATH,
  ADMIN_PAGE_PATH,
  HOLDING_PAGE_PATH,
  PROVIDER_PAGE_PATH,
  DEVICE_PAGE_PATH,
  LOGIN_PAGE_PATH,
  NO_PATH
}
