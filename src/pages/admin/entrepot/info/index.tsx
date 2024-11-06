import {
  Avatar,
  Button,
  Grid,
  List,
  Modal,
  Space,
  Typography,
} from '@arco-design/web-react'
import { IconCheck, IconDelete, IconPlus } from '@arco-design/web-react/icon'
import classNames from 'classnames'

import EntrepotList from '../components/EntrepotList'

import { useEntrepotInfo } from './hooks'
import { CreateEntrepotSchema, CreateRacksSchema } from './schema'

import FilterForm from '@/components/FilterForm'
import PopconfirmDelete from '@/components/PopconfirmDelete'
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants'

const createInitialValue = {
  entrepotName: '测试111',
  entrepotType: 0,
  storeType: [0],
  consignee: '老吴头',
  phone: '15270848188',
  deliveryAddress: '省市区',
  detailedAddress: '详细地址哈哈哈',
  openUser: 1,
  inventoryStatus: 1,
  qrCode:
    'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2206469993218/O1CN01GgZIv21ZdtGVU5hF1_!!0-item_pic.jpg_.webp',
}

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
    setShowTypeRacks,
    showTypeEntrepot,
    setShowTypeEntrepot,
    formEntrepotRef,
    formRacksRef,
    activeEntrepot,
    setActiveEntrepot,
    racksList,
    rackLoading,
    getRacksList,
    createEntrepotHandler,
    createEntrepotLoading,
    getEntrepotList,
    entrepotList,
    entrepotLoading,
    activeRacks,
    setActiveRacks,
    createRacksLoading,
    createRacksHandler,
    removeRacks,
    removeRacksLoading,
    updateRacks,
    updateRacksLoading,
    updateEntrepot,
    updateEntrepotLoading,
    removeEntrepot,
    removeEntrepotLoading,
  } = entrepotInfoHandle

  return (
    <div className="bg-white p-4 pb-6">
      <Grid.Row gutter={[20, 0]}>
        <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
          <EntrepotList entrepotInfoHandle={entrepotInfoHandle}></EntrepotList>
          {/* <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
            <Typography.Title heading={6} className="mb-0">
              仓库列表
            </Typography.Title>
            <Button
              icon={<IconPlus></IconPlus>}
              type="primary"
              size="small"
              className="ml-auto"
              onClick={() => {
                setShowTypeEntrepot(ShowFormType.create)
              }}
            >
              新增
            </Button>
          </Typography.Paragraph>
          <List>
            {entrepotList?.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveEntrepot(item)
                }}
              >
                <List.Item.Meta
                  style={{ height: 76 }}
                  className={classNames(
                    activeEntrepot?.id === item.id
                      ? 'bg-gray-100 dark:bg-zinc-500'
                      : '',
                    'hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3',
                  )}
                  avatar={<Avatar>{item.consignee[0]}</Avatar>}
                  title={item.entrepotName}
                  description={item.detailedAddress}
                >
                </List.Item.Meta>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setShowTypeEntrepot(ShowFormType.edit)
                      formEntrepotRef.setFieldsValue(item)
                    }}
                  >
                    编辑
                  </Button>
                  <PopconfirmDelete
                    onOk={() => {
                      removeEntrepot(item.id)
                    }}
                    buttonProps={{
                      loading: removeEntrepotLoading,
                    }}
                  >
                  </PopconfirmDelete>
                </div>
              </div>
            ))}
          </List> */}
        </Grid.Col>

        {showTypeRacks === ShowFormType.create && !racksList?.length ? null : (
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
            <List size="small">
              {racksList?.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveRacks(item)
                    formRacksRef.setFieldsValue(item)
                  }}
                >
                  <List.Item.Meta
                    style={{ height: 76 }}
                    className={classNames(
                      activeRacks?.id === item.id
                        ? 'bg-gray-100 dark:bg-zinc-500'
                        : '',
                      'hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3',
                    )}
                    avatar={<Avatar>{item.locationPrefix}</Avatar>}
                    title={item.storageRacksName}
                    description={item.storageRacksCode}
                  >
                  </List.Item.Meta>
                </div>
              ))}
            </List>
          </Grid.Col>
        )}
        {showTypeRacks && (
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
                      await updateRacks({
                        ...formData,
                        id: activeRacks.id,
                      })
                    }}
                  >
                    保存
                  </Button>
                  <PopconfirmDelete
                    buttonProps={{ loading: removeRacksLoading }}
                    onOk={() => {
                      removeRacks(activeRacks.id)
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
      <Modal
        {...FormModalCommonProps}
        confirmLoading={createEntrepotLoading || updateEntrepotLoading}
        onCancel={() => {
          setShowTypeEntrepot(null)
          formEntrepotRef.resetFields()
        }}
        onOk={async () => {
          const formData = await formEntrepotRef.validate()
          if (showTypeEntrepot === ShowFormType.create) {
            await createEntrepotHandler(formData)
          }
          else {
            await updateEntrepot({
              ...formData,
              id: activeEntrepot.id,
            })
          }
          setShowTypeEntrepot(null)
        }}
        visible={!!showTypeEntrepot}
        title={`${ShowFormTypeMap[showTypeEntrepot]}仓库`}
      >
        <FilterForm
          initialValues={createInitialValue}
          form={formEntrepotRef}
          labelLength={8}
          span={24}
          formItemConfigList={CreateEntrepotSchema}
        >
        </FilterForm>
      </Modal>
    </div>
  )
}
