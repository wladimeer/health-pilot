import DataTable from '../../components/DataTable'
import { DEVICE_LIST_PAGE_KEY } from '../../constants/pages'
import { generateTableStructure } from '../../services/components'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import Container from '../../components/Container'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const DeviceList = () => {
  const [translate] = useTranslation(DEVICE_LIST_PAGE_KEY)

  const [isLoading, setIsLoading] = useState(true)
  const [mainTable, setMainTable] = useState({})

  useEffect(() => {
    const loadDevicesData = () => {
      const tableKeys = [
        'device_id',
        'terminal_id',
        'device_name',
        'device_state',
        'device_created_date',
        'device_updated_date',
        'modifier_user_id'
      ]

      const tableValues = [
        {
          device_id: 12,
          terminal_id: 45,
          device_name: 'G5F2F2D3F',
          device_state: 0,
          device_created_date: '19-02-2020',
          device_updated_date: '19-02-2021',
          modifier_user_id: 5
        },
        {
          device_id: 6,
          terminal_id: 9,
          device_name: 'D5F5D22CD',
          device_state: 1,
          device_created_date: '06-02-2021',
          device_updated_date: '08-02-2022',
          modifier_user_id: 20
        }
      ]

      let schema = {
        pageKey: DEVICE_LIST_PAGE_KEY,
        tableKeys: tableKeys,
        tableValues: tableValues,
        translation: translate
      }

      const generatedTable = generateTableStructure(schema)

      setMainTable(generatedTable)
      setIsLoading(false)
    }

    loadDevicesData()
  }, [])

  return (
    <Container pageKey={DEVICE_LIST_PAGE_KEY}>
      {isLoading ? (
        <Card>
          <CardBody>
            <Spinner color="black" />
          </CardBody>
        </Card>
      ) : (
        <DataTable {...mainTable} />
      )}
    </Container>
  )
}

export default DeviceList
