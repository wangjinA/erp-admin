// utils/printLabel.ts
import dayjs from 'dayjs'
import printJs from 'print-js'

import { OrderResponseItem } from '@/types/order'

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
                        <img width="200" src="data:image/png;base64,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"/> 
                       </td>
                    </tr>
                    <tr>
                        <td style="width: 200px; font-size: 14px;">
                            <div style="border-bottom: dashed 1px #000;"></div>
                            <div>订单编号：<span style="font-size: 16px;">2503228CDK8GUP</span></div>
                             <div>用户标识：373537</div>
                            <div>打单人员：${orderItem.userName}</div>
                            <div>尾程物流：${orderItem.shippingCarrier}</div>
                            <div>备&emsp;&emsp;注：</div>
                            <div>店铺名称：</div>
                            <div>打印时间：${dayjs().format('YYYY/MM/DD HH:mm:ss')}</div>
                            <div style="border-bottom: dashed 1px #000;"></div>
                        </td>
                    </tr>
                </table>
                <div style="text-align: center;margin-bottom: 10px">
                    <span style="text-align: center; margin-bottom: 10px;font-size: 16px;font-weight: bold">集运信息</span>
                    <span style="float: right;">共1件</span>
                </div>
                <table border="1" class="goodsList">
                    <tr>
                        <td style="width: 70px;font-weight: bold;">仓位</td>
                        <td style="width: 80px;font-weight: bold;">单号</td>
                        <td style="font-weight: bold;">规格</td>
                        <td style="font-weight: bold;">数量</td>
                    </tr>
                    
                     <tr>
                        <td>9801-01</td><td>SP20241215020034</td><td>新款多功能車門紅外線感應燈【1個裝】</td><td>1</td>
                    </tr>
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
  function printHandle() {
    const html = getPrintHtml({
      ...orderItem,
      userName: '凤凰物流总段',
    })
    printJs({ printable: html, type: 'raw-html', base64: false, targetStyles: ['*'] })
  }

  return {
    printHandle,
  }
}
