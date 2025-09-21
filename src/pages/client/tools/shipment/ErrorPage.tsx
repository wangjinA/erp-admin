import { Alert, Button, Checkbox, Divider, Form, Grid, Link, Message, Radio, Table, Typography } from '@arco-design/web-react'

import { IconEdit, IconLeft, IconRefresh } from '@arco-design/web-react/icon'
import { useLocalStorageState, useRequest } from 'ahooks'
import { uniq, uniqBy } from 'lodash'
import { useState } from 'react'

import { useSelector } from 'react-redux'

import { UpdateAttributeItem, shipmentAPI } from '@/api/shopeeUtils/shipment'
// import { ProgressInfo } from '@/api/shopeeUtils/types'
import FilterForm from '@/components/FilterForm'

import { GlobalState } from '@/store'
import { showMessage, showModal } from '@/utils'

interface IProps {
  // data: ProgressInfo
  shopId: any
}

const RepeatText = 'Product is duplicate with another product in the same shop'

export default ({ shopId }: IProps) => {
  const [searchFromData, setSearchFromData] = useState<Record<string, any>>({})
  const [processingError, setProcessingError] = useState<boolean>(false)
  const userInfo = useSelector((state: GlobalState) => state.userInfo)
  const [selectedCategorys, setSelectedCategorys] = useState([])
  const [page, setPage] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [categortyAttributeFillInfo, setCategortyAttributeFillInfo] = useLocalStorageState<Record<string, UpdateAttributeItem[]>>('categortyAttributeFillInfo', {
    defaultValue: {},
  })

  const { data, run, loading } = useRequest(async (params) => {
    return shipmentAPI.getUpdateErrors({
      userLoginAccount: userInfo.userLoginAccount,
      shopId,
      ...params,
    }).then(r => r.data)
  }, {
    refreshDeps: [shopId],
  })

  const errorList = data?.data?.list || []

  const list = errorList.filter((item) => {
    // if (searchFromData.category_id && searchFromData.category_id !== item.categoryId) {
    //   return false
    // }
    // if (searchFromData.item_name && !item.itemName.includes(searchFromData.item_name)) {
    //   return false
    // }
    // if (searchFromData.item_id && String(item.itemId) !== searchFromData.item_id) {
    //   return false
    // }
    // if (searchFromData.repeat && (searchFromData.repeat === 1 ? !item.errorMsg.includes(RepeatText) : item.errorMsg.includes(RepeatText))) {
    //   return false
    // }
    return true
  }).sort((a, b) => a.itemName.localeCompare(b.itemName, 'zh-Hans-CN')).map((item, index) => ({
    ...item,
    index: index + 1,
  })) || []

  const categorys = uniqBy(errorList, o => o.categoryId).map(item => ({
    label: `${item.displayCategoryName}(${errorList.filter(oitem =>
      oitem.categoryId === item.categoryId,
    ).length}个)`,
    value: item.categoryId,
  }))

  const saveHandler = useRequest(async (data) => {
    if (!userInfo.userLoginAccount) {
      return
    }
    await showMessage(() => shipmentAPI.saveCategortyAttribute({
      userLoginAccount: userInfo.userLoginAccount,
      data,
    }), '保存')
  }, {
    manual: true,
    debounceWait: 300,
  })

  const changeCategortyHandler = useRequest(async () => {
    if (!selectedRowKeys?.length) {
      return Message.warning('请选择商品')
    }
    await showModal({
      content: '在类目属性出现问题，影响修改出货时间时，再使用此操作！（如果错误类型是：【商品重复】，请移步删除操作）',
      okText: '确认修改',
    })
    await showMessage(() => shipmentAPI.changeCategorty({
      userLoginAccount: userInfo.userLoginAccount,
      shopId,
      itemIds: selectedRowKeys,
      isToCurrentCategoryOther: true,
    }).then((r) => {
      const errList = r.data.data?.filter(item => item.status === 'error') || []
      if (errList.length) {
        throw new Error(`出错${errList.length}个商品，原因：${uniq(errList.map(o => o.msg).join('、'))}`)
      }
      return r
    }), '设置')
    setSelectedRowKeys([])
  }, {
    manual: true,
  })

  const deleteHandler = useRequest(async () => {
    if (!selectedRowKeys?.length) {
      return Message.warning('请选择商品')
    }
    await showModal({
      content: `确认删除${selectedRowKeys.length}个商品`,
      okText: '确认删除',
    })
    await showMessage(() => shipmentAPI.deleteItems({
      userLoginAccount: userInfo.userLoginAccount,
      shopId,
      itemIds: selectedRowKeys,
    }), '删除')
    setSelectedRowKeys([])
  }, {
    manual: true,
  })

  return (
    <div className="pr-4">
      {
        !processingError
          ? (
            <FilterForm
              className="mb-4 mt-2"
              initialValues={{
                repeat: 0,
              }}
              formItemConfigList={[
                {
                  schema: {
                    label: '商品名称',
                    field: 'item_name',
                  },
                },
                {
                  schema: {
                    label: '商品ID',
                    field: 'item_id',
                  },
                },
                {
                  schema: {
                    label: '错误类目',
                    field: 'category_id',
                  },
                  control: 'select',
                  controlProps: {
                    options: categorys,
                  },
                },
                {
                  schema: {
                    label: '商品重复',
                    field: 'repeat',
                  },
                  control: 'radio',
                  controlProps: {
                    options: [
                      {
                        label: '全部',
                        value: 0,
                      },
                      {
                        label: '是',
                        value: 1,
                      },
                      {
                        label: '否',
                        value: 2,
                      },
                    ],
                  },
                },
              ]}
              onValuesChange={(val, vals) => {
                setSearchFromData(vals)
              }}
            >
            </FilterForm>
          )
          : null
      }
      <div className="flex mb-4">
        {
          processingError
            ? (
              <div className="w-full">
                <Button
                  icon={<IconLeft />}
                  type="text"
                  onClick={() => {
                    setProcessingError(false)
                  }}
                >
                  返回
                </Button>
              </div>
            )
            : (
              <div
                className="w-full mb-4 flex gap-4"
              >
                <Button
                  type="primary"
                  status="warning"
                  loading={changeCategortyHandler.loading}
                  onClick={() => {
                    changeCategortyHandler.run()
                  }}
                >
                  设置类目为：其他
                  {' '}
                  {selectedRowKeys.length ? `(${selectedRowKeys.length})个` : ''}
                </Button>
                <Button
                  type="primary"
                  status="danger"
                  loading={deleteHandler.loading}
                  onClick={() => {
                    deleteHandler.run()
                  }}
                >
                  删除商品
                  {' '}
                  {selectedRowKeys.length ? `(${selectedRowKeys.length})个` : ''}
                </Button>
                <Button
                  icon={<IconRefresh />}
                  className="ml-auto"
                  type="primary"
                  onClick={() => {
                    setPage(1)
                    run({
                      page: 1,
                      pageSize: 20,
                    });
                  }}
                >
                  刷新
                </Button>
                {/* <Button
                  icon={<IconEdit />}
                  className="ml-auto"
                  type="primary"
                  onClick={() => {
                    setProcessingError(true)
                  }}
                >
                  编辑属性
                </Button> */}
              </div>
            )
        }
      </div>
      {
        processingError
          ? (
            <div>
              <Alert title="保存成功后可前往【修改出货天数】，重新发起修改" type="info" className="mb-4"></Alert>
              <Typography.Title heading={6}>修改出错商品类目(不包含重复的商品出错类目)</Typography.Title>
              <Checkbox.Group
                className="w-full"
                value={selectedCategorys}
                onChange={(v: any[]) => {
                  if (categorys.every(item => v.includes(item.value))) {
                    v.push('all')
                  }
                  else if (v.includes('all')) {
                    v.splice(v.indexOf('all'), 1)
                  }
                  setSelectedCategorys(v)
                }}
              >
                <Grid.Row>
                  {/* 全选 */}
                  <Grid.Col
                    span={6}
                    style={{ marginBottom: 12 }}
                  >
                    <Checkbox
                      value="all"
                      onChange={(checked) => {
                        if (checked) {
                          setSelectedCategorys([...categorys.map(item => item.value), 'all'])
                        }
                        else {
                          setSelectedCategorys([])
                        }
                      }}
                    >
                      全选
                    </Checkbox>
                  </Grid.Col>
                  {
                    categorys.map(item => (
                      <Grid.Col
                        key={item.value}
                        span={6}
                        style={{ marginBottom: 12 }}
                      >
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Grid.Col>
                    ))
                  }
                </Grid.Row>
              </Checkbox.Group>
              <Divider />
              {/* {
                data?.filter(oitem => selectedCategorys.includes(oitem.category_id)).map((item) => {
                  return (
                    <div key={item.category_id}>
                      <Typography.Title heading={6}>{item.display_category_name}</Typography.Title>
                      <div>
                        {
                          item.attribute_list.map((oitem) => {
                            const options = oitem.attribute_value_list.map(item => ({
                              label: item.display_value_name,
                              value: item.value_id,
                            }))
                            const value = categortyAttributeFillInfo[item.category_id]
                              ?.find(k => k.attribute_id === oitem.attribute_id)?.attribute_value_list
                              ?.find(item => item.original_value_name === oitem.original_attribute_name)?.value_id

                            return (
                              <div key={oitem.attribute_id}>
                                <Form.Item
                                  label={oitem.display_attribute_name}
                                  labelCol={{ span: 4 }}
                                  wrapperCol={{ span: 20 }}
                                >
                                  <Radio.Group
                                    value={value}
                                    onChange={
                                      (value_id) => {
                                        const saveData = {
                                          ...categortyAttributeFillInfo,
                                          [item.category_id]: [
                                            ...(categortyAttributeFillInfo[item.category_id] || [])
                                              .filter(k => k.attribute_id !== oitem.attribute_id),
                                            {
                                              attribute_id: oitem.attribute_id,
                                              attribute_value_list: [{
                                                original_value_name: oitem.original_attribute_name,
                                                value_id,
                                              }],
                                            },
                                          ],
                                        }
                                        setCategortyAttributeFillInfo(saveData)
                                        saveHandler.run(saveData)
                                      }
                                    }
                                    options={options}
                                  >

                                  </Radio.Group>
                                </Form.Item>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              } */}
            </div>
          )
          : null
      }
      {
        !processingError
          ? (
            <Table
              loading={loading}
              rowSelection={
                {
                  type: 'checkbox',
                  selectedRowKeys,
                  onChange: (selectedRowKeys) => {
                    setSelectedRowKeys(selectedRowKeys)
                  },
                  onSelectAll: (selected) => {
                    if (selected) {
                      setSelectedRowKeys(list.map(item => item.itemId))
                    }
                    else {
                      setSelectedRowKeys([])
                    }
                  },
                }
              }
              data={errorList}
              rowKey={c => c.itemId}
              pagePosition="tr"
              pagination={{
                sizeOptions: [20, 50],
                defaultPageSize: 20,
                showTotal: true,
                total: data?.data?.total || 0,
                current: page,
              }}
              onChange={({ current, defaultPageSize }) => {
                setPage(current)
                run({
                  page: current,
                  pageSize: defaultPageSize,
                })
              }}
              columns={[
                {
                  title: '序号',
                  dataIndex: 'index',
                  width: 100,
                  render: (col, item, index) => index + 1,
                },
                {
                  title: '商品名称',
                  dataIndex: 'item_name',
                  width: 300,
                  render(col, item, index) {
                    return (
                      <span>
                        <Link target="_blank" href={`https://seller.shopee.tw/portal/product/${item.itemId}`}>
                          {item.itemName}

                          {/* <IconEdit></IconEdit> */}
                        </Link>
                        {/* <p> */}
                        （
                        {item.itemId}
                        ）
                        {/* </p> */}
                      </span>
                    )
                  },
                },
                {
                  title: '错误原因',
                  dataIndex: 'errorMsg',
                  render(msg) {
                    const translatedMsg = msg?.replace(RepeatText, '商品重复').replace('please check and update', '请检查后再更新')
                      .replace('is mandatory required', '是必填项').replace('Attribute', '属性').replace('requests too frequent', '频率过高，重试即可')
                    return (
                      <div>
                        {translatedMsg}
                      </div>
                    )
                  },
                },
                {
                  title: '类目',
                  width: 200,
                  dataIndex: 'displayCategoryName',
                },
              ]}
            >

            </Table>
          )
          : null
      }
    </div>
  )
}
