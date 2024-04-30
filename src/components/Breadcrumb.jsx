import { Link } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Icon from './Icon'

const Breadcrumb = ({ home, prev, current, button, showButton = false }) => {
  return (
    <div className="flex items-center justify-between">
      <Breadcrumbs className="font-fira-sans-condensed mb-5 flex gap-2 items-center">
        <BreadcrumbItem startContent={<Icon icon="hiHome" />}>
          <Link className="text-lg" to={home.path}>
            {home.title}
          </Link>
        </BreadcrumbItem>

        {prev && (
          <BreadcrumbItem>
            <Link className="text-lg" to={prev.path}>
              {prev.title}
            </Link>
          </BreadcrumbItem>
        )}

        {current && (
          <BreadcrumbItem>
            <Link className="text-lg" to={current.path}>
              {current.title}
            </Link>
          </BreadcrumbItem>
        )}
      </Breadcrumbs>

      {showButton && (
        <div
          className="mb-5 transition font-fira-sans-condensed border-b-2 border-cyan-500 hover:border-cyan-700"
        >
          <Link className="text-lg text-center" color="primary" to={button.path}>
            {button.title}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Breadcrumb
