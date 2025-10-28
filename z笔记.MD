国【49974139】错误提示
打印机 Deli DL-888B(NEW)
文档数量 1
任务 模式 打印
错误 码  下载失败
错误 信息 加载 模板 http://file.yimaivip.com/file/shipping number.xml 失败 Read timed打印机 厂商 联系 信息
帮助
错误 来源 http://file.yimaivip.com/file/shipping number.xml解决方窒
com.cainiao.print,base.exception.MessageException: load templatehttp://file.yimaivip.com/file/shipping number.xml failed Read timed out
at
com.cainiao.print.core.message.processor.PrintDocument2Pages.loadTemplate(PrintDocument2Pages.java:142)
at
com.cainiao,print.core.message.processor.PrintDocument2Pages.templates(PrintDocument2Pages.java:178)
at
com.cainiao.print.core.message.processor,PrintDocument2Pages.process(PrintD
隐藏详细信息
确定



百度统计：https://tongji.baidu.com/main/setting/10000676540/home/site/index


1. 注册时关联仓库
2. 订单备注看下


13692895627

2287687

1. 需要增加，用户端和管理端的备注
2. 增加管理端搜索
3. 出错后弹窗 商品链接列表展示。
4. 查看账号添加了多少店铺
5. 授权店铺最多添加多少个店铺，可以提交申请我们后台审核查看？
6.自定义修改天数，多少天不被修改（方案待定）

11.01
1. 屏幕宽度适配问题


11.06
1. 仓库寄件人列表管理，出货的时候用 
https://logistics.suyunbaoo.com/prod-admin/doc.html#/%E4%BB%93%E5%BA%93%E7%AE%A1%E7%90%86/%E7%89%A9%E6%B5%81%E4%BB%93%E5%BA%93%E5%AF%84%E4%BB%B6%E4%BA%BA%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/listAllUsingPOST

09.03
1. filterFrom onsubmit无效
2. 订单筛选，区分一下双端

826
1. 编辑打包按钮disabled
2. 问题包裹
3. 拒收管理 状态、操作

2. 订单字段补齐
3. 物流端快递管理
4. 双端显示操作


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

bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODkyODIzNzc1MCIsInVzZXJEZXRhaWwiOm51bGwsImxvZ2luX3RpbWUiOjE3MjI2NjQ5MDUwMzksInNjb3BlIjpbImFsbCJdLCJleHAiOjE3MjI3NTEzMDUsInVzZXJJZCI6Ijc3MTQxNjc4Mjk3NTE0MzkzNiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImp0aSI6IjczZTc2Y2IyLTI5M2MtNDA0Yy04YTg5LThjNmUxNmIyNmJiYSIsImNsaWVudF9pZCI6IndlYiJ9.YS_A2cjlynrtrid1ef8MR-V8PAf0Q1XY7P5OdMiqJBE

<!-- 创建订单 -->
fetch("http://xc.huodai365.com/api/erp/place-order/manual-creation", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODkyODIzNzc1MCIsInVzZXJEZXRhaWwiOm51bGwsImxvZ2luX3RpbWUiOjE3MjI2NjQ5MDUwMzksInNjb3BlIjpbImFsbCJdLCJleHAiOjE3MjI3NTEzMDUsInVzZXJJZCI6Ijc3MTQxNjc4Mjk3NTE0MzkzNiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImp0aSI6IjczZTc2Y2IyLTI5M2MtNDA0Yy04YTg5LThjNmUxNmIyNmJiYSIsImNsaWVudF9pZCI6IndlYiJ9.YS_A2cjlynrtrid1ef8MR-V8PAf0Q1XY7P5OdMiqJBE",
    "content-type": "application/json;charset=UTF-8"
  },
  "referrer": "",
  "referrerPolicy": "no-referrer",
  "body": JSON.stringify({
    "totalAmount": 15270,
    "compensateWay": "",
    "platform": "0",
    "trackingNumber": "15270",
    "orderSn": "3315270",
    "fileIds": "847993636229615616",
    "documentUrl": "https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993636229615616.png?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598215&Signature=MQpDgiApKxxXC9xrLHqqov%2BjFbY%3D",
    "orderType": "1",
    "shipByDate": "2024-07-26 22:35:47",
    "cancellationByDate": "2024-07-26 22:35:47",
    "headLogisticsType": "0",
    "warehouseId": "728319445646315520",
    "shippingCarrier": "7-ELEVEN",
    "remark": "备注66",
    "recipientName": "王大帅",
    "recipientPhone": "15270",
    "recipientZipcode": "1",
    "recipientRegion": "TW",
    "recipientState": "3",
    "recipientCity": "4",
    "recipientDistrict": "5",
    "recipientTown": "6",
    "recipientFullAddress": "777",
    "items": [
        {
            "shipType": "0",
            "shipNo": "15270",
            "id": "",
            "itemPic": "https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993653828915200.png?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598219&Signature=D3vPmjiN%2FXtNmQFiz8BvWBk9m3s%3D",
            "modelName": "15270",
            "modelSku": "15270",
            "code": "",
            "count": 1,
            "initCount": 1,
            "maxCount": null,
            "noDelivery": "0",
            "type": "0",
            "remark": "",
            "fileIds": "847993653828915200",
            "itemName": "测试，不用管",
            "price": "2001"
        },
        {
            "uuid": "b6cb1f04-0afc-4910-bd3a-dc954a7319df",
            "orderGoodsId": "add-1721918231965",
            "shipType": "0",
            "shipNo": "15272",
            "id": "",
            "itemPic": "https://ymkj-erp-prod.obs.cn-south-1.myhuaweicloud.com:443/common/847993857697255424.jpg?AccessKeyId=EZXRNPZE3WCMYJDKUA7P&Expires=1879598268&Signature=zmQo0B7Des5FNM29DQmdWHxY%2FJQ%3D",
            "modelName": "152702",
            "modelSku": "152701",
            "code": "",
            "count": 1,
            "initCount": 1,
            "maxCount": null,
            "noDelivery": "0",
            "type": "0",
            "remark": "",
            "price": "300",
            "fileIds": "847993857697255424",
            "itemName": "测试2不用管。"
        }
    ],
    "createTime": "2024-07-25 22:38:25",
    "timestamp": "2024-07-25T14:38:25.487Z",
    "region": "TW"
}),
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});


跨境电商物流erp系统设计
  1.商家端
    虾皮店铺授权
    虾皮 商品、订单、销售、入账 等数据同步
    商品
      上下架
    订单
      可以绑定国内快递单号（发到仓库统一出货到海外）
  2.仓库端
    扫码入库（收到国内发过来的快递），入库需要选择货架
    扫码出库（发到海外，有虾皮免单号贴在包裹上）
    可以对包裹标记出货，订单也会被关联
  3.用户管理
    可以对注册的账号进行身份标记 商家、仓库身份
    是否可以开通子账号
    子账号权限控制！
    


