import { useAuth } from '../../contexts/Auth'
import Container from '../../components/Container'
import { generateCardStructure } from '../../services/components'
import { Card, CardBody, CardHeader, Chip, Divider, Spinner } from '@nextui-org/react'
import { DASHBOARD_PAGE_KEY } from '../../constants/pages'
import ProgressCard from '../../components/ProgressCard'
import Indication from '../../components/Indication'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const Dashboard = ({ socket, isConnected }) => {
  const [translate] = useTranslation(DASHBOARD_PAGE_KEY)

  const [isLoading, setIsLoading] = useState(true)
  const [mainCard, setMainCard] = useState([])
  const [isSuscribed, setIsSuscribed] = useState(false)

  const {
    userData: { sessionId }
  } = useAuth()

  const handleConnection = () => {
    socket.emit('fonasa:subscribe', { sessionId })
    setIsSuscribed(true)
  }

  const handleFonasaAll = (socketData) => {
    const generatedCard = generateCardStructure({
      data: socketData,
      translation: translate
    })

    setMainCard(generatedCard.data)
    setIsLoading(false)
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
    <Container pageKey={DASHBOARD_PAGE_KEY}>
      {isLoading ? (
        <Card>
          <CardBody>
            <Spinner color="black" />
          </CardBody>
        </Card>
      ) : mainCard.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {mainCard.map((item, index) => (
            <Card key={`${mainCard.key}-${index}`} className="flex flex-wrap flex-auto">
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
        <Indication message={translate('page.noData')} />
      )}
    </Container>
  )
}

export default Dashboard
