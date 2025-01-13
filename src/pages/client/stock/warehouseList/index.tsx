// 仓库列表

import { Button, Image } from '@arco-design/web-react'

import { entrepotAPI } from '@/api/admin/entrepot'
import LabelValue from '@/components/LabelValue'
import SearchTable from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'

export default () => {
  return (
    <SearchTable
      name="仓库列表"
      className="bg-white p-4"
      getListRequest={entrepotAPI.getList}
      formItemConfigList={[
        {
          schema: {
            label: '仓库名称',
            field: 'entrepotName',
          },
          isSearch: true,
        },
        {
          schema: {
            label: '仓库地址',
            field: 'deliveryAddress',
          },
          render(c, row) {
            return (
              <div className="relative">
                <LabelValue label="收货人" value={row.consignee}></LabelValue>
                <LabelValue label="联系电话" value={row.telephone}></LabelValue>
                <LabelValue label="收货地址" value={row.deliveryAddress + row.detailedAddress}></LabelValue>
                <Image className="absolute right-0 top-0 bottom-0 my-auto size-16" src={row.qrCode}></Image>
              </div>
            )
          },
        },
        {
          schema: {
            label: '仓库类型',
            field: 'entrepotType',
          },
          render: c => <DictNameFC dictCode="entrepot_type" value={String(c)}></DictNameFC>,
        },
        {
          schema: {
            label: '支持店铺类型',
            field: 'storeType',
          },
          render: c => <DictNameFC dictCode="store_type" value={c}></DictNameFC>,
        },
        {
          schema: {
            label: '支持库存',
            field: 'inventoryStatus',
          },
          render: c => c ? '支持' : '不支持',
        },
        {
          schema: {
            label: '创建时间',
            field: 'createTime',
          },
        },
        {
          schema: {
            label: '操作',
            field: 'actions',
          },
          render(c, row) {
            return (
              <Button type="text" size="small">
                设为默认
              </Button>
            )
          },
        },
      ]}
    >

    </SearchTable>
  )
}
