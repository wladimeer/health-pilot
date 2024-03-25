import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DataTable from '../../components/DataTable'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { HOLDING_LIST_PAGE_KEY } from '../../constants/pages'
import { generateTableStructure } from '../../services/components'
import { getAllHoldings } from '../../services/intermediary'
import { ACTIONS_KEY } from '../../constants/design'
import Container from '../../components/Container'
import { useNavigate } from 'react-router-dom'

const HoldingList = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [translate] = useTranslation(HOLDING_LIST_PAGE_KEY)
  const [mainTable, setMainTable] = useState({})

  const actionsFunctions = {
    viewList: (holdingId) => {
      navigate(`/admin/holding-list/provider-list/${holdingId}`)
    },
    modify: (holdingId) => {
      console.log(`modify-holdingId: ${holdingId}`)
    }
  }

  useEffect(() => {
    const loadHoldingsData = async () => {
      const { data } = await getAllHoldings()
      const existActions = Object.keys(data).includes(ACTIONS_KEY)

      let schema = {
        pageKey: HOLDING_LIST_PAGE_KEY,
        tableKeys: data.keys,
        tableValues: data.values,
        actionsFunctions: actionsFunctions,
        translation: translate
      }

      if (existActions) schema['actionsKeys'] = data.actions

      const generatedTable = generateTableStructure(schema)

      setMainTable(generatedTable)
      setIsLoading(false)
    }

    loadHoldingsData()
  }, [])

  return (
    <Container pageKey={HOLDING_LIST_PAGE_KEY}>
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

export default HoldingList
