6.13
1.storeType多选
2.userequest 监听，不要其他手动调用



6.7
1.一个快递单号可以关联多个虾皮订单
2.商家端可以独自走完订单流程，合作物流在商家设置里面，数据隔离即可

7.24
1. 线上虾皮订单状态 和 线下物流状态 做区分
2. 对应字典和参考平台一致，查询时我会默认取字典首位
2. 授权区分本土和跨境

价格类型判断

空运 = 新竹、7-11、全家、莱尔福、ok、店到店、黑猫、线上7-11、线上全家、线上莱尔福、进店
海快 = 新竹海快、协来运





----
判断用户上传了Excel文件，用excel解析。

# 角色
你是一个会计，你是一个精通 Excel 账单分析计算，能够精准无误地判别 Excel 账单表中计算结果的正确性

## 技能
判断费用列的
1: 分析账单计算结果
1. 一旦用户提供 Excel 账单表，就全面且细致地核查其中各项数据的计算准确性。
2. 若察觉到错误，清晰确切地指明错误的具体位置及问题所在。

## 限制:
- 仅仅着眼于 Excel 账单表的计算判断，坚决不涉足与账单表计算毫无关联的事务。
- 始终严格遵循给定的格式展开操作与输出。

## 示例：
1. excel 有多列为xx费用，如：
xxx费
价格1
价格2
价格3
....
1589.04（最底下这一项是总和，需要判断总和是否正确） 

## 输出格式：
xx费计算有误，正确总和为xx


https://p6-bot-sign.byteimg.com/tos-cn-i-v4nquku3lp/d924cdb61f5c42f482377ea09bb6c4b2.xlsx~tplv-v4nquku3lp-image.image?rk3s=68e6b6b5&x-expires=1720974511&x-signature=lsE5CaoPqoQ2W28fRlkSR9cBqgU%3D
----


<!-- 创建订单 -->
fetch("http://xc.huodai365.com/api/erp/place-order/manual-creation", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODkyODIzNzc1MCIsInVzZXJEZXRhaWwiOm51bGwsImxvZ2luX3RpbWUiOjE3MjE5MTgwNDExMjksInNjb3BlIjpbImFsbCJdLCJleHAiOjE3MjIwMDQ0NDEsInVzZXJJZCI6Ijc3MTQxNjc4Mjk3NTE0MzkzNiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImp0aSI6IjE0NWNiNzI4LWY3NmQtNDNhMi1hYzE4LWM1MmQ0Y2UyOTZiOCIsImNsaWVudF9pZCI6IndlYiJ9.VUBaOsH4LMJcQwOoYAVQmuHm89uZT_HSEX_bYihGzXs",
    "content-type": "application/json;charset=UTF-8"
  },
  "referrer": "",
  "referrerPolicy": "no-referrer",
  "body": "{\"totalAmount\":15270,\"compensateWay\":\"\",\"platform\":\"0\",\"trackingNumber\":\"15270\",\"orderSn\":\"3315270\",\"fileIds\":\"847993636229615616\",\"documentUrl\":\"https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993636229615616.png?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598215&Signature=MQpDgiApKxxXC9xrLHqqov%2BjFbY%3D\",\"orderType\":\"1\",\"shipByDate\":\"2024-07-26 22:35:47\",\"cancellationByDate\":\"2024-07-26 22:35:47\",\"headLogisticsType\":\"0\",\"warehouseId\":\"728319445646315520\",\"shippingCarrier\":\"7-ELEVEN\",\"remark\":\"备注66\",\"recipientName\":\"王大帅\",\"recipientPhone\":\"15270\",\"recipientZipcode\":\"1\",\"recipientRegion\":\"TW\",\"recipientState\":\"3\",\"recipientCity\":\"4\",\"recipientDistrict\":\"5\",\"recipientTown\":\"6\",\"recipientFullAddress\":\"777\",\"items\":[{\"shipType\":\"0\",\"shipNo\":\"15270\",\"id\":\"\",\"itemPic\":\"https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993653828915200.png?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598219&Signature=D3vPmjiN%2FXtNmQFiz8BvWBk9m3s%3D\",\"modelName\":\"15270\",\"modelSku\":\"15270\",\"code\":\"\",\"count\":1,\"initCount\":1,\"maxCount\":null,\"noDelivery\":\"0\",\"type\":\"0\",\"remark\":\"\",\"fileIds\":\"847993653828915200\",\"itemName\":\"测试，不用管\",\"price\":\"2001\"},{\"uuid\":\"b6cb1f04-0afc-4910-bd3a-dc954a7319df\",\"orderGoodsId\":\"add-1721918231965\",\"shipType\":\"0\",\"shipNo\":\"15272\",\"id\":\"\",\"itemPic\":\"https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993857697255424.jpg?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598268&Signature=zmQo0B7Des5FNM29DQmdWHxY%2FJQ%3D\",\"modelName\":\"152702\",\"modelSku\":\"152701\",\"code\":\"\",\"count\":1,\"initCount\":1,\"maxCount\":null,\"noDelivery\":\"0\",\"type\":\"0\",\"remark\":\"\",\"price\":\"300\",\"fileIds\":\"847993857697255424\",\"itemName\":\"测试2不用管。\"}],\"createTime\":\"2024-07-25 22:38:25\",\"timestamp\":\"2024-07-25T14:38:25.487Z\",\"region\":\"TW\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});