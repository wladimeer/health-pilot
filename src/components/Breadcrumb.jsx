import { Link } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Icon from './Icon'

const Breadcrumb = ({ home, first, second, current, rightButton = null }) => {
  return (
    <div className="flex items-center justify-between my-5 font-fira-sans-condensed md:mt-0">
      <Breadcrumbs data-testid="breadcrumb-content" className="flex gap-2 items-center">
        <BreadcrumbItem data-testid="breadcrumb-item-home" startContent={<Icon icon="hiHome" />}>
          <Link className="text-medium md:text-lg cursor-default">{home.title}</Link>
        </BreadcrumbItem>

        {first && (
          <BreadcrumbItem data-testid="breadcrumb-item-first">
            <Link className="text-medium md:text-lg cursor-default">{first.title}</Link>
          </BreadcrumbItem>
        )}

        {second && (
          <BreadcrumbItem data-testid="breadcrumb-item-second">
            <Link className="text-medium md:text-lg cursor-default">{second.title}</Link>
          </BreadcrumbItem>
        )}

        {current && (
          <BreadcrumbItem data-testid="breadcrumb-item-current">
            <Link className="text-medium md:text-lg cursor-default">{current.title}</Link>
          </BreadcrumbItem>
        )}
      </Breadcrumbs>

      {rightButton && rightButton}
    </div>
  )
}

export default Breadcrumb
