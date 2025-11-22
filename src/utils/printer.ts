import { OrderResponseItem } from "@/types/order";
import { Message, Modal } from "@arco-design/web-react";

interface ContentItem {
  data: Partial<{
    sy: string;
    headLogisticsSy: string;
    hhh: string;
    orderSn: string;
    checkOutTime: string;
    identifying: string;
    ji: string;
    mo: string;
    virtualNumber: string;
    recipients: string;
    recipientsMobile: string;
    recipientsAddress: string;
    senderName: string;
    senderMobile: string;
    senderAddress: string;
    url: string;
  }>;
  templateURL: string;
}

export interface WaybillInfo {
  documentID: string;
  contents: ContentItem[];
}

class PrinterClass {
  callback: (data: any) => void = () => { };
  socket: WebSocket = null
  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        resolve(null);
      } else {
        let socket = new WebSocket('ws://localhost:13528');
        let setPrinterConfig = this.getRequestObject("setPrinterConfig");
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
  }
  disconnect() {
    if (this.socket) {
      this.socket.onclose;
    }
  }
  async doPrint(waybillInfo: WaybillInfo, callback: (data: any) => void) {
    console.log("开始打印123");
    this.callback = callback;
    let request = this.getRequestObject("print");
    console.log("11111111111");
    request.task.taskID = this.getUuid(8, 10);//打印机任务ID，每个打印任务会分配不同的且唯一的ID
    request.task.preview = false;//是否预览.true为预览,false为打印
    request.task.previewType = "";//属性取值“pdf” or “image” 预览模式，是以pdf还是image方式预览，二选一，此属性不是必选，默认以pdf预览。
    request.task.firstDocumentNumber = 1;//task 起始 document 序号
    request.task.totalDocumentCount = 1;//task document 总数
    // request.task.printer = "Deli DL-730C(NEW)";//打印机名，如果为空，会使用默认打印机
    request.task.printer = "";//打印机名，如果为空，会使用默认打印机
    request.task.documents = waybillInfo;
    console.log(request.task);
    this.connect().then(() => {
      console.info(222222222);
      this.callback("open");
      this.socket.send(JSON.stringify(request));
    }).catch((e) => {
      console.info(33333333);
      this.callback("no open");
    });
  }
  /***
   * 构造request对象
   */
  getRequestObject(cmd): {
    requestID: string;
    version: string;
    cmd: string;
    printer: any
    task: any
  } {
    return {
      requestID: this.getUuid(8, 16),
      version: "1.0",
      cmd,
      printer: {},
      task: {}
    };
  }
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
  }
  getCustomAreaData(waybillNO) {
    return {
      templateURL: waybillNO.contents[0].templateURL,
      data: waybillNO.contents[0].data,
    };
  }
  /***
   * 获取电子面单Json 数据
   * waybillNO 电子面单号
   */
  getWaybillJson(waybillNO) {
    //获取waybill对应的json object，此处的ajaxGet函数是伪代码
    let jsonObject = waybillNO[0];
    return jsonObject;
  }
};


export const Printer = new PrinterClass();
const CaiNiaoConfigInfo = {
  links: {
    CN: {
      url: "https://item.taobao.com/item.htm?id=",
      componentDownloadUrl: "https://page.cainiao.com/waybill/cloud_printing/home.html",
    },
    // SHOPEE_TEMPLATE: {
    //   url: "http://file.yimaivip.com/file/shopee-print-v1.xml",
    // },
    TEMPLATEURL: {//菜鸟打印，打印模版
      // url: "http://file.yimaivip.com/file/",//库位打印（50x30）纯文字
      // seatCodeUrl: "https://cloudprint.cainiao.com/template/standard/746102/2",//库位打印（50x30）纯文字
      // seatBarCodeUrl: "https://cloudprint.cainiao.com/template/standard/745503/3",//仓位打印（100x100）条形码
      documentUrl: 'http://file.yimaivip.com/file/document-img-1.xml',
      documentUrlZpt: 'http://file.yimaivip.com/file/document-img-3.xml',// 快捷打印，宅配通
      // documentUrlCode: 'http://file.yimaivip.com/file/document-code.xml',// 取件码
      // shippingNumberUrl:'https://cloudprint.cainiao.com/template/standard/750629/14',//出货单打印模版（100x150）圆通速运
      shippingNumberUrl: 'https://suyunbao-1307397511.cos.ap-guangzhou.myqcloud.com/template/shipping_number.xml',//出货单打印模版（100x150）圆通速运
      shippingNumberQrcodeUrl: 'http://file.yimaivip.com/file/shipping_number_qrcode.xml',//出货单打印模版（100x150）二维码
      shippingNumberBarCodeUrl: 'https://suyunbao-1307397511.cos.ap-guangzhou.myqcloud.com/template/shipping_number_barcode.xml',//出货单打印模版（100x150）条形码
      shippingNumberBarCodeUrl02: 'https://suyunbao-1307397511.cos.ap-guangzhou.myqcloud.com/template/shipping_number_barcode_100x100.xml', // 出货单打印模版（100x100）条形码
      shippingNumberBarCodeUrl03: 'https://suyunbao-1307397511.cos.ap-guangzhou.myqcloud.com/template/shipping_number_barcode_80x60.xml', // 出货单打印模版（80x60）条形码
      customsClearanceUrl: 'https://suyunbao-1307397511.cos.ap-guangzhou.myqcloud.com/template/customs_clearance.xml',//清關模版（100x100）
    }
  },
};

