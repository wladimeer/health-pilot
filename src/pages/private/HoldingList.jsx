import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DataTable from '../../components/DataTable'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { HOLDING_LIST_PAGE_KEY } from '../../constants/pages'
import { SUCCESS_STATUS, UNAUTHORIZED_STATUS } from '../../constants/states'
import { ERROR_STATUS, EXCEPTION_STATUS } from '../../constants/states'
import { generateTableStructure } from '../../services/components'
import { getAllHoldings } from '../../services/intermediary'
import { DASHBOARD_PAGE_PATH } from '../../constants/paths'
import { ACTIONS_KEY } from '../../constants/design'
import { getConfig } from '../../services/platform'
import Container from '../../components/Container'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { toast } from 'react-toastify'

const HoldingList = () => {
  const navigate = useNavigate()
  const { updateUserData } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [translation] = useTranslation(HOLDING_LIST_PAGE_KEY)
  const [mainTable, setMainTable] = useState({})

  const { breadcrumb } = getConfig(HOLDING_LIST_PAGE_KEY)

  const actionsFunctions = {
    viewList: (holdingId) => {
      navigate(`/admin/holding-list/provider-list/${holdingId}`)
    },
    modify: (holdingId) => {
      console.log(`modify-holdingId: ${holdingId}`)
    }
  }

  const handleCloseSesion = () => {
    updateUserData()
    navigate(DASHBOARD_PAGE_PATH)
  }

  useEffect(() => {
    const loadHoldingsData = async () => {
      const { data, status } = await getAllHoldings()

      if (status === SUCCESS_STATUS) {
        const existActions = Object.keys(data).includes(ACTIONS_KEY)

        let schema = {
          pageKey: HOLDING_LIST_PAGE_KEY,
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

    loadHoldingsData()
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

export default HoldingList
