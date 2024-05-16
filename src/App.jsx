import i18n from 'i18next'
import 'react-toastify/dist/ReactToastify.css'
import { I18nextProvider } from 'react-i18next'
import { ADMIN_PAGE_KEY } from './constants/pages'
import { LOGIN_MODAL_KEY } from './constants/modals'
import { DASHBOARD_PAGE_KEY } from './constants/pages'
import { PROVIDER_LIST_PAGE_KEY } from './constants/pages'
import { VALID_LANGUAGE_CODES } from './constants/language'
import { SPANISH_LANGUAGE_CODE } from './constants/language'
import providerListPageES from './locales/es/providerListPage.json'
import { HOLDING_LIST_PAGE_KEY, DEVICE_LIST_PAGE_KEY } from './constants/pages'
import holdingListPageES from './locales/es/holdingListPage.json'
import deviceLisPagetES from './locales/es/deviceListPage.json'
import dashboardPageES from './locales/es/dashboardPage.json'
import adminPageES from './locales/es/adminListPage.json'
import loginModalES from './locales/es/loginModal.json'
import sidebarES from './locales/es/sidebar.json'
import { LanguageProvider } from './contexts/Language'
import { SidebarProvider } from './contexts/Sidebar'
import { SIDEBAR_KEY } from './constants/component'
import { NextUIProvider } from '@nextui-org/react'
import { SocketProvider } from './contexts/Socket'
import { AuthProvider } from './contexts/Auth'
import AppRouter from './routers/AppRouter'
import './App.css'

i18n.init({
  interpolation: { escapeValue: false },
  resources: {
    [SPANISH_LANGUAGE_CODE]: {
      [SIDEBAR_KEY]: sidebarES,
      [ADMIN_PAGE_KEY]: adminPageES,
      [HOLDING_LIST_PAGE_KEY]: holdingListPageES,
      [PROVIDER_LIST_PAGE_KEY]: providerListPageES,
      [DEVICE_LIST_PAGE_KEY]: deviceLisPagetES,
      [DASHBOARD_PAGE_KEY]: dashboardPageES,
      [LOGIN_MODAL_KEY]: loginModalES
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
            <SocketProvider>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            </SocketProvider>
          </SidebarProvider>
        </LanguageProvider>
      </I18nextProvider>
    </NextUIProvider>
  )
}

export default App