const RetMsgType = {
  SUCCESS: 'SUCCESS', // 成功
  WARING: 'WARNING', // 警告
  ERROR: 'ERROR', // 错误
  INFO: 'INFO', // 信息
}

export const ShippingCarrierIndexOfMap = {
  // '线下7-ELEVEN': '线下711',
  // "线下新竹物流": "线下新竹",
  // "线下全家": "线下全家",
  // "OK Mart": "ok",
  // "萊爾富": "莱尔富",
  // "蝦皮店到店": "店到店",
  // "賣家宅配": "卖家宅配",
  // "全家": "全家",
  // "7-ELEVEN": "711",
  // "宅配通": "宅配通",
  // "黑貓宅急便": "黑猫",
  // "新竹物流": "新竹物流",
  // "嘉里快遞": "嘉里快递",
  // "店到家宅配": "店到家宅配",
  // "賣家宅配：大型/超重物品運送": "賣家宅配：大型/超重物品運送",

  '线下7-ELEVEN': 'x7E',
  "线下新竹物流": "xxz",
  "线下全家": "xqj",
  "OK Mart": "ok",
  "萊爾富": "lef",
  "蝦皮店到店": "ddd",
  "賣家宅配": "zp",
  "全家": "qj",
  "7-ELEVEN": "7E",
  "宅配通": "zpt",
  "黑貓宅急便": "hm",
  "新竹物流": "xz",
  "嘉里快遞": "jl",
  "店到家宅配": "dddzp",
  "賣家宅配：大型/超重物品運送": "zpdx",
  "蝦皮店到店 - 隔日到貨": "xpdddt",
  "蝦皮宅配": "xpzp",
  "店到家宅配 - 標準包裹": "ddjbz",
  "店到家宅配 - 大型包裹": "ddjdx",
}

let modalInstance = null;

