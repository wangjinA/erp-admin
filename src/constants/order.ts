// 只对这些物流商进行批量申请面单
export const BatchApplyShippingCarrierList = ['蝦皮店到店', '7-ELEVEN', 'OK Mart', '全家', '萊爾富']

export const ShippingCarrierColorMap = {
  '线下7-ELEVEN': 'red',
  "线下新竹物流": 'orangered',
  "线下全家": 'orange',
  "OK Mart": '#146785',
  "萊爾富": '#ff59cc',
  "蝦皮店到店": 'green',
  "賣家宅配": 'blue',
  "賣家宅配：大型/超重物品運送": 'blue',
  "全家": 'arcoblue',
  "7-ELEVEN": 'purple',
  "宅配通": 'pinkpurple',
  "黑貓宅急便": 'magenta',
  "新竹物流": '#f53f3f',
  "嘉里快遞": '#7816ff',
  "店到家宅配": '#00b42a',
}

export const SystemName = '速運寶';


export const OrderStatus = {
  '待入库': "0",
  '部分入库': "1",
  '待出库': "2",
  '已交运': "3",
  '已出库': "4",
  '已取消': "5",
  '已关闭': "6",
}

export const ShopeeStatus = {
  '已装船': 'SHIPPED',
  '已取消': 'CANCELLED',
  "取消中": "IN_CANCEL",
  "已完成": "COMPLETED",
}

// 异常搁置值 99
export const ExceptionOnHoldValue = '7'
