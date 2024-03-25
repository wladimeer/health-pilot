import { Link } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import Icon from './Icon'

const Breadcrumb = ({ home, prev, current }) => {
  return (
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
  )
}

export default Breadcrumb