class BusinessPrinter {
  // 打印出货单，圆通速运
  printShippingNumber(orders: OrderResponseItem[], templateData) {
    let orderList = orders.map(item => {
      const { transportType, tenantryNo, shrimpOrderNo } = item;
      const shippingCarrier = item.orderPackageList[0].shippingCarrier;
      let sy = Object.entries(ShippingCarrierIndexOfMap).find(([key, value]) => shippingCarrier.indexOf(key) != -1)?.[1];
      let order = {
        sy: sy,
        headLogisticsSy: transportType,//
        hhh: templateData.watermark ? templateData.watermark : '',//分站标识identifying
        orderSn: shrimpOrderNo,
        checkOutTime: "", // 待定
        identifying: tenantryNo + "  P13",
        ji: templateData.printJi,//集
        mo: templateData.printMo,//末
        virtualNumber: templateData.virtualNumber,//虚拟号码
        recipients: templateData.recipients,//收件人
        recipientsMobile: templateData.recipientsMobile,//收件人号码
        recipientsAddress: templateData.recipientsAddress,//收件人地址
        senderName: templateData.senderName,//寄件人
        senderMobile: templateData.senderMobile,//寄件人手机号
        senderAddress: templateData.senderAddress,//寄件人地址
      };
      return order;
    });
    let contents = [];
    let arr = {
      "documentID": "shippingNumber",
      "contents": [{
        "data": orderList[0],
        "templateURL": CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberUrl
      }]
    };
    contents.push(arr);
    return this.printOperation(contents);
  }
  // 打印出货单，二维码
  printQrCodeShippingNumber(orders: OrderResponseItem[], templateData) {
    let orderList = orders.map(item => {
      return {
        orderSn: item.shrimpOrderNo,
        hhh: templateData.watermark || '',//分站表示,
      }
    });
    let contents = [];
    let arr = {
      "documentID": "printShippingNumberQrcoder",
      "contents": [{
        "data": orderList[0],
        "templateURL": CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberQrcodeUrl
      }]
    };
    contents.push(arr);
    return this.printOperation(contents);
  }
  // 打印出货单，条形码
  printBarCodeShippingNumber(orders: OrderResponseItem[], templateData, invitationCodeVal) {
    let orderList = orders.map(item => {
      let shippingCarrierVal = 'xx';
      // if (item.shippingCarrier === '賣家宅配'
      //   || item.shippingCarrier === '賣家宅配：大型/超重物品運送'
      //   || item.shippingCarrier === '线下新竹物流'
      //   || item.shippingCarrier === '线下全家'
      //   || item.shippingCarrier === '线下7-ELEVEN'
      //   || (item.shopOrder && (item.shopOrder.shippingCarrier === '賣家宅配'
      //     || item.shopOrder.shippingCarrier === '賣家宅配：大型/超重物品運送'
      //     || item.shopOrder.shippingCarrier === '线下新竹物流'
      //     || item.shopOrder.shippingCarrier === '线下全家'
      //     || item.shopOrder.shippingCarrier === '线下7-ELEVEN'))) {
      //   shippingCarrierVal = 'xx';
      // }
      let order = {
        orderSn: item.shrimpOrderNo,
        hhh: templateData.watermark ? templateData.watermark : '',//分站表示,
        shippingCarrier: shippingCarrierVal, // 尾程物流
        invitationCode: invitationCodeVal || '',
        headLogistics: item.transportType || ''
      };
      return order;
    });
    let printUrl = CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberBarCodeUrl;
    if (templateData.printTemplate === '2') {
      printUrl = CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberBarCodeUrl;
    } else if (templateData.printTemplate === '3') {
      printUrl = CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberBarCodeUrl02;
    } else if (templateData.printTemplate === '4') {
      printUrl = CaiNiaoConfigInfo.links['TEMPLATEURL'].shippingNumberBarCodeUrl03;
    }
    const contents = [{
      "documentID": "printShippingNumberQrcoder",
      "contents": [{
        "data": orderList[0],
        "templateURL": printUrl
      }]
    }];
    return this.printOperation(contents);
  }
  //快捷打印（打印面单）
  // quickPrint(orderObj, loadingObj) {
  //   let order = { ...orderObj };
  //   let params = {
  //     shopPlatform: order.platform,
  //     orderSn: order.orderSn,
  //     packageNumber: order.packageNumber,
  //     fdrShopId: order.shopId,
  //     trackingNumber: order.trackingNumber,
  //     platformShopId: order.platformShopId,
  //     orderType: order.type,
  //     shopType: order.shopType,
  //     resultType: "1"
  //   };
  //   if (loadingObj) {
  //     loadingObj.state = true;
  //   }
  //   this.$api.order.getShippingDocumentPrintData(params).then(ret => {
  //     if (loadingObj) {
  //       loadingObj.state = false;
  //     }
  //     if (ret.data && ret.data.type == RetMsgType.SUCCESS) {
  //       let printDatas = ret.data.bean;
  //       let contents = [];
  //       let arr = {
  //         "documentID": printDatas.orderSn,
  //         "contents": [
  //           {
  //             "data": {
  //               "orderSn": printDatas.orderSn,
  //               "trackingNo": printDatas.data.trackingNo,
  //               "logistics": {
  //                 "logisticId": null,
  //                 "trackingNo": printDatas.data.trackingNo,
  //                 "serviceCode": printDatas.data.serviceCode,
  //                 "firstMileName": printDatas.data.firstMileName,
  //                 "lastMileName": printDatas.data.lastMileName,
  //                 "laneCode": printDatas.data.laneCode,
  //                 "goodsToDeclare": printDatas.data.goodsToDeclare,
  //                 "warehouseAddress": printDatas.data.warehouseAddress,
  //                 "warehouseId": printDatas.data.warehouseId,
  //               },
  //             },
  //             "templateURL": CaiNiaoConfigInfo.links['SHOPEE_TEMPLATE'].url
  //           }
  //         ]
  //       };
  //       contents.push(arr);
  //       //开始打印
  //       this.printOperation(contents);
  //     } else if (ret.data && ret.data.type == RetMsgType.WARING) {
  //       this.$message.warning(ret.data.message);
  //     }
  //   });
  // }
  async quickPrint2(order: OrderResponseItem, documentImgUrl: string, printTemplateURL: string) {
    return new Promise((resolve, reject) => {
      if (documentImgUrl) {
        const contents = [{
          "documentID": order.id + Math.random(),
          "contents": [
            {
              "data": {
                "url": documentImgUrl.replaceAll("&", "&amp;"),
              },
              "templateURL": printTemplateURL
            }
          ]
        }];
        Printer.doPrint(contents, (data) => {
          if (data == "no open") {
            Message.warning({
              content: `您还未安装或者未开启菜鸟官方打印组件，请先安装或者开启！`
            })
          } else if (data == 'failed') {
            reject('打印失败');
          } else if (data == 'open') {
            // if (loadingObj) {
            //   loadingObj.state = true;
            // }
          } else if (data == 'printed') {
            resolve(true);
          }
        });
        return;
      }
      reject('打印失败，面单信息为空');
    })
  }
  //打印操作
  printOperation(WaybillInfo: WaybillInfo) {
    return new Promise((resolve, reject) => {
      Printer.doPrint(WaybillInfo, (data) => {
        if (['no open', 'failed'].includes(data)) {
          const message = data === 'no open' ? '打印失败，未安装或者未开启菜鸟官方打印组件' : '打印失败，请检查打印机是否连接正常';
          this.printProcessing(message);
          reject(new Error(message));
        }
        resolve(data);
      });
    });
  }
  printProcessing(content) {
    if (modalInstance) {
      return;
    }
    modalInstance = Modal.confirm({
      title: '提示',
      content: content,
      okText: '去下载',
      cancelText: '去开启',
      onCancel: () => {
        modalInstance = null;
      },
      onOk: () => {
        window.open(CaiNiaoConfigInfo.links['CN'].componentDownloadUrl, '_blank');
        modalInstance = null;
      }
    });
  }
}

