// 仓库列表

import { Button, Image } from '@arco-design/web-react'

import { useRequest } from 'ahooks'

import { useRef } from 'react'

import { entrepotAPI } from '@/api/admin/entrepot'
import LabelValue from '@/components/LabelValue'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { DictNameFC } from '@/components/Selectors/DictSelector'
import StatusTag from '@/components/StatusTag'
import { showMessage } from '@/utils'

export default () => {
  const ref = useRef<SearchTableRef>()
  const setDefaultHandler = useRequest((id) => {
    return showMessage((() => entrepotAPI.setDefualt(id))).then(() => ref.current.refreshSearchTable())
  }, {
    manual: true,
  })
  return (
    <SearchTable
      ref={ref}
      name="仓库列表"
      className="bg-white p-4"
      getListRequest={(p) => entrepotAPI.getList(p).then(r=> r.data)}
      formItemConfigList={[
        {
          schema: {
            label: '仓库名称',
            field: 'entrepotName',
          },
          isSearch: true,
          render(c, row) {
            return (
              <div>
                <div>{c}</div>
                {row.defaultFlag
                  ? (
                      <StatusTag
                        tagInfos={[
                          {
                            text: '默认仓库',
                            value: 1,
                            color: 'red',
                          },
                        ]}
                        value={1}
                      >
                      </StatusTag>
                    )
                  : ''}
              </div>
            )
          },
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
            if (row.defaultFlag) {
              return '-'
            }
            return (
              <Button
                loading={setDefaultHandler.loading}
                type="text"
                size="small"
                onClick={() => {
                  setDefaultHandler.run(row.id)
                }}
              >
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
