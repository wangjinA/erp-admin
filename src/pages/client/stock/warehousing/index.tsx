import { Button, Modal } from '@arco-design/web-react'

import { useState } from 'react'

import { ModalWidth } from '../products'

import { WarehousingApplyAPI } from '@/api/client/stock'
import FilterForm from '@/components/FilterForm'
import SearchTable from '@/components/SearchTable'

// 入库管理
export default () => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="bg-white p-4">
      <SearchTable
        name="入库申请"
        getListRequest={WarehousingApplyAPI.getList}
        leftTool={() => (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true)
              }}
              status="warning"
            >
              入库申请
            </Button>
          </div>
        )}
        formItemConfigList={[
          {
            schema: {
              label: '入库编码',
              field: 'warehousingCode',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发往仓库',
              field: 'warehouse',
            },
          },
          {
            schema: {
              label: '商品信息',
              field: 'goodsInfo',
            },
          },
          {
            schema: {
              label: '商品名称',
              field: 'goodsInfo',
            },
            isSearch: true,
            hideTable: true,
          },

          {
            schema: {
              label: '快递单号',
              field: 'expressNumber',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发货/收货数量',
              field: 'quantity',
            },
          },
          {
            schema: {
              label: '上架服务费',
              field: 'shelfServiceCharge',
            },
          },
          {
            schema: {
              label: '状态',
              field: 'status',
            },
            isSearch: true,
            control: 'dictSelector',
            controlProps: {
              dictCode: 'storage_status',
            },
          },
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render() {
              return (
                <div>
                  <Button
                    type="primary"
                    size="small"
                    status="warning"
                    onClick={() => {
                    }}
                  >
                    操作记录
                  </Button>
                </div>
              )
            },
          },
        ]}
      >

      </SearchTable>
      <Modal
        style={{
          width: ModalWidth,
        }}
        visible={visible}
        title="入库申请"
        onCancel={() => setVisible(false)}
        onOk={() => {
        }}
      >
        <FilterForm
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '送往仓库',
                field: 'warehouse',
              },
              control: 'entrepotSelector',
            },
            {
              schema: {
                label: '快递单号',
                field: 'expressNumber',
              },
            },
            {
              schema: {
                label: '选择商品',
                field: 'goodsInfo',
              },
            },
          ]}
        >

        </FilterForm>
      </Modal>
    </div>
  )
}
