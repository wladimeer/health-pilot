import { useTranslation } from 'react-i18next'
import DataTable from '../../components/DataTable'
import { ACTIONS_KEY } from '../../constants/design'
import { PROVIDER_LIST_PAGE_KEY } from '../../constants/pages'
import { findProvidersByHoldingId } from '../../services/intermediary'
import { generateTableStructure } from '../../services/components'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { useParams, useNavigate } from 'react-router-dom'
import { getConfig } from '../../services/platform'
import Container from '../../components/Container'
import { useEffect, useState } from 'react'

const ProviderList = () => {
  const navigate = useNavigate()
  const { holdingId } = useParams()

  const [translation] = useTranslation(PROVIDER_LIST_PAGE_KEY)

  const [isLoading, setIsLoading] = useState(true)
  const [mainTable, setMainTable] = useState({})

  const { breadcrumb } = getConfig(PROVIDER_LIST_PAGE_KEY)

  const actionsFunctions = {
    modify: (providerId) => {
      navigate(`/admin/holding-list/provider-list/${holdingId}/provider-modify/${providerId}`)
    }
  }

  useEffect(() => {
    const loadProvidersData = async () => {
      const { data } = await findProvidersByHoldingId(holdingId)
      const existActions = Object.keys(data).includes(ACTIONS_KEY)

      let schema = {
        pageKey: PROVIDER_LIST_PAGE_KEY,
        tableKeys: data.keys,
        tableValues: data.values,
        actionsFunctions: actionsFunctions,
        translation: translation
      }

      if (existActions) schema['actionsKeys'] = data.actions

      const generatedTable = generateTableStructure(schema)

      setMainTable(generatedTable)
      setIsLoading(false)
    }

    loadProvidersData()
  }, [])

  return (
    <Container title={translation('title')} breadcrumb={breadcrumb}>
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

export default ProviderList
