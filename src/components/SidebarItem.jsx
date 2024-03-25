import { Link } from 'react-router-dom'
import { useSidebar } from '../contexts/Sidebar'

const SidebarItem = ({ icon, text, active, to = null }) => {
  const { expanded } = useSidebar()

  return (
    <Link
      className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounder-md
        cursor-pointer transition-colors group/item
        ${
          active
            ? 'bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-800'
            : 'hover:bg-gray-300 text-gray-600'
        }
      `}
      to={to ? to : '/'}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
        `}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
            z-10 absolute left-full rounded-md px-2 py-1 ml-4
            bg-gray-800 text-gray-100 text-sm
            transition-all invisible opacity-20 -translate-x-3
            group-hover/item:visible group-hover/item:opacity-100
            group-hover/item:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </Link>
  )
}

export default SidebarItem
