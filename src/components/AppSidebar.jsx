import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'
import ButtonSidebarItem from './ButtonSidebarItem'
import { DASHBOARD_PAGE_PATH } from '../constants/paths'
import { ERROR_STATUS, EXCEPTION_STATUS, SUCCESS_STATUS } from '../constants/states'
import { ToastContainer, toast } from 'react-toastify'
import { SIDEBAR_KEY } from '../constants/component'
import { getAllMenus } from '../services/platform'
import { signOut } from '../services/intermediary'
import LinkSidebarItem from './LinkSidebarItem'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import Icon from './Icon'

const AppSidebar = () => {
  const navigate = useNavigate()
  const { isUserValid, userData, updateUserData } = useAuth()
  const [translation] = useTranslation(SIDEBAR_KEY)
  const menus = getAllMenus()

  const handleLogout = async () => {
    if (!isUserValid) {
      toast(translation('responses.text.error'), { type: 'warning' })
      
    } else {
      const response = await signOut(userData?.username)

      if (response?.status === SUCCESS_STATUS) {
        updateUserData()
        navigate(DASHBOARD_PAGE_PATH)
      }

      if (response?.status === EXCEPTION_STATUS) {
        toast(translation('responses.text.exception'), { type: 'error' })
      }

      if (response?.status === ERROR_STATUS) {
        toast(translation('responses.text.error'), { type: 'warning' })
      }
    }
  }

  return (
    <Sidebar>
      <ToastContainer />

      {menus.map(({ key, icon, path, submenus }) => (
        <LinkSidebarItem key={key} text={translation(key)} icon={<Icon icon={icon} />} to={path} />
      ))}

      <ButtonSidebarItem text={translation('logout')} icon={<Icon icon='hiOutlineLogout' />} handleClick={handleLogout} />
    </Sidebar>
  )
}

export default AppSidebar
