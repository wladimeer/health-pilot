import Breadcrumb from './Breadcrumb'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const Container = ({ title, breadcrumb, children, breadcrumbButton = null }) => {
  const { home, prev, current } = breadcrumb

  return (
    <div className="flex-1 p-2 transition duration-300">
      <Breadcrumb {...breadcrumb} rightButton={breadcrumbButton} />

      <div
        data-testid="container-content"
        className="p-5 ring-2 ring-blue-500/50 rounded font-fira-sans-condensed"
      >
        <section className="flex items-center justify-between mb-3">
          <h1 data-testid="container-title" className="underline underline-offset-4 text-lg">
            {title}
          </h1>

          {current &&
            (prev ? (
              <Link to={prev.path}>
                <Icon icon="hiChevronLeft" size={7} />
              </Link>
            ) : (
              <Link to={home.path}>
                <Icon icon="hiChevronLeft" size={7} />
              </Link>
            ))}
        </section>

        {children}
      </div>
    </div>
  )
}

export default Container
