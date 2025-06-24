import OrderPage, { OrderPageType } from '@/pages/client/order/orderPage'

export default () => {
  return (
    <OrderPage
      type={OrderPageType.OUT_ORDER_STATUS}
    >
    </OrderPage>
  )
}
// import FilterForm from '@/components/FilterForm'
// import { getOrderFilter } from '@/pages/client/order/orderPage/schema'
// import { Button, Drawer, Form, Space, Tabs } from '@arco-design/web-react'
// import React, { useState } from 'react'
// import { useRequest } from 'ahooks'
// import SearchTable from '@/components/SearchTable'
// import { EntrepotNameFC } from '@/components/Selectors/EntrepotSelector'
// import { DividerSchema } from '@/constants/schema/common'
// import LabelValue from '@/components/LabelValue'
// import GoodsInfo from '@/components/GoodsInfo'
// import { orderAPI } from '@/api/admin/order'

// export default () => {
//   const [filterForm] = Form.useForm()
//   const [formData, setFormData] = useState({})
//   const [current, setCurrent] = useState()
//   const listHandle = useRequest(async () => {
//     // const data = 
//   }, {
//     manual: false
//   })

//   // 换单
//   const changeHandle = useRequest(async () => {
//     // const data = 
//   }, {
//     manual: false
//   })
//   // 销毁
//   const destroyHandle = useRequest(async () => {
//     // const data = 
//   }, {
//     manual: false
//   })
//   return (
//     <div className="p-4 bg-white">
//       <SearchTable
//         tableProps={{
//           data: [{}]
//         }}
//         getListRequest={orderAPI.overseasWarehouseReturnList}
//         middleTool={
//           () => <Tabs className="-mt-[55px] mb-5">
//             <Tabs.TabPane title="全部" key="1" />
//             <Tabs.TabPane title="待处理" key="2" />
//             <Tabs.TabPane title="已换单" key="3" />
//             <Tabs.TabPane title="待销毁" key="4" />
//             <Tabs.TabPane title="已销毁" key="5" />
//           </Tabs>
//         }
//         name="海外仓退件订单"
//         formItemConfigList={[
//           {
//             schema: {
//               field: 'sendWarehouse',
//               label: '所属仓库',
//               span: 24,
//             },
//             control: 'entrepotRadio',
//             isSearch: true,
//             hideTable: true
//           },
//           DividerSchema,
//           {
//             schema: {
//               label: '订单信息',
//               field: 'orderN1o1',
//             },
//             render(c) {
//               return <Space size={2} direction="vertical" >
//                 <LabelValue label="订单状态" value="待处理"></LabelValue>
//                 <LabelValue label="订单编号" value="123123123"></LabelValue>
//                 <LabelValue label="订单店铺" value="啊啊啊"></LabelValue>
//                 <LabelValue label="订单时间" value="2025-04-08 19:51:32"></LabelValue>
//                 <LabelValue label="上架时间" value="2025-04-08 19:51:32"></LabelValue>
//                 <LabelValue label="过期时间" value="2025-04-08 19:51:32"></LabelValue>
//                 <LabelValue label="上架人" value="凤凰物流总段"></LabelValue>
//               </Space>
//             }
//           },
//           {
//             schema: {
//               label: '商品信息',
//               field: 'orderN1o',
//             },
//             render(col, item, index) {
//               return <div>
//                 {/* <GoodsInfo></GoodsInfo> */}
//               </div>
//             },
//           },
//           {
//             schema: {
//               label: '发货信息',
//               field: 'refundNo',
//             },
//             render(col, item, index) {
//               return <div>
//                 {/* <SendCargoInfo data={row}></SendCargoInfo> */}
//               </div>
//             }
//           }, {
//             schema: {
//               label: '退件信息',
//               field: 'refundNo',
//             },
//             render(col, item, index) {
//               return <Space>
//                 <LabelValue label="退件仓库" value="东坑李总"></LabelValue>
//                 <LabelValue label="仓位编码" value="89803-11"></LabelValue>
//               </Space>
//             },
//           }, {
//             schema: {
//               label: '操作',
//               field: 'actions',
//             },
//             render(col, item, index) {
//               return <>
//                 <Button
//                   type='text'
//                   status="default"
//                   size="small"
//                   onClick={() => {
//                     setCurrent(item)
//                   }}
//                 >
//                   换单
//                 </Button>
//                 <Button
//                   type='text'
//                   status="danger"
//                   size="small"
//                   onClick={() => {
//                     destroyHandle.run()
//                   }}
//                   loading={destroyHandle.loading}
//                 >
//                   销毁
//                 </Button>
//               </>
//             }
//           }
//         ]}>
//       </SearchTable>
//       <Drawer
//         title={`${current?.orderNo} - 换单重出`}
//         width="65%"
//         visible={current}
//         onCancel={() => {
//           setCurrent(null)
//         }}
//         okButtonProps={{
//           loading: destroyHandle.loading
//         }}
//         onOk={async () => {
//           await destroyHandle.run()
//         }}
//       >
//         <SearchTable
//           name="换单重出"
//           formItemConfigList={[
//             {
//               schema: {
//                 label: '订单编号',
//                 field: 'orderNo',
//               },
//               isSearch: true,
//               hideTable: true
//             },
//           ]}

//         >

//         </SearchTable>
//       </Drawer>
//     </div>
//   )
// }
