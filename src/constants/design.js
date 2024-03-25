import { ACTIVE_STATE, INACTIVE_STATE } from './states'
import { DEVICE_LIST_PAGE_KEY, HOLDING_LIST_PAGE_KEY } from './pages'
import { PROVIDER_LIST_PAGE_KEY } from './pages'

const STATE_COLORS = {
  [ACTIVE_STATE]: 'success',
  [INACTIVE_STATE]: 'danger'
}

const DEFAULT_ELEMENT_QUANTITY = 5
const OPTION_ELEMENT_QUANTITY = [10, 50, 100, 150, 200]
const INVALID_ELEMENT_QUANTITY = ['']

const ACTIONS_KEY = 'actions'

const ENTITIES_ID = {
  [HOLDING_LIST_PAGE_KEY]: 'holdingId',
  [DEVICE_LIST_PAGE_KEY]: 'deviceId',
  [PROVIDER_LIST_PAGE_KEY]: 'providerId'
}

const ACTION_ICON_KEY = {
  viewList: { icon: 'hiOutlineViewList', color: 'default' },
  modify: { icon: 'hiOutlinePencilAlt', color: 'yellow' }
}

export {
  STATE_COLORS,
  DEFAULT_ELEMENT_QUANTITY,
  OPTION_ELEMENT_QUANTITY,
  INVALID_ELEMENT_QUANTITY,
  ACTIONS_KEY,
  ENTITIES_ID,
  ACTION_ICON_KEY
}
