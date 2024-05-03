import { Link } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Icon from './Icon'

const Breadcrumb = ({ home, prev, current, rightButton = null }) => {
  return (
    <div className="flex items-center justify-between mb-5 font-fira-sans-condensed">
      <Breadcrumbs className="flex gap-2 items-center">
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

      {rightButton && rightButton}
    </div>
  )
}

export default Breadcrumb
