import Icon from '../../components/Icon'
import Container from '../../components/Container'
import { ADMIN_PAGE_KEY } from '../../constants/pages'
import { getMenu } from '../../services/platform'
import { Link } from 'react-router-dom'

const Admin = () => {
  const { submenus } = getMenu(ADMIN_PAGE_KEY)

  return (
    <Container pageKey={ADMIN_PAGE_KEY}>
      <section className="grid grid-cols-3 gap-5 select-none">
        {submenus.map(({ key, path, title, icon, description, redirect }) => (
          <div
            className="rounded-md overflow-hidden p-3 group/card transition duration-300 bg-sky-100 hover:bg-sky-200"
            key={key}
          >
            <div className="flex justify-between items-center font-bold text-xl">
              <span>{title}</span>
              <Icon icon={icon} size={8} />
            </div>

            <p className="my-5">{description}</p>

            <div className="flex justify-end">
              <Link className="text-md" to={path}>
                <span className="transition ease-linear duration-300 border-b-2 border-transparent group-hover/card:border-black">
                  {redirect}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Container>
  )
}

export default Admin
