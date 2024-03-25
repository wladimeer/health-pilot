import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { ADMIN_PAGE_KEY } from './constants/pages'
import { DASHBOARD_PAGE_KEY } from './constants/pages'
import { PROVIDER_LIST_PAGE_KEY } from './constants/pages'
import { VALID_LANGUAGE_CODES } from './constants/language'
import providerListPageES from './translations/es/providerListPage.json'
import { HOLDING_LIST_PAGE_KEY, DEVICE_LIST_PAGE_KEY } from './constants/pages'
import holdingListPageES from './translations/es/holdingListPage.json'
import deviceLisPagetES from './translations/es/deviceListPage.json'
import dashboardPageES from './translations/es/dashboardPage.json'
import adminPageES from './translations/es/adminListPage.json'
import sidebarES from './translations/es/sidebar.json'
import { LanguageProvider } from './contexts/Language'
import { SidebarProvider } from './contexts/Sidebar'
import { SIDEBAR_KEY } from './constants/component'
import { NextUIProvider } from '@nextui-org/react'
import AppRouter from './routers/AppRouter'
import './App.css'

i18n.init({
  interpolation: { escapeValue: false },
  resources: {
    es: {
      [SIDEBAR_KEY]: sidebarES,
      [ADMIN_PAGE_KEY]: adminPageES,
      [HOLDING_LIST_PAGE_KEY]: holdingListPageES,
      [PROVIDER_LIST_PAGE_KEY]: providerListPageES,
      [DEVICE_LIST_PAGE_KEY]: deviceLisPagetES,
      [DASHBOARD_PAGE_KEY]: dashboardPageES
    }
  },
  lng: VALID_LANGUAGE_CODES
})

const App = () => {
  return (
    <NextUIProvider>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <SidebarProvider>
            <AppRouter />
          </SidebarProvider>
        </LanguageProvider>
      </I18nextProvider>
    </NextUIProvider>
  )
}

export default App
