import { Button, Checkbox, Divider, Form, Grid, Link, Radio, Table, Typography } from '@arco-design/web-react'

import { IconLeft, IconThunderbolt } from '@arco-design/web-react/icon'
import { useLocalStorageState } from 'ahooks'
import { uniqBy } from 'lodash'
import { useState } from 'react'

import { ProgressInfo } from '@/api/shopeeUtils/types'
import FilterForm from '@/components/FilterForm'

interface IProps {
  data: ProgressInfo
}
export default ({ data }: IProps) => {
  const [searchFromData, setSearchFromData] = useState<Record<string, any>>({})
  const [processingError, setProcessingError] = useState<boolean>(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [categortyAttributeFillInfo, setCategortyAttributeFillInfo] = useLocalStorageState('categortyAttributeFillInfo', {
    defaultValue: {},
  })
  const errorList = data?.list.filter(item => item.status === 'error') || []

  const list = errorList.filter((item) => {
    if (searchFromData.category_id && searchFromData.category_id !== item.detail.categoryInfo.category_id) {
      return false
    }
    if (searchFromData.item_name && !item.detail.item_name.includes(searchFromData.item_name)) {
      return false
    }
    if (searchFromData.item_id && String(item.detail.item_id) !== searchFromData.item_id) {
      return false
    }
    return true
  }).map((item, index) => ({
    ...item,
    index: index + 1,
  })) || []

  const categorys = uniqBy(errorList, o => o.detail?.categoryInfo.category_id).map(item => ({
    label: `${item.detail?.categoryInfo.display_category_name}(${errorList.filter(oitem =>
      oitem.detail.categoryInfo.category_id === item.detail?.categoryInfo.category_id,
    ).length}个)`,
    value: item.detail?.categoryInfo.category_id,
  }))

  return (
    <div className="pr-4">
      {
        !processingError
          ? (
              <FilterForm
                className="mb-4 mt-2"
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
                <Button
                  icon={<IconThunderbolt />}
                  className="ml-auto mb-4"
                  type="primary"
                  status="danger"
                  onClick={() => {
                    setProcessingError(true)
                  }}
                >
                  处理错误
                </Button>
              )
        }
      </div>
      {
        processingError
          ? (
              <div>
                <Checkbox.Group
                  value={selectedRowKeys}
                  onChange={(v: any[]) => {
                    if (categorys.every(item => v.includes(item.value))) {
                      v.push('all')
                    }
                    else if (v.includes('all')) {
                      v.splice(v.indexOf('all'), 1)
                    }
                    setSelectedRowKeys(v)
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
                            setSelectedRowKeys([...categorys.map(item => item.value), 'all'])
                          }
                          else {
                            setSelectedRowKeys([])
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
                {
                  data?.categoryAttributes?.map((item) => {
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
                              return (
                                <div key={oitem.attribute_id}>
                                  <Form.Item
                                    label={oitem.display_attribute_name}
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 20 }}
                                  >
                                    <Radio.Group
                                      value={
                                        categortyAttributeFillInfo[item.category_id]?.find(k => k.original_attribute_name === oitem.original_attribute_name)?.value_id
                                      }
                                      onChange={
                                        (value_id) => {
                                          setCategortyAttributeFillInfo({
                                            ...categortyAttributeFillInfo,
                                            [item.category_id]: [
                                              ...(categortyAttributeFillInfo[item.category_id] || [])
                                                .filter(k => k.original_attribute_name !== oitem.original_attribute_name),
                                              {
                                                original_attribute_name: oitem.original_attribute_name,
                                                value_id,
                                              },
                                            ],
                                          })
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
                }
              </div>
            )
          : null
      }
      {
        !processingError
          ? (
              <Table
                data={list}
                rowKey="detail.item_id"
                pagination={{
                  sizeOptions: [15, 20, 50, 100],
                  defaultPageSize: 15,
                }}
                columns={[
                  {
                    title: '序号',
                    dataIndex: 'index',
                    width: 100,
                  },
                  {
                    title: '商品名称',
                    dataIndex: 'item_name',
                    render(col, item, index) {
                      return (
                        <span>
                          <Link target="_blank" href={`https://seller.shopee.tw/portal/product/${item.detail.item_id}`}>
                            {item.detail.item_name}

                            {/* <IconEdit></IconEdit> */}
                          </Link>
                          （
                          {item.detail.item_id}
                          ）
                        </span>
                      )
                    },
                  },
                  {
                    title: '错误原因',
                    dataIndex: 'msg',
                  },
                  {
                    title: '类目',
                    width: 200,
                    dataIndex: 'detail.categoryInfo.display_category_name',
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
