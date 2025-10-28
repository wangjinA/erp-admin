// utils/printLabel.ts
import dayjs from 'dayjs'
import printJs from 'print-js'
import { OrderResponseItem } from '@/types/order'
import { GlobalState } from '@/store'
import { useSelector } from 'react-redux'
import JsBarcode from 'jsbarcode'
import { entrepotAPI } from '@/api/admin/entrepot'
import { businessPrinter } from '@/utils/printer'
import { ShippingOrderPrintingTemplateEnum } from '@/constants/entrepot'
import { sum } from 'lodash'

export function textToBase64Barcode(text) {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    height: 60,
    displayValue: false
  });
  return canvas.toDataURL("image/png");
}

function getPrintHtml(orderItem: OrderResponseItem & {
  userName: string
}) {
  const html = `<!DOCTYPE html>
<html>
    <header>
        <style>
        @page{
            margin: 0.2cm;
        }
            table {width: 330px; margin-bottom: 10px; border-collapse: collapse;}
            table td {font-size: 12px;}
            table.goodsList {
                border-top: 1px solid #000;border-left: 1px solid #000;
            }
            table.goodsList td {
                border-bottom: 1px solid #000;border-right: 1px solid #000;
            }
        </style>
    </header>
    <body style="margin: 0px;">
        
    <div style="width: 350px; padding: 10px; ">
             <div style="min-height: 480px;border: 2px solid #000; padding: 0px 10px;">
                <h3 style="text-align: center;margin: 10px;">拣货单</h3>
                <div style="border-bottom: dashed 1px #000;"></div>
                <table >
                    <tr>
                      <td style="text-align: center;padding: 5px 0px 0px;">
                        <img width="200" src="${textToBase64Barcode(orderItem.shrimpOrderNo)}"/> 
                       </td>
                    </tr>
                    <tr>
                        <td style="width: 200px; font-size: 14px;">
                            <div style="border-bottom: dashed 1px #000;"></div>
                            <div>订单编号：<span style="font-size: 16px;">${orderItem.shrimpOrderNo}</span></div>
                             <div>用户标识：${orderItem.tenantryNo}</div>
                            <div>打单人员：${orderItem.userName}</div>
                            <div>尾程物流：${orderItem.orderPackageList?.[0]?.shippingCarrier || ''}</div>
                            <div>备&emsp;&emsp;注：</div>
                            <div>店铺名称：</div>
                            <div>打印时间：${dayjs().format('YYYY/MM/DD HH:mm:ss')}</div>
                            <div style="border-bottom: dashed 1px #000;"></div>
                        </td>
                    </tr>
                </table>
                <div style="text-align: center;margin-bottom: 10px">
                    <span style="text-align: center; margin-bottom: 10px;font-size: 16px;font-weight: bold">集运信息</span>
                    <span style="float: right;">共${sum(orderItem.orderProductVOList.map(o => o.quantity))}件</span>
                </div>
                <table border="1" class="goodsList">
                    <tr>
                        <td style="width: 70px;font-weight: bold;">仓位</td>
                        <td style="width: 80px;font-weight: bold;">单号</td>
                        <td style="font-weight: bold;">规格/SKU</td>
                        <td style="font-weight: bold;">数量</td>
                    </tr>
                    
                     ${orderItem.orderProductVOList.map(item => `
                        <tr>
                            <td>${item.freightSpaceName}</td>
                            <td>${orderItem.shrimpOrderNo}</td>
                            <td>
                              <div>${item.specificationName||item.logisticsProduct?.productName}</div>
                              <div>${item.logisticsProduct?.sku || item.sku}</div>
                            </td>
                            <td>${item.quantity}</td>
                        </tr>  
                      `)
    }
                </table>
             </div>   
             <p style="page-break-after: always"></p>
        </div>

    </body>
</html>
  `
  return html
}

/**
 * 打印文件
 */
export function usePrintHtml(orderItem: OrderResponseItem) {
  const { userInfo } = useSelector((state: GlobalState) => state)

  function printHandle() {
    const html = getPrintHtml({
      ...orderItem,
      userName: userInfo.userName,
    })
    printJs({ printable: html, type: 'raw-html', base64: false, targetStyles: ['*'] })
  }

  return {
    printHandle,
  }
}


/**
 * 打印出货单
 */
export async function printShippingWaybill(params: {
  orderItem: OrderResponseItem
  sendWarehouse: string;
}) {
  const { orderItem, sendWarehouse } = params
  const res = await entrepotAPI.getEntrepotParams(sendWarehouse).then(r => r.data.data);
  const templateData = {
    "printTemplate": "0", // 这个注意一下
    "watermark": res.shippingNoteWatermarking || '',
    "printJi": res.shippingOrderSet || '',
    "printMo": res.endOfShipment || '',
    "virtualNumber": res.shippingOrderVirtualNumber || '',
    "recipients": res.recipientName || '',
    "recipientsMobile": res.recipientPhone || '',
    "recipientsAddress": res.recipientAddress || '',
    "senderName": res.senderName || '',
    "senderMobile": res.senderPhone || '',
    "senderAddress": res.senderAddress || '',
    "warehouseId": sendWarehouse
  }
  // 0:圆通速运，1：二维码
  if (res.shippingOrderPrintingTemplate === ShippingOrderPrintingTemplateEnum.YUANTONG) {
    businessPrinter.printShippingNumber([orderItem], templateData);
  } else if (res.shippingOrderPrintingTemplate === ShippingOrderPrintingTemplateEnum.QR_CODE) {
    // 二维码打印
    templateData.printTemplate = '3';
    businessPrinter.printQrCodeShippingNumber([orderItem], templateData);
  } else if (res.shippingOrderPrintingTemplate === ShippingOrderPrintingTemplateEnum.BAR_CODE) {
    templateData.printTemplate = '4';
    // 条形码
    businessPrinter.printBarCodeShippingNumber([orderItem], templateData, orderItem.tenantryNo);
  } else {
    throw new Error("出货单打印模版不存在,请检查仓库设置！");
  }
}

// {
//     "printTemplate": "0",
//     "watermark": "東坑李總",
//     "printJi": "昊辰",
//     "printMo": "東坑李總",
//     "virtualNumber": "0923******",
//     "recipients": "凤凰",
//     "recipientsMobile": "09********",
//     "recipientsAddress": "桃園市大園區平安路",
//     "senderName": "凤凰",
//     "senderMobile": "09********",
//     "senderAddress": "桃園市大園區平安路",
//     "warehouseId": "740373822921904128"
// }