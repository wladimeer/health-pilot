import { SERVICES_KEY } from '../constants/service'
import { AVAILABLE_STATE, ERROR_STATE } from '../constants/states'
import { ACTIVE_STATE, MALE_STATE, UNAVAILABLE_STATE } from '../constants/states'
import { STATE_COLORS, ENTITIES_ID, ACTION_ICON_KEY } from '../constants/design'
import { SERVICE_TYPE_KEY, SERVICE_STATE_KEY } from '../constants/design'
import { INACTIVE_STATE, FEMALE_STATE } from '../constants/states'
import { TYPE_OBJECT, TYPE_STRING } from '../constants/types'
import { v4 as randomId } from 'uuid'

const isInvalid = (data) => {
  const invalidsData = [null, undefined]

  return invalidsData.includes(data)
}

const isArray = (data) => {
  return Array.isArray(data)
}

const isObject = (data) => {
  return !Array.isArray(data) && !isInvalid(data) && typeof data === TYPE_OBJECT
}

const isString = (data) => {
  return isInvalid(data) && typeof data == TYPE_STRING
}

const toCamelCase = (word) => {
  return word.replace(/_(\w)/g, (_, letter) => letter.toUpperCase())
}

const toSnakeCase = (word) => {
  return word.replace(/[A-Z]/g, (_, match) => `_${match.toLowerCase()}`)
}

const lowerCaseKeys = (data) => {
  const newItem = {}

  Object.keys(data).forEach((key) => {
    const lowerCasedKey = String(key).toLowerCase()
    const value = data[key]

    newItem[lowerCasedKey] = value
  })

  return newItem
}

const camelCaseKeys = (data) => {
  const newItem = {}

  Object.keys(data).forEach((topKey) => {
    const camelCasedTopKey = toCamelCase(topKey)
    const topValue = data[topKey]

    if (isObject(topValue) && Object.keys(topValue).length > 0) {
      newItem[camelCasedTopKey] = topValue
    } else if (isArray(topValue) && topValue.length > 0 && Object.keys(topValue[0]).length > 0) {
      const newTopValue = topValue.map((item) => {
        return camelCaseKeys(item)
      })

      newItem[camelCasedTopKey] = newTopValue
    } else {
      newItem[camelCasedTopKey] = topValue
    }
  })

  return newItem
}

const generateTableStructure = ({
  pageKey,
  tableKeys,
  tableValues,
  actionsKeys = [],
  actionsFunctions = {},
  translation
}) => {
  let actions = []
  let data = []

  const columns = tableKeys.map((key) => ({
    header: translation(`table.columns.${toCamelCase(key)}`),
    accessorKey: toCamelCase(key)
  }))

  if (actionsKeys.length > 0) {
    actions = [...actionsKeys].map((key) => ({
      key: `${toCamelCase(key)}-${randomId()}`,
      title: translation(`table.data.${toCamelCase(key)}`),
      icon: ACTION_ICON_KEY[key].icon,
      color: ACTION_ICON_KEY[key].color,
      func: actionsFunctions[key]
    }))
  }

  if (tableValues.length > 0) {
    tableKeys.forEach((key) => {
      const isState = key.split('_').includes('state')
      const isUrgency = key.split('_').includes('urgency')
      const isGender = key.split('_').includes('gender')

      if (isState || isUrgency || isGender) {
        tableValues.forEach((item) => {
          const stateValue = item[key]
          let stateText = translation(`table.data.noData`)

          if (isState) {
            stateText = translation(`table.data.noState`)

            if (stateValue === INACTIVE_STATE) {
              stateText = translation(`table.data.inactiveState`)
            } else {
              stateText = translation(`table.data.activeState`)
            }
          }

          if (isUrgency) {
            stateText = translation(`table.data.noUrgency`)

            if (stateValue === INACTIVE_STATE) {
              stateText = translation(`table.data.inactiveUrgency`)
            } else if (stateValue === ACTIVE_STATE) {
              stateText = translation(`table.data.activeUrgency`)
            }
          }

          if (isGender) {
            stateText = translation(`table.data.noGender`)

            if (stateValue === FEMALE_STATE) {
              stateText = translation(`table.data.female`)
            } else if (stateValue === MALE_STATE) {
              stateText = translation(`table.data.male`)
            }
          }

          item[key] = stateText
        })
      }
    })

    data = [...tableValues].map((item) => {
      const newItem = {}

      Object.keys(item).forEach((key) => {
        const camelCasedKey = toCamelCase(key)
        const value = item[key]

        newItem[camelCasedKey] = value
      })

      return newItem
    })
  }

  return {
    columns,
    data,
    noDataMessage: translation('table.noDataMessage'),
    elementQuantity: translation('select.elementQuantity'),
    entityId: ENTITIES_ID[pageKey],
    actions
  }
}

const generateCardStructure = ({ data, translation }) => {
  let newData = []

  if (data.length > 0) {
    data.forEach((item) => {
      const itemKeys = Object.keys(item)
      const objectData = {}

      itemKeys.forEach((key) => {
        const newKey = toCamelCase(key)

        if (newKey === SERVICE_TYPE_KEY) {
          const typeValue = String(item[key]).toLowerCase()
          objectData[newKey] = translation(`card.value.${typeValue}`)
        } else if (newKey === SERVICE_STATE_KEY) {
          const stateValue = item[key]

          let stateText = translation(`card.value.noState`)

          if (stateValue === AVAILABLE_STATE) {
            stateText = translation(`card.value.availableState`)
          } else if (stateValue === ERROR_STATE) {
            stateText = translation(`card.value.failedState`)
          } else if (stateValue === UNAVAILABLE_STATE) {
            stateText = translation(`card.value.unavailableState`)
          }

          objectData['color'] = STATE_COLORS[stateValue]
          objectData[newKey] = stateText
        } else {
          objectData[newKey] = item[key]
        }
      })

      newData.push(objectData)
    })

    newData = [...newData].map((item) => {
      const newItem = {}

      Object.keys(item).forEach((key) => {
        const camelCasedKey = toCamelCase(key)
        const value = item[key]

        newItem[camelCasedKey] = {
          title: translation(`card.title.${camelCasedKey}`),
          value: SERVICES_KEY.includes(toCamelCase(String(value)))
            ? translation(`card.value.${toCamelCase(value)}`)
            : value
        }
      })

      return newItem
    })
  }

  return { data: newData, key: randomId() }
}

export {
  generateTableStructure,
  generateCardStructure,
  camelCaseKeys,
  lowerCaseKeys,
  toCamelCase,
  toSnakeCase,
  isArray,
  isObject,
  isString
}
