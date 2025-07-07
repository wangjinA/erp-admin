import {
  Button,
  Empty,
  Grid,
  Space,
  Typography,
} from '@arco-design/web-react'
import { IconCheck, IconDelete, IconPlus } from '@arco-design/web-react/icon'

import EntrepotList from '../components/EntrepotList'

import { useEntrepotInfo } from './hooks'
import { CreateRacksSchema } from './schema'

import FilterForm from '@/components/FilterForm'
import List from '@/components/List'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import {
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants'
import { showModal } from '@/utils'

const createRacksInitialValue = {
  storageRacksName: '',
  available: '',
  entrepotName: '',
  locationPrefix: '',
  numberFloors: '5',
  numberColumns: '5',
}

export default () => {
  const entrepotInfoHandle = useEntrepotInfo({})
  const {
    showTypeRacks,
    formRacksRef,
    activeEntrepot,
    entrepotLoading,
    racksList,
    rackLoading,
    activeRacks,
    setActiveRacks,
    createRacksLoading,
    createRacksHandler,
    removeRacksHandler,
    removeRacksLoading,
    updateRacksHandler,
  } = entrepotInfoHandle

  return (
    <div className="bg-white p-4 pb-6 main-content-box overflow-hidden">
      <Grid.Row gutter={[20, 0]} className="h-full">
        <Grid.Col span={6} className="border-r border-neutral-3 pr-4 h-full overflow-y-auto">
          <EntrepotList entrepotInfoHandle={entrepotInfoHandle}></EntrepotList>
        </Grid.Col>

        {(showTypeRacks === ShowFormType.create && !racksList?.length)
          ? null
          : (
            <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
              <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                <Typography.Title heading={6} className="mb-0">
                  货架列表
                </Typography.Title>
                <Button
                  icon={<IconPlus></IconPlus>}
                  type="primary"
                  size="small"
                  className="ml-auto"
                  disabled={showTypeRacks === ShowFormType.create}
                  onClick={() => {
                    formRacksRef.resetFields()
                    setActiveRacks(null)
                  }}
                >
                  新增
                </Button>
              </Typography.Paragraph>
              {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓位名称"
          ></Input.Search> */}
              <List
                loading={rackLoading}
                active={activeRacks?.id}
                onActive={(item) => {
                  setActiveRacks(item as any)
                  formRacksRef.setFieldsValue(item)
                }}
                data={
                  racksList?.map(item => ({
                    ...item,
                    name: item.storageRacksName,
                    description: item.storageRacksCode,
                    avatar: item.locationPrefix,
                  }))
                }

                // onUpdate={(item) => {
                //   setShowTypeEntrepot(ShowFormType.edit)
                //   formEntrepotRef.setFieldsValue(item)
                // }}
                onDelete={async (item) => {
                  await showModal({
                    title: '删除货架',
                    content: `是否删除货架：${item.storageRacksName}`,
                    okText: '删除',
                  })
                  removeRacksHandler(item.id)
                }}
              >
              </List>
            </Grid.Col>
          )}
        {activeEntrepot && showTypeRacks && (
          <Grid.Col span={12} className="pr-6">
            <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
              <Typography.Title heading={6} className="mb-0">
                {ShowFormTypeMap[showTypeRacks]}
                货架
              </Typography.Title>
              {showTypeRacks === ShowFormType.create && (
                <Space className="ml-auto" size="large">
                  <Button
                    icon={<IconPlus></IconPlus>}
                    type="primary"
                    status="success"
                    size="small"
                    loading={createRacksLoading}
                    onClick={async () => {
                      const formData = await formRacksRef.validate()
                      createRacksHandler(formData)
                      setActiveRacks(null)
                    }}
                  >
                    新增
                  </Button>
                  <Button
                    icon={<IconDelete></IconDelete>}
                    loading={createRacksLoading}
                    size="small"
                    onClick={() => {
                      formRacksRef.setFieldsValue(activeEntrepot)
                    }}
                  >
                    取消
                  </Button>
                </Space>
              )}
              {showTypeRacks === ShowFormType.edit && (
                <Space className="ml-auto" size="large">
                  <Button
                    icon={<IconCheck></IconCheck>}
                    type="primary"
                    size="small"
                    loading={createRacksLoading}
                    onClick={async () => {
                      const formData = await formRacksRef.validate()
                      updateRacksHandler({
                        ...formData,
                        id: activeRacks.id,
                        entrepotId: activeEntrepot.id,
                      })
                    }}
                  >
                    保存
                  </Button>
                  <PopconfirmDelete
                    buttonProps={{ loading: removeRacksLoading }}
                    onOk={() => {
                      removeRacksHandler(activeRacks.id)
                    }}
                  >
                  </PopconfirmDelete>
                </Space>
              )}
            </Typography.Paragraph>
            <FilterForm
              form={formRacksRef}
              labelLength={10}
              formItemConfigList={CreateRacksSchema}
            >
            </FilterForm>
          </Grid.Col>
        )}
      </Grid.Row>
      {
        (!entrepotLoading && activeEntrepot) ? null : <Empty></Empty>
      }
    </div>
  )
}
