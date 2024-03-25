import Container from '../../components/Container'
import { generateCardStructure } from '../../services/components'
import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import { DASHBOARD_PAGE_KEY } from '../../constants/pages'
import ProgressCard from '../../components/ProgressCard'

const Dashboard = () => {
  const serviceResponse = [
    {
      service_type: 'fonasa',
      service_name: 'valorization',
      response_time: 5,
      service_state: 0
    },
    {
      service_type: 'fonasa',
      service_name: 'certification',
      response_time: 12,
      service_state: 1
    }
  ]

  const { key, data } = generateCardStructure({
    pageKey: DASHBOARD_PAGE_KEY,
    data: serviceResponse
  })

  return (
    <Container pageKey={DASHBOARD_PAGE_KEY}>
      <div className="grid grid-flow-col auto-cols-max gap-3">
        {data.map((item, index) => (
          <Card key={`${key}-${index}`}>
            <CardHeader className="flex gap-3">
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
                isSecond
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default Dashboard
