// 商品管理
import { Button, Form, Message, Modal, Upload } from '@arco-design/web-react'

import { useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'

import ProductInfo from '../components/ProductInfo'

import { StockAPI } from '@/api/client/stock'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import { exportToExcel, getExcleData, showMessage, showModal } from '@/utils'
import { UploadItem } from '@arco-design/web-react/es/Upload'

export const ModalWidth = 600

export default () => {
  const [syncVisible, setSyncVisible] = useState(false)
  const [addVisible, setAddVisible] = useState(false)
  const [syncAppointVisible, setSyncAppointVisible] = useState(false)
  const ref = useRef<SearchTableRef>()

  const [syncForm] = Form.useForm()
  const [syncAppointForm] = Form.useForm()
  const [addForm] = Form.useForm()

  const fileRef = useRef<any>();

  const syncHandler = useRequest(async () => {
    const formData = await syncForm.validate()
    return showMessage(() => StockAPI.synchronousGoods({
      productUpdateEndTime: dayjs(formData.date[1]).format('YYYY-MM-DD'),
      productUpdateStartTime: dayjs(formData.date[0]).format('YYYY-MM-DD'),
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

  const addGoodsInfoBatchHandle = useRequest(async (list) => {
    return showMessage(() => StockAPI.addGoodsInfoBatch(list), '导入商品')
  }, {
    manual: true,
  })


  return (
    <div
      className="bg-white p-4"
    >
      <input accept=".xlsx" style={{ display: 'none' }} hidden type='file' ref={fileRef} onChange={async e => {
        const file = e.target.files[0];
        if (file) {
          const list = await getExcleData(file)
          console.log(list);

          await showModal({
            content: `确认导入${list.length}个商品吗？`,
          })
          const data = list.slice(1).map(o => ({
            productName: o[0],
            sku: o[1],
            productCost: o[2],
            unitPrice: o[3],
            remark: o[4]
          }))
          addGoodsInfoBatchHandle.run(data)
        }
      }
      }></input>
      <SearchTable
        name="商品管理"
        getListRequest={StockAPI.getProductList}
        removeRequest={StockAPI.deleteGoodsInfo}
        updateRequest={StockAPI.updateGoodsInfo}
        createRequest={StockAPI.addGoodsInfo}
        createText="新增商品"
        createButtonProps={{
          status: 'success',
        }}
        filterFormProps={{
          span: 24,
        }}
        ref={ref}
        formItemConfigList={[
          {
            schema: {
              label: '图片',
              field: 'productImg',
            },
            control: 'upload',
            controlProps: {
              limit: 3,
            },
            isCreate: true,
            hideTable: true,
          },
          {
            schema: {
              label: 'tenantryId',
              field: 'tenantryId',
            },
            formItemProps: {
              hidden: true
            },
            control: 'input',
            hideTable: true,
            isCreate: true,
          },
          {
            schema: {
              label: '商品名称',
              field: 'productName',
              required: true,
            },
            isCreate: true,
            hideTable: true,
          },
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
            render(c, row) {
              return <ProductInfo data={row}></ProductInfo>
            },
          },
          {
            schema: {
              label: 'SKU',
              field: 'sku',
            },
            isSearch: true,
            isCreate: true,
            render(c) {
              return c || '未填写'
            },
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
            control: 'number',
            isCreate: true,
          },
          {
            schema: {
              label: '商品价格',
              field: 'unitPrice',
            },
            control: 'number',
            isCreate: true,
          },
          {
            schema: {
              label: '备注',
              field: 'remark',
            },
            isCreate: true,
            render(c) {
              return c || '-'
            },
          },
        ]}
        formModalProps={{
          style: {
            width: ModalWidth,
          },
        }}
        leftTool={() => (
          <>
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
              onClick={() => {
                fileRef.current.click()
              }}
              loading={addGoodsInfoBatchHandle.loading}
            >
              导入数据
            </Button>
            <Button
              type="primary"
              onClick={() => {
                exportToExcel([
                  ['商品名称', 'SKU', '成本', '商品价格', '备注'],
                ], '添加商品模板')
                Message.success('导出成功')
              }}
            >
              导出模板
            </Button>
          </>
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
              controlProps: {
                mode: 'multiple',
              },
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
              controlProps: {
                // mode: 'multiple',
              },
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
    </div >
  )
}
