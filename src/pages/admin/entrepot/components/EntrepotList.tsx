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
