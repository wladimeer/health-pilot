import { useTranslation } from 'react-i18next'
import DataTable from '../../components/DataTable'
import { ACTIONS_KEY } from '../../constants/design'
import { PROVIDER_LIST_PAGE_KEY } from '../../constants/pages'
import { findProvidersByHoldingId } from '../../services/intermediary'
import { SUCCESS_STATUS, UNAUTHORIZED_STATUS } from '../../constants/states'
import { ERROR_STATUS, EXCEPTION_STATUS } from '../../constants/states'
import { generateTableStructure } from '../../services/components'
import { DASHBOARD_PAGE_PATH } from '../../constants/paths'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { useParams, useNavigate } from 'react-router-dom'
import { getConfig } from '../../services/platform'
import Container from '../../components/Container'
import { useAuth } from '../../contexts/Auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ProviderList = () => {
  const navigate = useNavigate()
  const { holdingId } = useParams()
  const { updateUserData } = useAuth()

  const [translation] = useTranslation(PROVIDER_LIST_PAGE_KEY)

  const [isLoading, setIsLoading] = useState(true)
  const [mainTable, setMainTable] = useState({})

  const { breadcrumb } = getConfig(PROVIDER_LIST_PAGE_KEY)

  const actionsFunctions = {
    modify: (providerId) => {
      navigate(`/admin/holding-list/provider-list/${holdingId}/provider-modify/${providerId}`)
    }
  }

  const handleCloseSesion = () => {
    updateUserData()
    navigate(DASHBOARD_PAGE_PATH)
  }

  useEffect(() => {
    const loadProvidersData = async () => {
      const { data, status } = await findProvidersByHoldingId(holdingId)

      if (status === SUCCESS_STATUS) {
        const existActions = Object.keys(data).includes(ACTIONS_KEY)

        const schema = {
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

      if (status === EXCEPTION_STATUS) {
        toast(translation('load.responses.text.exception'), { type: 'error' })
      }

      if (status === ERROR_STATUS) {
        toast(translation('load.responses.text.error'), { type: 'warning' })
      }

      if (status === UNAUTHORIZED_STATUS) {
        toast(translation('load.responses.text.unauthorized'), {
          type: 'info',
          onClose: handleCloseSesion
        })
      }
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
