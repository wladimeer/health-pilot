import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBreadcrumb } from '../services/platform'
import Breadcrumb from './Breadcrumb'
import Icon from './Icon'

const Container = ({ pageKey, children }) => {
  const [translation] = useTranslation(pageKey)
  const breadcrumb = getBreadcrumb(pageKey)

  const { home, prev, current } = breadcrumb

  return (
    <div className="flex-1 p-2 transition duration-300">
      <Breadcrumb {...breadcrumb} />

      <div className="p-5 ring-2 ring-blue-500/50 rounded font-fira-sans-condensed">
        <section className="flex items-center justify-between mb-3">
          <h1 className="underline underline-offset-4 text-lg">{translation('title')}</h1>

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
