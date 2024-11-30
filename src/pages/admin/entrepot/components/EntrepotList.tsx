import {
  Button,
  Typography,
} from '@arco-design/web-react'

import {
  IconPlus,
} from '@arco-design/web-react/icon'

import { useEntrepotInfo } from '../info/hooks'

import { Entrepot } from '@/api/admin/entrepot'
import List from '@/components/List'
import Title from '@/components/Title'
import { ShowFormType } from '@/constants'
import { showModal } from '@/utils'

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
        <Title title="仓库列表" className="w-full">
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
        </Title>
      </Typography.Paragraph>
      {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓库名称"
          ></Input.Search> */}
      {/* <List>
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

      <List<Entrepot>
        loading={entrepotLoading}
        active={activeEntrepot?.id}
        onActive={(item) => {
          setActiveEntrepot(item)
        }}
        data={
          entrepotList?.map(item => ({
            ...item,
            name: item.entrepotName,
            description: item.detailedAddress,
            avatar: item.consignee[0],
          }))
        }
        onUpdate={(item) => {
          setShowTypeEntrepot(ShowFormType.edit)
          formEntrepotRef.setFieldsValue(item)
        }}
        onDelete={async (item) => {
          await showModal({
            title: '删除仓库',
            content: `是否删除仓库：${item.entrepotName}`,
            okText: '删除',
          })
          removeEntrepot(item.id)
        }}
      >
      </List>
    </>
  )
}
