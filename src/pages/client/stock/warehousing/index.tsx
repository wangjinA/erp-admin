import { Button, Form, Modal } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useState } from 'react'

import ProductInfo from '../components/ProductInfo'

import { WarehousingApplyAPI } from '@/api/client/stock'
import FilterForm from '@/components/FilterForm'
import SearchTable from '@/components/SearchTable'
import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
import { FormModalCommonProps } from '@/constants'
import { showMessage } from '@/utils'

// 入库管理
export default () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()

    return showMessage(() => WarehousingApplyAPI.insert({
      ...formData,
      expressNo: formData.expressNo?.toString(),
      stockStorageApplyProductList: formData.stockStorageApplyProductList.map(item => ({
        logisticsProductId: item.platformItemId,
        sendProductCount: item.num, // 发货数量
      })),
    })).then(() => {
      setVisible(false)
    })
  }, {
    manual: true,
  })

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
              field: 'storageCode',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发往仓库',
              field: 'sendWarehouse',
            },
            render(c) {
              return <EntrepotNameFC value={c}></EntrepotNameFC>
            },
          },
          {
            schema: {
              label: '商品信息',
              field: 'goodsInfo',
            },
            render(c, row) {
              return <ProductInfo data={row}></ProductInfo>
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
              field: 'expressNo',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '发货/收货数量',
              field: 'sendProductCount',
            },
            render(c, row) {
              return <div>{`${row.sendProductCount || 0}/${row.receiveProductCount || 0}`}</div>
            },
          },
          {
            schema: {
              label: '上架服务费',
              field: 'serviceCharge',
            },
          },
          {
            schema: {
              label: '状态',
              field: 'storageStatus',
            },
            isSearch: true,
            control: 'dictSelector',
            controlProps: {
              dictCode: 'storage_status',
            },
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
        {...FormModalCommonProps}
        visible={visible}
        title="入库申请"
        onCancel={() => setVisible(false)}
        confirmLoading={loading}
        onOk={async () => {
          run()
        }}
      >
        <FilterForm
          form={form}
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '送往仓库',
                field: 'sendWarehouse',
                required: true,
              },
              control: 'entrepotSelector',
            },
            {
              schema: {
                label: '快递单号',
                field: 'expressNo',
              },
              control: 'select',
              controlProps: {
                allowCreate: true,
                mode: 'multiple',
                placeholder: '输入后按回车键',
              },
            },
            {
              schema: {
                label: '选择商品',
                field: 'stockStorageApplyProductList',
                required: true,
              },
              control: 'productSelector',
            },
          ]}
        >

        </FilterForm>
      </Modal>
    </div>
  )
}
