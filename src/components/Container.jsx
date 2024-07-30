import Breadcrumb from './Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'

const Container = ({ title, breadcrumb, children, breadcrumbButton = null }) => {
  const { current } = breadcrumb
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex-1 p-2 pt-0 md:pt-2 transition duration-300">
      <Breadcrumb {...breadcrumb} rightButton={breadcrumbButton} />

      <div
        data-testid="container-content"
        className="p-2 md:p-5 ring-2 ring-blue-500/50 rounded font-fira-sans-condensed"
      >
        <section className="flex items-center justify-between mb-3">
          <h1 data-testid="container-title" className="underline underline-offset-4 text-lg">
            {title}
          </h1>

          {current && (
            <Link onClick={handleGoBack}>
              <Icon icon="hiChevronLeft" size={7} />
            </Link>
          )}
        </section>

        {children}
      </div>
    </div>
  )
}

export default Container
