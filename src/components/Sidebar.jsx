import Icon from './Icon'
import { useSidebar } from '../contexts/Sidebar'
import Logo from '../assets/logo.svg?react'

const Sidebar = ({ children }) => {
  const { expanded, updateExpanded } = useSidebar()

  return (
    <aside className="h-screen font-fira-sans-condensed">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`
              overflow-hidden transition-all
              ${expanded ? 'w-52 mr-2' : 'w-0 mr-0'}
            `}
          >
            <Logo />
          </span>

          <button
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => updateExpanded(!expanded)}
          >
            {expanded ? (
              <Icon icon="hiOutlineMinusSm" size={5} />
            ) : (
              <Icon icon="hiOutlinePlusSm" size={5} />
            )}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  )
}

export default Sidebar
