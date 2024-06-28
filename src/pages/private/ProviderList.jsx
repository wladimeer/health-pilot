import { useTranslation } from 'react-i18next'
import DataTable from '../../components/DataTable'
import { isArray } from '../../services/components'
import { camelCaseKeys } from '../../services/components'
import { PROVIDER_LIST_PAGE_KEY } from '../../constants/pages'
import { Tabs, Tab, Select, SelectItem, Input } from '@nextui-org/react'
import { findProvidersByHoldingId, findProviderById } from '../../services/intermediary'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { generateTableStructure } from '../../services/components'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { ACTIONS_KEY } from '../../constants/design'
import { getConfig } from '../../services/platform'
import Container from '../../components/Container'
import { useDisclosure } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProviderList = () => {
  const { holdingId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [translate] = useTranslation(PROVIDER_LIST_PAGE_KEY)
  const [disabledTabsKeys, setDisabledTabsKeys] = useState([])
  const [modalData, setModalData] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [insideTable, setInsideTable] = useState({})
  const [mainTable, setMainTable] = useState({})

  const { breadcrumb } = getConfig(PROVIDER_LIST_PAGE_KEY)

  const keysToShow = {
    branchOffices: ['branchOfficeId', 'branchOfficeIdentification', 'branchOfficeName', 'state'],
    attentionPlaces: ['attentionPlaceId', 'attentionPlaceName', 'branchOfficeName', 'urgency'],
    attentionPoints: [
      'attentionPointId',
      'attentionPointName',
      'attentionPlaceName',
      'branchOfficeName',
      'code',
      'state'
    ],
    users: ['username', 'fullName', 'gender', 'state', 'birthdate']
  }

  const actionsFunctions = {
    modify: async (providerId) => {
      let { data } = await findProviderById(providerId)
      let disabledDataKeys = []

      data = [await data].map((item) => camelCaseKeys(item))

      data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (isArray(value) && value.length === 0) {
            disabledDataKeys.push(key)
          }
        })
      })

      setDisabledTabsKeys(disabledDataKeys)
      setModalData(data[0])
      onOpen()
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
        translation: translate
      }

      if (existActions) schema['actionsKeys'] = data.actions

      const generatedTable = generateTableStructure(schema)

      setMainTable(generatedTable)
      setIsLoading(false)
    }

    loadProvidersData()
  }, [])

  const loadInsideTable = (key) => {
    const data = modalData[key]

    if (isArray(data) && data.length > 0) {
      const keys = keysToShow[key]

      const schema = {
        pageKey: PROVIDER_LIST_PAGE_KEY,
        tableKeys: keys,
        tableValues: data,
        translation: translate
      }

      const generatedTable = generateTableStructure(schema)

      setInsideTable(generatedTable)
    }
  }

  return (
    <>
      <Modal
        size="5xl"
        radius='sm'
        placement="top"
        backdrop="blur"
        isDismissable={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{translate('modal.modify')}</ModalHeader>
          <ModalBody>
            <Tabs
              disabledKeys={disabledTabsKeys}
              onSelectionChange={(tabKey) => loadInsideTable(tabKey)}
              aria-label="options"
            >
              <Tab title={translate('modal.tabs.provider')} key="provider">
                <Card radius='sm'>
                  <CardBody className="flex-col flex-wrap gap-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <Select
                        isDisabled
                        variant="bordered"
                        label={translate('select.holding')}
                        defaultSelectedKeys={['holdingName']}
                        className="shrink"
                        radius="sm"
                        size="md"
                      >
                        <SelectItem key="holdingName" value={modalData.holdingName}>
                          {modalData.holdingName}
                        </SelectItem>
                      </Select>

                      <Input
                        isReadOnly
                        variant="bordered"
                        label={translate('inputs.identification')}
                        defaultValue={modalData.providerIdentification}
                        className="shrink"
                        type="text"
                        radius="sm"
                        size="md"
                      />
                    </div>

                    <Input
                      // isClearable
                      variant="bordered"
                      label={translate('inputs.name')}
                      defaultValue={modalData.providerName}
                      className="w-auto"
                      type="text"
                      radius="sm"
                      size="md"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <Input
                        isReadOnly
                        variant="bordered"
                        label={translate('inputs.country')}
                        defaultValue={modalData.countryName}
                        className="w-auto"
                        type="text"
                        radius="sm"
                        size="md"
                      />

                      <Input
                        variant="bordered"
                        label={translate('inputs.subdomain')}
                        defaultValue={modalData.providerSubdomain}
                        className="w-auto"
                        type="text"
                        radius="sm"
                        size="md"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab title={translate('modal.tabs.branchOffices')} key="branchOffices">
                {modalData.branchOffices && <DataTable {...insideTable} />}
              </Tab>

              <Tab title={translate('modal.tabs.attentionPlaces')} key="attentionPlaces">
                {modalData.attentionPlaces && <DataTable {...insideTable} />}
              </Tab>

              <Tab title={translate('modal.tabs.attentionPoints')} key="attentionPoints">
                {modalData.attentionPoints && <DataTable {...insideTable} />}
              </Tab>

              <Tab title={translate('modal.tabs.users')} key="users">
                {modalData.users && <DataTable {...insideTable} />}
              </Tab>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Container title={translate('title')} breadcrumb={breadcrumb}>
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
    </>
  )
}

export default ProviderList
