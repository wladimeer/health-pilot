import { DASHBOARD_PAGE_KEY, ADMIN_PAGE_KEY, PROVIDER_LIST_PAGE_KEY } from '../constants/pages'
import { HOLDING_LIST_PAGE_KEY, DEVICE_LIST_PAGE_KEY } from '../constants/pages'
import { useTranslation } from 'react-i18next'

const MENUS = {
  [DASHBOARD_PAGE_KEY]: {
    key: DASHBOARD_PAGE_KEY,
    icon: 'hiChartPie',
    path: '/'
  },
  [ADMIN_PAGE_KEY]: {
    key: ADMIN_PAGE_KEY,
    icon: 'hiCog',
    path: '/admin',
    submenus: [
      {
        key: HOLDING_LIST_PAGE_KEY,
        icon: 'hiUserGroup',
        path: '/admin/holding-list'
      },
      {
        key: DEVICE_LIST_PAGE_KEY,
        icon: 'hiDeviceMobile',
        path: '/admin/device-list'
      }
    ]
  }
}

const BREADCRUMBS = {
  [ADMIN_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: '/admin'
    }
  },
  [HOLDING_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: '/admin'
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: '/admin/holding-list'
    }
  },
  [DEVICE_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: '/admin'
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: '/admin/device-list'
    }
  },
  [DASHBOARD_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: '/'
    }
  },
  [PROVIDER_LIST_PAGE_KEY]: {
    home: {
      key: 'breadcrumb.home',
      title: null,
      path: '/admin'
    },
    prev: {
      key: 'breadcrumb.prev',
      title: null,
      path: '/admin/holding-list'
    },
    current: {
      key: 'breadcrumb.current',
      title: null,
      path: '/admin/holding-list/provider-list'
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

export { getMenu, getAllMenus, getBreadcrumb }
