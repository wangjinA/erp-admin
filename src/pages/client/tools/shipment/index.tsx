import { Button, Drawer, Form, Image, Modal, Progress, Space, Spin, Tag } from '@arco-design/web-react'
import { IconEdit, IconSend } from '@arco-design/web-react/icon'
import { useRequest } from 'ahooks'
import { random } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import ErrorPage from './ErrorPage'
import StoreListUtilsSchema from './schema'

import { ShopStore, shopStoreAPI } from '@/api/client/shopStore'
import { shipmentAPI } from '@/api/shopeeUtils/shipment'
import { ProcessInfo } from '@/api/shopeeUtils/types'
import KF1 from '@/assets/wx/kf1.png'
import KF2 from '@/assets/wx/kf2.png'

// import ZfbSkM from '@/assets/zfb_skm.png'
import FilterForm from '@/components/FilterForm'
import SearchTable, { SearchTableRef } from '@/components/SearchTable'
import StatusTag from '@/components/StatusTag'
import { KF } from '@/constants'
import { GlobalState } from '@/store'
import { showMessage, showModal } from '@/utils'
import { secondsToDateString } from '@/utils/date'

interface StoreListProps { }
const StoreList: React.FC<StoreListProps> = (props) => {
  const { userInfo } = useSelector((state: GlobalState) => state)
  const ref = useRef<SearchTableRef>()
  const [current, setCurrent] = useState<ShopStore>()
  const [applyCurrent, setApplyCurrent] = useState<ShopStore>()
  const [processInfo, setProcessInfo] = useState<ProcessInfo>(null)
  const [currentErrorShopId, setCurrentErrorShopId] = useState<any>()
  const [errorInfo, setErrorInfo] = useState<{
    title: string
    shopId: any
  }>()
  const [list, setList] = useState<ShopStore[]>([])
  const [form] = Form.useForm()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()
    return showMessage(() => shipmentAPI.update({
      ...formData,
      userLoginAccount: userInfo.userLoginAccount,
      shopId: current?.id,
    })).then(() => {
      setCurrent(null)
    })
  }, {
    manual: true,
  })

  const applyHandle = useRequest(({ id, shopName }) => {
    return showMessage(() => shipmentAPI.apply({
      userLoginAccount: userInfo.userLoginAccount,
      shopId: id,
      shopName,
    }).then((r) => {
      setApplyCurrent(null)
      ref.current.refreshSearchTable()
      return r
    }))
  }, {
    manual: true,
  })

  const updateTimeGroupList = useRequest(() => {
    return shipmentAPI.getUpdateTimeGroupList()
  }, {
    manual: false,
  })

  const saveHandle = useRequest(async () => {
    const formData = await form.validate()
    return showMessage(() => shipmentAPI.save({
      ...formData,
      userLoginAccount: userInfo.userLoginAccount,
      shopId: current?.id,
    })).then(() => {
      setCurrent(null)
      ref.current.refreshSearchTable()
    })
  }, {
    manual: true,
  })

  useEffect(() => {
    let timer
    function fn() {
      const ids = list?.map(item => item.id) || []
      if (!ids.length)
        return
      return shipmentAPI.getProcess({
        userLoginAccount: userInfo.userLoginAccount,
        shopIds: list.map(item => item.id),
      }).then((r) => {
        setProcessInfo(r.data.data)
      }).finally(() => {
        timer = setTimeout(fn, 2000)
      })
    }
    fn()
    return () => {
      clearTimeout(timer)
    }
  }, [JSON.stringify(list),
  ])
  console.log(current)

  return (
    <div className="p-4 bg-white">
      <SearchTable
        ref={ref}
        getListRequest={(...args) => shopStoreAPI.getList(...args).then(async (r) => {
          const consumers = await shipmentAPI.getConsumerList({
            userLoginAccount: userInfo.userLoginAccount,
            pageNum: 1,
            pageSize: 1000,
          })
          r.data.data.list.forEach((item) => {
            item.consumerInfo = consumers?.data?.data?.list?.find(oitem => oitem.shopId === item.id)
          })
          return r
        })}
        onDataChange={
          (data) => {
            setList(data.list)
          }
        }
        formItemConfigList={[
          ...StoreListUtilsSchema,
          {
            schema: {
              label: '操作',
              field: 'actions',
            },
            render(col, row) {
              const targetProgressInfo = processInfo?.progress?.[row.id]
              const errList = targetProgressInfo?.list?.filter(item => item.status === 'error') || []

              const percent = Number(targetProgressInfo?.value?.replace('%', '') || 0)
              const errorMsg = targetProgressInfo?.errorMsg
              return (
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <Button
                      type="text"
                      className="-ml-4"
                      icon={<IconEdit />}
                      onClick={() => {
                        setCurrent(row)
                      }}
                    >
                      修改出货天数
                    </Button>
                    {
                      percent === 1 && !errorMsg
                        ? (
                            <div className="flex gap-2 items-center">
                              <StatusTag
                                tagInfos={[{
                                  text: <>
                                    <Spin size={12} className="!inline-block mr-1"></Spin>
                                    正在获取商品数量...
                                  </>,
                                  value: 0,
                                  color: 'green',
                                }]}
                                value={0}
                              >
                              </StatusTag>

                            </div>
                          )
                        : null
                    }
                    {((percent && percent !== 1) || errorMsg)
                      ? (
                          <div className="pl-4">
                            <Progress className="mb-1" percent={percent}></Progress>
                            {(targetProgressInfo?.duration || errorMsg)
                              ? (

                                  errorMsg
                                    ? (
                                        <div
                                          className="text-sm max-w-[600px]"
                                          style={{
                                            color: 'red',
                                          }}
                                        >
                                          {`商品数量：${targetProgressInfo.goodsTotal}，时长：${secondsToDateString(targetProgressInfo.duration)}${errorMsg}`}
                                          <Button
                                            type="primary"
                                            className="mt-2"
                                            status="danger"
                                            size="mini"
                                            onClick={() => {
                                              setErrorInfo({
                                                title: `${row.shopName} - 修改出错列表`,
                                                shopId: row.id,
                                              })
                                              setCurrentErrorShopId(row.id)
                                            }}
                                          >
                                            查看错误
                                          </Button>
                                        </div>
                                      )
                                    : (
                                        <StatusTag
                                          tagInfos={[{
                                            text: `商品数量：${targetProgressInfo.goodsTotal}，时长：${secondsToDateString(targetProgressInfo.duration)}`,
                                            value: 0,
                                            color: 'green',
                                          }]}
                                          value={0}
                                        >
                                        </StatusTag>
                                      )
                                )
                              : null}
                          </div>
                        )
                      : null}
                  </div>
                  <div>
                    <Button
                      type="text"
                      className="-ml-4"
                      loading={applyHandle.loading && applyCurrent?.id === row.id}
                      icon={<IconSend />}
                      status="danger"
                      onClick={async () => {
                        await showModal({
                          title: '平台内测期间，添加客服微信免费使用',
                          okText: '申请',
                          content: (
                            <div>
                              <div className="mb-2">
                                确定申请权限？申请后联系客服同意授权：
                                {KF}
                              </div>
                              <Space className="items-start">
                                <Image
                                  width={200}
                                  src={KF1}
                                />
                                <Image
                                  width={200}
                                  src={KF2}
                                />
                              </Space>
                            </div>
                          ),
                          okButtonProps: {
                            status: 'default',
                          },
                        })
                        setApplyCurrent(row)
                        applyHandle.run(row)
                      }}
                    >
                      申请权限
                    </Button>
                  </div>
                </div>
              )
            },
          },
        ]}
        name="店铺授权"
      >
      </SearchTable>
      <Modal
        title="修改出货天数"
        unmountOnExit={true}
        visible={!!current}
        onCancel={() => {
          setCurrent(null)
        }}
        confirmLoading={loading || saveHandle.loading}
        okText="立即修改"
        onConfirm={() => {
          run()
        }}
        footer={(cancelButtonNode, okButtonNode) => (
          <>
            {
              cancelButtonNode
            }
            <Button
              type="primary"
              status="warning"
              onClick={() => {
                saveHandle.run()
              }}
              loading={saveHandle.loading}
            >
              保存
            </Button>
            {
              okButtonNode
            }
          </>
        )}
      >
        <FilterForm
          form={form}
          initialValues={current?.consumerInfo}
          formItemConfigList={[{
            schema: {
              span: 24,
              label: '出货天数',
              field: 'day',
              required: true,
            },
            control: 'number',
            controlProps: {
              max: 30,
              min: 2,
            },
          }, {
            schema: {
              span: 24,
              label: '忽略商品ID',
              field: 'ids',
            },
            control: 'textarea',
            controlProps: {
              placeholder: '输入商品ID，用逗号隔开',
            },
          }, {
            schema: {
              span: 24,
              label: '定时执行',
              field: 'time',
            },
            control: 'switch',
            controlProps: {
            },
          }, {
            schema: {
              span: 24,
              label: '周日执行',
              field: 'sunday_update_time',
            },
            control: 'select',
            controlProps: {
              options: [
                '20:00',
                '20:30',
                '21:00',
                '21:30',
                '22:00',
                '22:30',
                '23:00',
                '23:30',
              ].map(o => ({
                label: (
                  <div className="flex justify-between items-center">
                    <span>{o}</span>
                    <Tag color={random(1, 10) % 2 === 0 ? 'red' : 'green'}>
                      50%
                    </Tag>
                  </div>
                ),
                value: o,
              })),
            },
          }, {
            schema: {
              span: 24,
              label: '周一执行',
              field: 'monday_update_time',
            },
            control: 'select',
            controlProps: {
              options: [
                '00:05',
                '00:25',
                '00:45',
                '01:00',
                '01:20',
                '01:45',
                '02:00',
                '02:25',
              ].map(o => ({
                label: (
                  <div className="flex justify-between items-center">
                    <span>{o}</span>
                    <Tag color={random(1, 10) % 2 === 0 ? 'red' : 'green'}>
                      50%
                    </Tag>
                  </div>
                ),
                value: o,
              })),
            },
          }]}
        >
        </FilterForm>
      </Modal>
      <Drawer
        title={errorInfo?.title}
        width="80%"
        visible={!!currentErrorShopId}
        onCancel={() => setCurrentErrorShopId(null)}
        unmountOnExit={true}
        onOk={
          () => setCurrentErrorShopId(null)
        }
      >
        <ErrorPage data={processInfo?.progress?.[currentErrorShopId]} shopId={errorInfo?.shopId}></ErrorPage>
      </Drawer>
    </div>
  )
}

export default StoreList
