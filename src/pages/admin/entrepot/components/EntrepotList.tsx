import {
  Avatar,
  Button,
  List,
  Typography,
} from '@arco-design/web-react'

import {
  IconPlus,
} from '@arco-design/web-react/icon'

import classNames from 'classnames'

import { useEntrepotInfo } from '../info/hooks'

import PopconfirmDelete from '@/components/PopconfirmDelete'
import { ShowFormType } from '@/constants'

export default (props: {
  entrepotInfoHandle: ReturnType<typeof useEntrepotInfo>
}) => {
  const { entrepotInfoHandle } = props
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
    <>
      <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
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
      {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓库名称"
          ></Input.Search> */}
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
      </List>
    </>
  )
}
