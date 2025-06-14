import {
  Button,
  Empty,
  Modal,
  Typography,
} from '@arco-design/web-react'

import {
  IconPlus,
} from '@arco-design/web-react/icon'

import { useEntrepotInfo } from '../info/hooks'

import { CreateEntrepotSchema } from '../info/schema'

import { Entrepot } from '@/api/admin/entrepot'
import FilterForm from '@/components/FilterForm'
import List from '@/components/List'
import Title from '@/components/Title'
import { FormModalCommonProps, ShowFormType, ShowFormTypeMap } from '@/constants'
import { showModal } from '@/utils'

export default (props: {
  entrepotInfoHandle: ReturnType<typeof useEntrepotInfo>
}) => {
  const { entrepotInfoHandle } = props
  const {
    setShowTypeEntrepot,
    formEntrepotRef,
    activeEntrepot,
    setActiveEntrepot,
    createEntrepotHandler,
    createEntrepotLoading,
    entrepotList,
    entrepotLoading,
    updateEntrepotHandler,
    updateEntrepotLoading,
    removeEntrepotHandler,
    showTypeEntrepot,
    updateEntrepotData,
    setUpdateEntrepotData,
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

      {
        (!entrepotLoading && !entrepotList?.length) ? <Empty className="mt-10" description="请添加仓库"></Empty> : null
      }

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
          setUpdateEntrepotData(item)
          setShowTypeEntrepot(ShowFormType.edit)
        }}
        onDelete={async (item) => {
          await showModal({
            title: '删除仓库',
            content: `是否删除仓库：${item.entrepotName}`,
            okText: '删除',
          })
          removeEntrepotHandler(item.id)
        }}
      >
      </List>

      <Modal
        {...FormModalCommonProps}
        confirmLoading={createEntrepotLoading || updateEntrepotLoading}
        onCancel={() => {
          setUpdateEntrepotData(null)
          setShowTypeEntrepot(null)
        }}
        onOk={async () => {
          const formData = await formEntrepotRef.validate()
          if (showTypeEntrepot === ShowFormType.create) {
            createEntrepotHandler(formData)
          }
          else {
            updateEntrepotHandler({
              ...formData,
              id: updateEntrepotData.id,
            })
          }
        }}
        unmountOnExit={true}
        visible={!!showTypeEntrepot}
        title={`${ShowFormTypeMap[showTypeEntrepot]}仓库`}
      >
        <FilterForm
          initialValues={{
            storeType: ['1'],
            supportArea: ['TW'],
            inventoryStatus: 1,
            entrepotType: 0,
            openUser: 1,
            ...updateEntrepotData,
          }}
          form={formEntrepotRef}
          labelLength={8}
          span={24}
          formItemConfigList={CreateEntrepotSchema}
        >
        </FilterForm>
      </Modal>
    </>
  )
}
