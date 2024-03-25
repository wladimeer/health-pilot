import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'
import { SIDEBAR_KEY } from '../constants/component'
import { getAllMenus } from '../services/platform'
import SidebarItem from './SidebarItem'
import Icon from './Icon'

const AppSidebar = () => {
  const [translation] = useTranslation(SIDEBAR_KEY)
  const menus = getAllMenus()

  return (
    <Sidebar>
      {menus.map(({ key, icon, path, submenus }) => (
        <SidebarItem key={key} text={translation(key)} icon={<Icon icon={icon} />} to={path} />
      ))}
    </Sidebar>
  )
}

export default AppSidebar
