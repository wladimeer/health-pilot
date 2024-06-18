import { Link } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Icon from './Icon'

const Breadcrumb = ({ home, prev, current, rightButton = null }) => {
  return (
    <div className="flex items-center justify-between my-5 font-fira-sans-condensed md:mt-0">
      <Breadcrumbs data-testid="breadcrumb-content" className="flex gap-2 items-center">
        <BreadcrumbItem data-testid="breadcrumb-item-home" startContent={<Icon icon="hiHome" />}>
          <Link className="text-lg" to={home.path}>
            {home.title}
          </Link>
        </BreadcrumbItem>

        {prev && (
          <BreadcrumbItem data-testid="breadcrumb-item-prev">
            <Link className="text-lg" to={prev.path}>
              {prev.title}
            </Link>
          </BreadcrumbItem>
        )}

        {current && (
          <BreadcrumbItem data-testid="breadcrumb-item-current">
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
