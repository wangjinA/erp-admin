import { Message } from "@arco-design/web-react";

const printer = {
  callback: null,
  socket: null,
  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        resolve(null);
      } else {
        let socket = new WebSocket('ws://localhost:13528');
        let setPrinterConfig = this.getRequestObject("setPrinterConfig");
        setPrinterConfig.printer = new Object();
        setPrinterConfig.printer.forceNoPageMargins = false;//强制设置页面无空边,true为强制设置页面无空边,false为由打印机驱动决定
        setPrinterConfig.printer.paperSize = {
          "width": 90,
          "height": 90
        };
        //设置打印机配置
        /* let setPrinterConfig = this.getRequestObject("setPrinterConfig");
         setPrinterConfig.printer = new Object();
         setPrinterConfig.printer.needBottomLogo = true;//是否需要模板下联的快递logo
         setPrinterConfig.printer.needTopLogo = true;//是否需要模板上联的快递logo
         setPrinterConfig.printer.forceNoPageMargins = false;//强制设置页面无空边,true为强制设置页面无空边,false为由打印机驱动决定*/
        // setPrinterConfig.printer.autoPageSize = false;//true：自适应纸张大小，false：不自适应
        // setPrinterConfig.printer.orientation = 0;//0：纵向 1： 横向
        // setPrinterConfig.printer.autoOrientation = true;//true：按照 orientation 适应纸张方向，false：不自适应
        /*setPrinterConfig.printer.paperSize = {
                "width": 100,
                "height": 180
        };//打印机纸张的宽高*/

        socket.onerror = function (event) {
          reject();
        };
        socket.onmessage = (event) => {
          //接收数据;
          const result = JSON.parse(event.data);

          if (result.cmd == 'notifyPrintResult') {
            //打印通知
            if (result.taskStatus == 'printed') {
              console.log(result);
              this.callback(result.taskStatus);
            } else if (result.taskStatus == 'failed') {//打印失败
              console.log(result);
              Message.error("打印失败");
              this.callback(result.taskStatus);
            }
          }
        };
        socket.onopen = (event) => {
          this.socket = socket;
          resolve(null);
        };
        // 监听Socket的关闭
        socket.onclose = (event) => {
          this.socket = null;
          // console.log("关闭组件");
        };
        // socket.send(JSON.stringify(setPrinterConfig));
      }
    });
  },
  disconnect() {
    if (this.socket) {
      this.socket.onclose;
    }
  },
  async doPrint(waybillArray, callback = () => { }) {
    console.log("开始打印123");
    this.callback = callback;
    let request = this.getRequestObject("print");
    request.task = new Object();
    console.log("11111111111");
    request.task.taskID = this.getUuid(8, 10);//打印机任务ID，每个打印任务会分配不同的且唯一的ID
    request.task.preview = false;//是否预览.true为预览,false为打印
    request.task.previewType = "";//属性取值“pdf” or “image” 预览模式，是以pdf还是image方式预览，二选一，此属性不是必选，默认以pdf预览。
    request.task.firstDocumentNumber = 1;//task 起始 document 序号
    request.task.totalDocumentCount = 1;//task document 总数
    // request.task.printer = "Deli DL-730C(NEW)";//打印机名，如果为空，会使用默认打印机
    request.task.printer = "";//打印机名，如果为空，会使用默认打印机
    request.task.documents = waybillArray;
    /*request.task.documents = [{"documentID":"66718590953409591187","contents":[
        {"data":{
                "ordersn":"111111111111",
                "trackingNo":"22222222222222",
                "logistics":{
                    "shippingCarrier": "Standard International",
                    "logisticId": null,
                    "trackingNo": "PH2181957171129",
                    "serviceCode": "PV04",
                    "firstMileName": "Vinflair",
                    "lastMileName": "PHL2",
                    "goodsToDeclare": true,
                    "zone": "",
                    "laneCode": "S-PH13",
                    "warehouseAddress": "Logistics Sorting Hub, Xi Niu Yi Street, Maiyuan Village, Changping Town, Dongguan City",
                    "warehouseId": "TWS01",
                    "cod": true,
                    "recipientSortCode": null,
                    "senderSortCode": null,
                    "thirdPartyLogisticInfo": null,
                    "buyerCpfId": null,
                    "shopeeTrackingNo": "PH2181957171129",
                    "lmTn": ""},
                "orderAddress":{
                    "name":'Zhang San',
                    "fullAddress":'china',
                    "phone":"13000000000",
                },
            },
            "templateURL":"http://file.yimaivip.com/file/shopee-print-v4.xml"}]}];//打印内容*/
    // request.task.documents = [{"documentID":"66718590953409591187","contents":[{"data":{"_dataFrom":"waybill","ordersn":"111111111111","adsInfo":{"adId":"3","advertisementType":"PSA","bannerUrl":"http://ad-cdn.cainiao.com/img/3/1654165145205.png","miniBannerUrl":"http://ad-cdn.cainiao.com/img/3/1655351637320.png"},"items":[{"id":239201641,"itemId":10447763814,"ordersn":"2110186K4Y2P0G","itemName":"Sticker Laptop Lenovo Ideapad 5 Slim 3 Slim 5i IdeaPad 330s Ideapad 3 IdeaPad320 S 120s 330c Lenovo 7000 14 Inch Laptop Skin with Keyboard Cover Three Sides Laptop Protective Cover Anti-scratch Film Waterproof Removable Laptop Casing Full Cover","itemSku":"备注 14寸LX24,小新潮7000-14IKBR Lin","variationId":130346734555,"variationName":"001","variationSku":"J-376 备注 14寸LX24,小新潮7000-14IKBR Lin","images":null,"variationQuantityPurchased":1,"variationOriginalPrice":904.00000000,"variationDiscountedPrice":452.00000000,"isWholesale":false,"weight":0.30000000,"isAddOnDeal":false,"isMainItem":false,"addOnDealId":0,"promotionType":"","promotionId":0,"mainImage":"https://cf.shopee.ph/file/f3e1d3bc18e396be46b5f8e099ae2331","imageUrl":"https://cf.shopee.ph/file/5f8f25109ca4efd1e2f706210c25fee3_tn","sourceUrl":null,"purchaseDetail":null,"shopeeItemUrl":null}],"cpCode":"YTO","realCpCode":"YTO","recipient":{"address":{"city":"广州市","detail":"叁悦广场B塔","district":"海珠区","province":"广东省","town":"琶洲街道"},"mobile":"13065544563","name":"收件人"},"routingInfo":{"blockCode":"叁悦广场","routeCode":"600-H04-00 405"},"sender":{"address":{"city":"广州市","detail":"保利叁悦广场B塔502","district":"海珠区","province":"广东省"},"mobile":"15975448310","name":"张学友"},"waybillCode":"YT6576507477091"},"templateURL":"https://erp.emalacca.com/api/acc/print-tmp/shopee-print-v4.xml"}]}];//打印内容
    // request.task.documents = [{"documentID":"66718590953409591187","contents":[{"data":{"_dataFrom":"waybill","adsInfo":{"adId":"3","advertisementType":"PSA","bannerUrl":"http://ad-cdn.cainiao.com/img/3/1654165145205.png","miniBannerUrl":"http://ad-cdn.cainiao.com/img/3/1655351637320.png"},"cpCode":"YTO","realCpCode":"YTO","recipient":{"address":{"city":"广州市","detail":"叁悦广场B塔","district":"海珠区","province":"广东省","town":"琶洲街道"},"mobile":"13065544563","name":"收件人"},"routingInfo":{"blockCode":"叁悦广场","routeCode":"600-H04-00 405"},"sender":{"address":{"city":"广州市","detail":"保利叁悦广场B塔502","district":"海珠区","province":"广东省"},"mobile":"15975448310","name":"张学友"},"waybillCode":"YT6576507477091"},"templateURL":"http://cloudprint.cainiao.com/template/standard/290659/61"}]}];//打印内容
    // request.task.documents = [{"documentID":"66718590953409591187","contents":[{"data":{"ordersn":"2110186K4Y2P0G","storeId":47237,"memberId":26987,"createdBy":null,"shopId":296667567,"orderStatus":"COMPLETED","orderCode":null,"orderCreateTime":"2021-10-18 11:25:26","orderUpdateTime":"2021-11-06 09:14:39","country":"PH","currency":"PHP","cod":true,"trackingNo":"PH2181957171129","daysToShip":3,"estimatedShippingFee":40.00000000,"actualShippingCost":153.00000000,"totalAmount":460.00000000,"escrowAmount":null,"shippingCarrier":"Standard International","paymentMethod":"COD","goodsToDeclare":true,"messageToSeller":"","note":"","noteUpdateTime":"1970-01-01 08:00:00","payTime":"2021-10-31 18:27:09","dropshipper":"","creditCardNumber":null,"buyerUsername":"mariahgayas21","dropshipperPhone":"","shipByDate":"2021-10-21 11:35:27","isSplitUp":null,"splitCount":1,"buyerCancelReason":"","cancelBy":"","fmTn":null,"cancelReason":"","cancelTime":null,"escrowTax":null,"isActualShippingFeeConfirmed":null,"buyerCpfId":null,"orderFlag":"fulfilled_by_cb_seller","lmTn":null,"storeName":null,"storeAlias":null,"storeType":2,"storeCountry":null,"orderAddress":null,"items":[{"id":239201641,"itemId":10447763814,"ordersn":"2110186K4Y2P0G","itemName":"Sticker Laptop Lenovo Ideapad 5 Slim 3 Slim 5i IdeaPad 330s Ideapad 3 IdeaPad320 S 120s 330c Lenovo 7000 14 Inch Laptop Skin with Keyboard Cover Three Sides Laptop Protective Cover Anti-scratch Film Waterproof Removable Laptop Casing Full Cover","itemSku":"备注 14寸LX24,小新潮7000-14IKBR Lin","variationId":130346734555,"variationName":"001","variationSku":"J-376 备注 14寸LX24,小新潮7000-14IKBR Lin","images":null,"variationQuantityPurchased":1,"variationOriginalPrice":904.00000000,"variationDiscountedPrice":452.00000000,"isWholesale":false,"weight":0.30000000,"isAddOnDeal":false,"isMainItem":false,"addOnDealId":0,"promotionType":"","promotionId":0,"mainImage":"https://cf.shopee.ph/file/f3e1d3bc18e396be46b5f8e099ae2331","imageUrl":"https://cf.shopee.ph/file/5f8f25109ca4efd1e2f706210c25fee3_tn","sourceUrl":null,"purchaseDetail":null,"shopeeItemUrl":null}],"logistics":{"shippingCarrier":"Standard International","logisticId":null,"trackingNo":"PH2181957171129","serviceCode":"PV04","firstMileName":"Vinflair","lastMileName":"PHL2","goodsToDeclare":true,"zone":"","laneCode":"S-PH13","warehouseAddress":"Logistics Sorting Hub, Xi Niu Yi Street, Maiyuan Village, Changping Town, Dongguan City","warehouseId":"TWS01","cod":true,"recipientSortCode":null,"senderSortCode":null,"thirdPartyLogisticInfo":null,"buyerCpfId":null,"shopeeTrackingNo":"PH2181957171129","lmTn":""},"orderRemark":null,"orderLabels":null,"fwPackageId":158678,"fwPackageNo":"P2021102016434644849","packageNumber":null,"fmType":1,"fmNo":"78233848861262","fmLogisticName":null,"fmLogisticId":null,"fmStatus":0,"fmCreateTime":null,"crawlerNumber":"","crawlerFileUrl":"","localStatus":0,"isPrintDetailsList":null,"shopeeSellerUrl":null,"seaStatusDTO":null,"orderShopeeOrderPackageDTOS":null,"forwarderExpressPackages":null},"templateURL":"https://erp.emalacca.com/api/acc/print-tmp/shopee-print-v4.xml","signature":null}]}];//打印内容
    console.log(request.task);
    this.connect().then(() => {
      console.info(222222222);
      this.callback("open");
      this.socket.send(JSON.stringify(request));
    }).catch((e) => {
      console.info(33333333);
      this.callback("no open");
      // message.error("您还未安装或者未开启菜鸟打印组件（cainiao-x-print），请先安装或者开启");
    });
    /* let documents = new Array();
     for(let i=0;i<waybillArray.length;i++) {
         let doc = new Object();
         doc.documentID = waybillArray[i].documentID;
         let content = new Array();
         // let waybillJson = this.getWaybillJson(waybillArray[i]);
         let customAreaData = this.getCustomAreaData(waybillArray[i]);
         content.push(customAreaData);
         doc.contents = content;
         documents.push(doc);
     }
     request.task.documents=documents;*/
  },
  /***
   * 构造request对象
   */
  getRequestObject(cmd) {
    return {
      requestID: this.getUuid(8, 16),
      version: "1.0",
      cmd,
    };
  },
  //获取taskId
  getUuid(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },
  getCustomAreaData(waybillNO) {
    return {
      templateURL: waybillNO.contents[0].templateURL,
      data: waybillNO.contents[0].data,
    };
  },
  /***
   * 获取电子面单Json 数据
   * waybillNO 电子面单号
   */
  getWaybillJson(waybillNO) {
    //获取waybill对应的json object，此处的ajaxGet函数是伪代码
    let jsonObject = waybillNO[0];
    return jsonObject;
  },
};

export default printer;