export const businessPrinter = new BusinessPrinter();


// 快捷打印
export function quickPrint(order: OrderResponseItem) {
  const documentUrl = order.orderPackageList[0]?.documentImgUrl
  if (documentUrl) {
    // 默认模版
    let printTemplateURL = CaiNiaoConfigInfo.links['TEMPLATEURL'].documentUrl;
    // 宅配通另外模版
    if (order.shippingCarrier === '宅配通') {
      printTemplateURL = CaiNiaoConfigInfo.links['TEMPLATEURL'].documentUrlZpt;
    }
    businessPrinter.quickPrint2(order, documentUrl, printTemplateURL);
    return;
  }
  Message.error('该订单未生成面单！')
  // let params = {
  //   shopPlatform: order.platform,
  //   orderSn: order.orderSn,
  //   packageNumber: order.packageNumber,
  //   fdrShopId: order.shopId,
  //   trackingNumber: order.trackingNumber,
  //   platformShopId: order.platformShopId,
  //   orderType: order.type,
  //   shopType: order.shopType,
  //   resultType: "1"
  // };
  // loadingObj.state = true;
  // this.$api.order.getShippingDocumentPrintData(params).then(ret => {
  //   loadingObj.state = false;
  //   if (ret.data && ret.data.type == RetMsgType.SUCCESS) {
  //     let printDatas = ret.data.bean;
  //     this.doPrintOrder = doPrintOrder;
  //     let contents = [];
  //     let arr = {
  //       "documentID": printDatas.orderSn,
  //       "contents": [
  //         {
  //           "data": {
  //             "orderSn": printDatas.orderSn,
  //             "trackingNo": printDatas.data.trackingNo,
  //             "logistics": {
  //               "logisticId": null,
  //               "trackingNo": printDatas.data.trackingNo,
  //               "serviceCode": printDatas.data.serviceCode,
  //               "firstMileName": printDatas.data.firstMileName,
  //               "lastMileName": printDatas.data.lastMileName,
  //               "laneCode": printDatas.data.laneCode,
  //               "goodsToDeclare": printDatas.data.goodsToDeclare,
  //               "warehouseAddress": printDatas.data.warehouseAddress,
  //               "warehouseId": printDatas.data.warehouseId,
  //             },
  //           },
  //           "templateURL": CaiNiaoConfigInfo.links['SHOPEE_TEMPLATE'].url
  //         }
  //       ]
  //     };
  //     contents.push(arr);
  //     //开始打印
  //     this.doPrintOrder.doPrint(contents, (data) => {
  //       // console.log("打印回调数据:",data);
  //       if (data == "no open") {
  //         let content = '您还未安装或者未开启菜鸟官方打印组件，请先安装或者开启！';
  //         this.printProcessing(content);
  //       }
  //       loadingObj.state = false;
  //       //打印成功后，更新状态
  //       this.updatePrintStatus(order.orderSn);
  //     });
  //   } else if (ret.data && ret.data.type == RetMsgType.WARING) {
  //     this.$message.warning(ret.data.message);
  //     loadingObj.state = false;
  //   } else {
  //     loadingObj.state = false;
  //   }
  // });
  //打印成功后，更新状态
  // this.updatePrintStatus(order.orderSn);
}