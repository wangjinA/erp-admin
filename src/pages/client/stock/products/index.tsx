// 商品管理
import { Button, Form, Modal, Space } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'

import ProductInfo from '../components/ProductInfo'

import { StockAPI } from '@/api/client/stock'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { showMessage } from '@/utils'

const ModalWidth = 600

export default () => {
  const [syncVisible, setSyncVisible] = useState(false)
  const [addVisible, setAddVisible] = useState(false)
  const [syncAppointVisible, setSyncAppointVisible] = useState(false)
  const ref = useRef<SearchTableRef>()

  const [syncForm] = Form.useForm()
  const [syncAppointForm] = Form.useForm()
  const [addForm] = Form.useForm()

  const syncHandler = useRequest(async () => {
    const formData = await syncForm.validate()
    // ! 待确认
    return showMessage(() => StockAPI.synchronousGoods({
      productUpdateEndTime: formData.date[1],
      productUpdateStartTime: formData.date[0],
      storeId: formData.storeId,
    }), '同步商品').then(() => {
      setSyncVisible(false)
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })

  const syncAppointHandler = useRequest(async () => {
    const formData = await syncAppointForm.validate()
    // ! 待确认
    return showMessage(() => StockAPI.synchronousGoodsInfo({
      platformIds: formData.platformIds,
      storeId: formData.storeId,
    }), '同步指定商品').then(() => {
      setSyncAppointVisible(false)
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })
  const addHandler = useRequest(async () => {
    const formData = await addForm.validate()
    // ! 待确认
    return showMessage(() => StockAPI.addGoodsInfo(formData), '同步商品').then(() => {
      setAddVisible(false)
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })

  return (
    <div
      className="bg-white p-4"

    >
      <SearchTable
        name="商品管理"
        getListRequest={StockAPI.getProductList}
        removeRequest={StockAPI.deleteGoodsInfo}
        ref={ref}
        formItemConfigList={[
        // 商品编码
          {
            schema: {
              label: '商品编码',
              field: 'productCode',
            },
            hideTable: true,
            isSearch: true,
          },
          {
            schema: {
              label: '商品信息',
              field: 'goodsInfo',
            },
            render(c) {
              return <ProductInfo></ProductInfo>
            },
          },
          {
            schema: {
              label: 'SKU',
              field: 'sku',
            },
            isSearch: true,
          },
          {
            schema: {
              label: '商品名称',
              field: 'productName',
            },
            isSearch: true,
            hideTable: true,
          },
          {
            schema: {
              label: '商品ID',
              field: 'platformItemId',
            },
            isSearch: true,
            hideTable: true,
          },
          {
            schema: {
              label: '成本',
              field: 'productCost',
            },
          },
          {
            schema: {
              label: '商品价格',
              field: 'unitPrice',
            },
          },
          {
            schema: {
              label: '备注',
              field: 'remark',
            },
          },
        ]}
        leftTool={() => (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setSyncVisible(true)
              }}
            >
              同步商品
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setSyncAppointVisible(true)
              }}
            >
              同步指定商品
            </Button>
            <Button
              type="primary"
              status="success"
              onClick={() => {
                setAddVisible(true)
              }}
            >
              新增商品
            </Button>
          </Space>
        )}
      >

      </SearchTable>
      <Modal
        style={{
          width: ModalWidth,
        }}
        visible={syncVisible}
        title="同步商品"
        onCancel={() => setSyncVisible(false)}
        onOk={() => {
          syncHandler.run()
        }}
        confirmLoading={syncHandler.loading}
        unmountOnExit={true}
      >
        <FilterForm
          form={syncForm}
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '电商平台',
                field: 'platform',
              },
              control: 'dictSelector',
              controlProps: {
                dictCode: 'platform_type',
              },
            },
            {
              schema: {
                label: '所属店铺',
                field: 'storeId',
                // required: true,
              },
              control: 'shopSelector',
            },
            {
              schema: {
                label: '同步时间段',
                field: 'date',
              },
              control: 'datePickerRange',
            },

          ]}
        >

        </FilterForm>
      </Modal>
      <Modal
        style={{
          width: ModalWidth,
        }}
        visible={syncAppointVisible}
        title="同步指定商品"
        onCancel={() => setSyncAppointVisible(false)}
        onOk={() => {
          syncAppointHandler.run()
        }}
        confirmLoading={syncAppointHandler.loading}
        unmountOnExit={true}
      >
        <FilterForm
          form={syncAppointForm}
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '电商平台',
                field: 'platform',
              },
              control: 'dictSelector',
              controlProps: {
                dictCode: 'platform_type',
              },
            },
            {
              schema: {
                label: '所属店铺',
                field: 'storeId',
                // required: true,
              },
              control: 'shopSelector',
            },
            {
              schema: {
                label: '商品ID',
                field: 'platformIds',
              },
              controlProps: {
                placeholder: '请输入商品ID, 多个商品ID用逗号隔开',
              },
            },
          ]}
        >

        </FilterForm>
      </Modal>
      <Modal
        style={{
          width: ModalWidth,
        }}
        visible={addVisible}
        title="添加商品"
        onCancel={() => setAddVisible(false)}
        onOk={() => {
          addHandler.run()
        }}
        confirmLoading={addHandler.loading}
        unmountOnExit={true}
      >
        <FilterForm
          form={addForm}
          span={24}
          formItemConfigList={[
            {
              schema: {
                label: '图片',
                field: 'productImg',
              },
              control: 'upload',
            },
            {
              schema: {
                label: '商品名称',
                field: 'productName',
                required: true,
              },
            },
            {
              schema: {
                label: 'SKU',
                field: 'sku',
                required: true,
              },
            },
            {
              schema: {
                label: '成本',
                field: 'productCost',
                required: true,
              },
              control: 'number',
            },
            {
              schema: {
                label: '商品价格',
                field: 'unitPrice',
              },
              control: 'number',
            },
            {
              schema: {
                label: '备注',
                field: 'remark',
              },
            },
          ]}
        >

        </FilterForm>
      </Modal>
    </div>
  )
}
