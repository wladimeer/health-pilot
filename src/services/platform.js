import { PROVIDER_MODIFY_PAGE_KEY } from '../constants/pages'
import { HOLDING_LIST_PAGE_PATH, DEVICE_LIST_PAGE_PATH } from '../constants/paths'
import { DASHBOARD_PAGE_KEY, ADMIN_PAGE_KEY, PROVIDER_LIST_PAGE_KEY } from '../constants/pages'
import { HOLDING_LIST_PAGE_KEY, DEVICE_LIST_PAGE_KEY } from '../constants/pages'
import { DASHBOARD_PAGE_PATH, ADMIN_PAGE_PATH } from '../constants/paths'
import { useTranslation } from 'react-i18next'

const MENUS = {
  [DASHBOARD_PAGE_KEY]: {
    key: DASHBOARD_PAGE_KEY,
    icon: 'hiChartPie',
    path: DASHBOARD_PAGE_PATH
  },
  [ADMIN_PAGE_KEY]: {
    key: ADMIN_PAGE_KEY,
    icon: 'hiCog',
    path: ADMIN_PAGE_PATH,
    submenus: [
      {
        key: HOLDING_LIST_PAGE_KEY,
        icon: 'hiUserGroup',
        path: HOLDING_LIST_PAGE_PATH
      },
      {
        key: DEVICE_LIST_PAGE_KEY,
        icon: 'hiDeviceMobile',
        path: DEVICE_LIST_PAGE_PATH
      }
    ]
  }
}

const BREADCRUMBS = {
  [ADMIN_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: ADMIN_PAGE_PATH
    }
  },
  [HOLDING_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: ADMIN_PAGE_PATH
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: null
    }
  },
  [DEVICE_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: ADMIN_PAGE_PATH
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: null
    }
  },
  [DASHBOARD_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: DASHBOARD_PAGE_PATH
    }
  },
  [PROVIDER_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: ADMIN_PAGE_PATH
    },
    first: {
      key: 'breadcrumb.first',
      title: null,
      path: null
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: null
    }
  },
  [PROVIDER_MODIFY_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: ADMIN_PAGE_PATH
    },
    first: {
      key: 'breadcrumb.first',
      title: null,
      path: null
    },
    second: {
      key: 'breadcrumb.second',
      title: null,
      path: null
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: null
    }
  }
}

const getMenu = (pageKey) => {
  const { submenus } = MENUS[pageKey]

  submenus.forEach((item) => {
    const [translation] = useTranslation(item.key)
    item['title'] = translation('title')
    item['description'] = translation('description')
    item['redirect'] = translation('redirect')
  })

  return MENUS[pageKey]
}

const getAllMenus = () => {
  const menusKeys = Object.keys(MENUS)

  menusKeys.forEach((menuKey) => {
    const element = MENUS[menuKey]

    const [translation] = useTranslation(menuKey)
    element.title = translation('title')
  })

  return Object.values(MENUS)
}

const getBreadcrumb = (pageKey) => {
  const [translation] = useTranslation(pageKey)
  const breadcrumb = BREADCRUMBS[pageKey]
  const breadcrumbKeys = Object.keys(breadcrumb)

  breadcrumbKeys.forEach((key) => {
    const item = breadcrumb[key]
    item.title = translation(item.key)
  })

  return breadcrumb
}

const getConfig = (pageKey, includeMenu = false) => {
  const breadcrumb = getBreadcrumb(pageKey)

  const response = { breadcrumb }

  if (includeMenu) {
    const { submenus } = getMenu(pageKey)
    response.submenus = submenus
  }

  return response
}

export { getAllMenus, getConfig }
