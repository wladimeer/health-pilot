import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { getConfig } from '../../services/platform'
import { camelCaseKeys } from '../../services/components'
import { PROVIDER_MODIFY_PAGE_KEY } from '../../constants/pages'
import { Tabs, Tab, Select, SelectItem, Input } from '@nextui-org/react'
import { generateTableStructure } from '../../services/components'
import { PROVIDER_LIST_PAGE_KEY } from '../../constants/pages'
import { findProviderById } from '../../services/intermediary'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import DataTable from '../../components/DataTable'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ProviderModify = () => {
  const { providerId } = useParams()

  const [translation] = useTranslation(PROVIDER_MODIFY_PAGE_KEY)

  const [mainTabs, setMainTabs] = useState({})
  const [loading, setLoading] = useState(true)

  const { breadcrumb } = getConfig(PROVIDER_MODIFY_PAGE_KEY)

  const getTableStructure = (data) => {
    const schema = {
      pageKey: PROVIDER_LIST_PAGE_KEY,
      tableKeys: data.keys,
      tableValues: data.values,
      translation: translation
    }

    return generateTableStructure(schema)
  }

  useEffect(() => {
    const loadProviderData = async () => {
      const { data } = await findProviderById(providerId)
      const [newData] = [await data].map((item) => camelCaseKeys(item))

      const tabs = {
        provider: {
          countryId: newData.countryId,
          countryName: newData.countryName,
          holdingIdentification: newData.holdingIdentification,
          holdingName: newData.holdingName,
          personId: newData.personId,
          providerCreatedDate: newData.providerCreatedDate,
          providerId: newData.providerId,
          providerIdentification: newData.providerIdentification,
          providerName: newData.providerName,
          providerSubdomain: newData.providerSubdomain,
          providerUpdatedDate: newData.providerUpdatedDate
        },
        branchOffices: getTableStructure(newData.branchOffices),
        attentionPlaces: getTableStructure(newData.attentionPlaces),
        attentionPoints: getTableStructure(newData.attentionPoints),
        users: getTableStructure(newData.users)
      }

      setMainTabs(tabs)
      setLoading(false)
    }

    loadProviderData()
  }, [])

  return (
    <Container title={translation('title')} breadcrumb={breadcrumb}>
      {loading ? (
        <Card>
          <CardBody>
            <Spinner color="black" />
          </CardBody>
        </Card>
      ) : (
        <Tabs variant="bordered" aria-label="Tabs">
          <Tab key="provider" title={translation('tabs.provider')}>
            <Card radius="sm">
              <CardBody className="flex-col flex-wrap gap-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <Select
                    isDisabled
                    variant="bordered"
                    label={translation('select.holding')}
                    defaultSelectedKeys={['holdingName']}
                    className="shrink"
                    radius="sm"
                    size="md"
                  >
                    <SelectItem key="holdingName" value={mainTabs.provider.holdingName}>
                      {mainTabs.provider.holdingName}
                    </SelectItem>
                  </Select>

                  <Input
                    isReadOnly
                    variant="bordered"
                    label={translation('inputs.identification')}
                    defaultValue={mainTabs.provider.providerIdentification}
                    className="shrink"
                    type="text"
                    radius="sm"
                    size="md"
                  />
                </div>

                <Input
                  // isClearable
                  variant="bordered"
                  label={translation('inputs.name')}
                  defaultValue={mainTabs.provider.providerName}
                  className="w-auto"
                  type="text"
                  radius="sm"
                  size="md"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <Input
                    isReadOnly
                    variant="bordered"
                    label={translation('inputs.country')}
                    defaultValue={mainTabs.provider.countryName}
                    className="w-auto"
                    type="text"
                    radius="sm"
                    size="md"
                  />

                  <Input
                    variant="bordered"
                    label={translation('inputs.subdomain')}
                    defaultValue={mainTabs.provider.providerSubdomain}
                    className="w-auto"
                    type="text"
                    radius="sm"
                    size="md"
                  />
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab title={translation('tabs.branchOffices')} key="branchOffices">
            {mainTabs.branchOffices && <DataTable {...mainTabs.branchOffices} />}
          </Tab>

          <Tab title={translation('tabs.attentionPlaces')} key="attentionPlaces">
            {mainTabs.attentionPlaces && <DataTable {...mainTabs.attentionPlaces} />}
          </Tab>

          <Tab title={translation('tabs.attentionPoints')} key="attentionPoints">
            {mainTabs.attentionPoints && <DataTable {...mainTabs.attentionPoints} />}
          </Tab>

          <Tab title={translation('tabs.users')} key="users">
            {mainTabs.users && <DataTable {...mainTabs.users} />}
          </Tab>
        </Tabs>
      )}
    </Container>
  )
}

export default ProviderModify