import { useAuth } from '../../contexts/Auth'
import Container from '../../components/Container'
import { getConfig } from '../../services/platform'
import { Button, useDisclosure } from '@nextui-org/react'
import { generateCardStructure } from '../../services/components'
import { Card, CardBody, CardHeader, Chip, Divider, Spinner } from '@nextui-org/react'
import { DASHBOARD_PAGE_KEY } from '../../constants/pages'
import ProgressCard from '../../components/ProgressCard'
import Indication from '../../components/Indication'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Login from '../../modals/Login'

const Dashboard = ({ socket, isConnected }) => {
  const [translation] = useTranslation(DASHBOARD_PAGE_KEY)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isUserValid } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isSuscribed, setIsSuscribed] = useState(false)
  const [mainCard, setMainCard] = useState([])

  const { breadcrumb } = getConfig(DASHBOARD_PAGE_KEY)

  const {
    userData: { sessionId }
  } = useAuth()

  const handleConnection = () => {
    if (!isSuscribed) {
      socket.emit('fonasa:subscribe', { sessionId })
      setIsSuscribed(true)
    }
  }

  const handleFonasaAll = (socketData) => {
    const generatedCard = generateCardStructure({
      data: socketData,
      translation: translation
    })

    setMainCard(generatedCard.data)
    setIsLoading(false)
  }

  const BreadcrumbButton = () => {
    return (
      !isUserValid && (
        <Button variant="ghost" color="primary" onClick={onOpen}>
          {translation('breadcrumb.button.login')}
        </Button>
      )
    )
  }

  useEffect(() => {
    if (isConnected) handleConnection()

    socket.on('fonasa:all', handleFonasaAll)

    return () => {
      socket.off('fonasa:all', handleFonasaAll)

      if (isSuscribed) {
        socket.emit('fonasa:unsubscribe', { sessionId })
      }
    }
  }, [socket, isConnected, isSuscribed])

  return (
    <Container
      title={translation('title')}
      breadcrumb={breadcrumb}
      breadcrumbButton={<BreadcrumbButton />}
    >
      <Login isOpen={isOpen} onOpenChange={onOpenChange} />

      {isLoading ? (
        <Card radius="sm">
          <CardBody>
            <Spinner color="black" />
          </CardBody>
        </Card>
      ) : mainCard.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {mainCard.map((item, index) => (
            <Card key={`${mainCard.key}-${index}`} className="flex flex-wrap flex-auto" radius="sm">
              <CardHeader className="flex flex-wrap gap-3">
                <Chip variant="flat" size="md" color="primary">
                  {item.serviceType.value}
                </Chip>

                <Chip variant="flat" size="md" color="primary">
                  {item.serviceName.value}
                </Chip>
              </CardHeader>

              <CardHeader className="pt-0">
                <Chip variant="flat" size="md" color={item.color.value}>
                  {item.serviceState.value}
                </Chip>
              </CardHeader>

              <Divider />

              <CardBody>
                <ProgressCard
                  title={item.responseTime.title}
                  value={item.responseTime.value}
                  isTime
                />
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Indication message={translation('page.noData')} />
      )}
    </Container>
  )
}

export default Dashboard
