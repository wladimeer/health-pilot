import { useSidebar } from '../contexts/Sidebar'

const ButtonSidebarItem = ({ icon, text, active, handleClick = null }) => {
  const { expanded } = useSidebar()

  return (
    <div
      className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounder-md
        cursor-pointer transition-colors group/item h-10
        ${
          active
            ? 'bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-800'
            : 'hover:bg-gray-300 text-gray-600'
        }
      `}
      onClick={handleClick}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all text-nowrap ${expanded ? 'w-52 ml-3' : 'w-0'}
        `}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
            z-50 absolute left-10 rounded-md px-2 py-1
            bg-gray-800 text-gray-100 text-sm text-nowrap
            transition-all invisible opacity-25 duration-300
            group-hover/item:visible group-hover/item:left-14
            group-hover/item:opacity-100 whitespace-nowrap
          `}
        >
          {text}
        </div>
      )}
    </div>
  )
}

export default ButtonSidebarItem
