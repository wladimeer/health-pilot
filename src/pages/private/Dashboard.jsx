import Container from '../../components/Container'
import { generateCardStructure } from '../../services/components'
import { Card, CardBody, CardHeader, Chip, Divider, Spinner } from '@nextui-org/react'
import { DASHBOARD_PAGE_KEY } from '../../constants/pages'
import ProgressCard from '../../components/ProgressCard'
import Indication from '../../components/Indication'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const Dashboard = ({ services }) => {
  const [translate] = useTranslation(DASHBOARD_PAGE_KEY)

  const [isLoading, setIsLoading] = useState(true)
  const [mainCard, setMainCard] = useState([])

  useEffect(() => {
    const generatedCard = generateCardStructure({
      data: services.fonasa,
      translation: translate
    })

    setMainCard(generatedCard.data)
    setIsLoading(false)
  }, [services])

  return (
    <Container pageKey={DASHBOARD_PAGE_KEY}>
      {isLoading ? (
        <Card>
          <CardBody>
            <Spinner color="black" />
          </CardBody>
        </Card>
      ) : services.fonasa.length == 0 ? (
        <div className="flex flex-wrap gap-3">
          {mainCard.map((item, index) => (
            <Card key={`${mainCard.key}-${index}`}>
              <CardHeader className="flex gap-3 flex-1">
                <Chip variant="flat" size="md" color="primary">
                  {item.serviceType.value}
                </Chip>

                <Chip variant="flat" size="md" color="primary">
                  {item.serviceName.value}
                </Chip>

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
