import { useTranslation } from 'react-i18next'
import { SERVICES_KEY } from '../constants/service'
import { ACTIVE_STATE, MALE_STATE, UNAVAILABLE_STATE } from '../constants/states'
import { STATE_COLORS, ENTITIES_ID, ACTION_ICON_KEY } from '../constants/design'
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

const generateCardStructure = ({ pageKey, data }) => {
  const [translation] = useTranslation(pageKey)

  if (data.length > 0) {
    const dataKeys = Object.keys(data[0])

    dataKeys.forEach((key) => {
      const isType = key.split('_').includes('type')
      const isState = key.split('_').includes('state')

      data.forEach((item) => {
        if (isType) {
          const typeValue = item[key]

          item[key] = translation(`card.value.${typeValue}`)
        }

        if (isState) {
          const stateValue = item[key]

          let stateText = translation(`card.value.noState`)

          if (stateValue === UNAVAILABLE_STATE) {
            stateText = translation(`card.value.unavailableState`)
          } else {
            stateText = translation(`card.value.availableState`)
          }

          item['color'] = STATE_COLORS[stateValue]
          item[key] = stateText
        }
      })
    })

    data = [...data].map((item) => {
      const newItem = {}

      Object.keys(item).forEach((key) => {
        const camelCasedKey = toCamelCase(key)
        const value = item[key]

        newItem[camelCasedKey] = {
          title: translation(`card.title.${camelCasedKey}`),
          value: SERVICES_KEY.includes(value) ? translation(`card.value.${value}`) : value
        }
      })

      return newItem
    })
  }

  return { data, key: randomId() }
}

export {
  generateTableStructure,
  generateCardStructure,
  camelCaseKeys,
  toCamelCase,
  toSnakeCase,
  isArray,
  isObject,
  isString
}
