import React, { useState } from 'react';
import { exportToExcel, getExcleData } from '@/utils';
import { Button, Form, Upload, Input } from '@arco-design/web-react';
import dayjs from 'dayjs';

const acHeaders = [
  'Id',
  'Title',
  'Raw_Title',
  'PicUrl',
  'Price',
  'ClassName',
  'CommentCount',
  'DetailUrl',
  'ShopName',
  'ShopLink',
  'CategoryId',
  'CategoryName',
  'RootCategoryId',
  'Name',
  'Area',
  'Platform',
  'ItemNumId',
  'SellCount',
  'LogisticsTime',
  'Quantity',
  'GroupProps',
  'CreateTime',
  'GroupCategoryId',
  'BetchId',
  'SkuJson',
  'ImageJson',
  'DescDescJson',
  'SkuViewModel',
  'GroupCategoryName',
  'LinkCommand',
  'SelectedCommand',
  'ImageInfos',
  'DeszImage',
  'EditCommand',
  'DescRemark',
  'SelectItemCount',
  'SortSellCount',
  'Checked',
  'CheckedCommand',
  'UnCheckedCommand',
];

const jlHeaders = [
  'ID',
  '標題',
  '說明',
  '起標價',
  '直購價',
  '底價',
  '販售方式',
  '數量',
  '天數',
  '新舊',
  '所在地',
  '圖片',
  '二手',
  '影片',
  '類別編號',
  '運費規定',
  '自訂分類',
  '分組',
  '賣家自用料號',
  '提前結束',
  '結束時間',
  '自動上架次數',
  '評價總分',
  '差勁評價',
  '棄標次數',
  '醒目標籤',
  '自訂規格',
  '備貨狀態',
  '型式認證碼',
  '商品編號',
  'PChomePay支付連現金',
  'Pi拍錢包X支付連',
  '全家取貨付款',
  '萊爾富取貨付款',
  '萊爾富純取貨',
  '露天7_11純取貨',
  '露天7_11取貨付款',
  '黑貓宅急便',
  '郵寄寄送',
  '宅配快遞',
  '低溫寄送',
  '離島寄送',
  '信用卡一次付清',
  '信用卡分期0利率',
  '信用卡3期',
  '信用卡6期',
  '信用卡12期',
  '銀行或郵局轉帳',
  '郵局無摺存款',
  '郵局快捷貨到付款',
  '貨到付款',
  '面交取貨',
  '面交取貨付款',
  '便利帶隔日配',
  'ｉ郵箱',
  '全家純取貨',
  '適用合併運費規則',
  '運費1',
  '運費2',
  '運費3',
  '運費4',
  '運費5',
  '運費6',
  '運費7',
  '運費8',
  '運費9',
  '運費10',
  '運費11',
  '運費12',
  '運費13',
  '運費14',
  '運費15',
  '帳號',
  '紀錄',
  '出價數',
  '點閱數',
  '追蹤數',
  '上下架時間',
  '網址',
  '選中',
  '狀態',
  '修改時間',
]

async function isToLuTian(file: File) {
  const excelData = await getExcleData(file);
  if (excelData[0].some((i) => ['起標價'].includes(i))) {
    return {
      toLutian: false,
      excelData,
    };
  }
  return {
    toLutian: true,
    excelData,
  }
}

function Business() {
  const [form] = Form.useForm();
  const [showPath, setShowPath] = useState(false);
  async function submit() {
    const { files, baseurl } = await form.validate();
    const file = files[0].originFile;
    console.log(file);
    const fileName = file.name;
    const newName = fileName.split('.')[0] + '_new';

    const list = [];
    const { excelData, toLutian } = await isToLuTian(file);
    if (!toLutian) {
      list.push(acHeaders);
      excelData.slice(1).filter(olist => olist.some(Boolean)).forEach((olist) => {
        const skuInfos = olist[26] ? JSON.parse(olist[26]) : [];
        const skus = skuInfos[1] ? Object.entries<{
          specId: string;
          specAttrs: string;
          price: string;
          saleCount: number;
          skuId: number;
          isPromotionSku: boolean;
          originalQty: string;
        }>(skuInfos[1]).slice(0, 30) : [];
        const imgs: string[] = olist[11].split('|').slice(0, 9);
        const htmlPath = olist[2];
        const title = olist[1].slice(0, 60);

        const skuJSON = JSON.stringify({
          SkuProps: [
            {
              "Name": "skuId",
              "DisplayName": "规格编号",
              "Pid": "skuId20200225",
              "PropValues": null,
              "ValueType": "System.String",
              "ColIndex": 0
            },
            {
              "Name": "quantity",
              "DisplayName": "库存",
              "Pid": "quantityd20200225",
              "PropValues": null,
              "ValueType": "System.Decimal",
              "ColIndex": 1
            },
            {
              "Name": "price",
              "DisplayName": "价格",
              "Pid": "price20200225",
              "PropValues": null,
              "ValueType": "System.Decimal",
              "ColIndex": 2
            },
            {
              Name: 'spec',
              DisplayName: '规格',
              Pid: 'spec20200225',
              PropValues: skus.map(([key, value], i) => ({
                GroupName: '规格',
                ImageInfo: null,
                Name: key.slice(0, 20),
                OriName: key.slice(0, 20),
                Vid: value.skuId || `20200225${i + 1}`,
                Pid: 'spec20200225',
              })),
              ValueType: 'Models.Common.SkuPropValue',
              ColIndex: 3,
            },
          ],
          SkuValues: skus.map(([, value], i) => ({
            skuId: value.skuId || `20200225${i + 1}`,
            quantity: value.originalQty ? Number(value.originalQty) : 0,
            price: value.price,
            spec: value.skuId || `20200225${i + 1}`,
          })),
        });

        list.push([
          olist[0],
          title,
          '',
          baseurl + imgs[0], // 待完善路径
          olist[4] || olist[3] || 0,
          '',
          '',
          '',
          'shopName',
          'shopLink',
          olist[14],
          '', // CategoryName
          '',
          title,
          olist[10] || '台北市',
          '',
          olist[29],
          0,
          '',
          olist[7] || 999,
          '',
          dayjs().format('YYYY/MM/DD HH:mm:ss'), // 2025/2/18 20:22:11
          '', // GroupCategoryId
          '',
          skuJSON, // SkuJson
          // \哪吒_pic\202533-14635110711.jpg;
          // id = 202533-14635110711
          JSON.stringify(
            imgs.map((img) => ({
              Id: img.split('\\').pop().split('.')[0],
              OriUri:
                '', // 待完善，不知道这个图片地址是否重要
              // "CreateTime": "2025-02-18T20:21:31.5482503+08:00",
              CreateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
              Name: 'ruten',
              Suffix: null,
              // "AbsolutePath": "E:\\pchrome\\Spiders\\RutenSpider\\spiderImages\\ruten\\20250218\\7823c06b-8fc5-46dc-aa9e-63a96c434875",
              AbsolutePath: baseurl + img, // 待完善全部路径
              RelativePath: baseurl + img,
            }))
          ),
          JSON.stringify({
            ImageUriList: [],
            DescHtml: {
              Id: htmlPath.split('-').pop().split('\\').pop().split('.')[0],
              OriUri:
                'https://www.ruten.com.tw/item/goods_comments.php?id=22432291491885&k=3912ff49&o=1723209788',
              // "CreateTime": "2025-02-18T20:21:54.1575203+08:00",
              CreateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
              Name: 'ruten_desc',
              Suffix: '.html',
              AbsolutePath: htmlPath, // 待完善全部路径
              RelativePath: htmlPath,
            },
          }),
          'PChrome.viewModels.SkuViewModel', // 'skuJSON ? PChrome.viewModels.SkuViewModel : null',
          '销售',
          'PChrome.ButtonClickCommand',
          'PChrome.ButtonClickCommand',
          'System.Collections.Generic.List`1[Models.Common.UriDescInfo]',
          'Models.Common.DescInfo',
          'PChrome.ButtonClickCommand',
          '',
          'System.Collections.Generic.List`1[System.Int32]',
          0,
          'True',
          'PChrome.ButtonClickCommand',
          'PChrome.ButtonClickCommand',
        ]);
      });
    } else {
      list.push(jlHeaders);
      excelData.slice(1).filter(olist => olist.some(Boolean)).forEach((olist) => {

        const imgsStr = olist[25]
        const imgs = (imgsStr ? JSON.parse(imgsStr) : []).map(oitem => {
          return oitem.AbsolutePath
        }).join('|');
        const targtSku = olist[24] ? JSON.parse(olist[24]) : null;
        let sku = ''
        if (targtSku) {
          //   .SkuValues.reduce((pre, cur) => {
          //     const target = .SkuProps[3].PropValues.find(o=>o.Vid === cur.skuId);
          //     return{
          //         ...pre,
          //         [target.Name]: {
          //             originalQty: cur.quantity,
          //             price: cur.price,
          //         }
          //     }
          //  ...pre,
          //  [cur.]   
          // ), {})
          const isSub = targtSku.SkuProps.length === 5
          if (isSub) {
            const skuProps = [];
            targtSku.SkuProps[3].PropValues.forEach(item => {
              targtSku.SkuProps[4].PropValues.forEach(oitem => {
                const skuValuesTarget = targtSku.SkuValues.find(k => k.spec === item.Vid && k.skuId === oitem.Vid);
                skuProps.push({
                  ...item,
                  Name: `${item.Name} ${oitem.Name}`,
                  Vid: item.Vid + oitem.Vid, // spec
                  price: skuValuesTarget?.price || 0,
                  quantity: skuValuesTarget?.quantity || 0,
                })
              })
            })
            skuProps.splice(30); // 保留30个
            sku = JSON.stringify([
              {
                "dataRows": [
                  {
                    "name": "规格",
                    "specValue": skuProps.map(item => ({
                      name: item.Name,
                      id: item.Vid
                    }))
                  },
                ],

              },
              skuProps.reduce((pre, cur) => {
                return {
                  ...pre,
                  [cur.Name]: {
                    originalQty: cur.quantity,
                    price: cur.price,
                  }
                }
              }, {})
            ])
          } else {
            sku = JSON.stringify([
              {
                "dataRows": [
                  {
                    "name": "规格",
                    "specValue": targtSku.SkuProps.at(-1).PropValues.map(item => ({
                      name: item.Name,
                      id: item.Vid
                    }))
                  }
                ]
              },
              targtSku.SkuValues.reduce((pre, cur) => {
                const target = targtSku.SkuProps.at(-1).PropValues.find(o => o.Vid === cur.skuId);
                return {
                  ...pre,
                  [target.Name]: {
                    originalQty: cur.quantity,
                    price: cur.price,
                  }
                }
              }, {})
            ])
          }
        }

        list.push([
          olist[0],
          olist[1],
          (olist[26] ? JSON.parse(olist[26]).DescHtml?.AbsolutePath : '') || '', // 说明 HTML
          olist[4],
          olist[4],
          0,
          '',
          olist[19],
          7,
          '全新',
          '新北市',
          imgs,
          '',
          '',
          olist[10],
          '买家自付',
          '',
          '',
          '',
          'FALSE',
          23,
          2,
          '',
          '',
          '',
          '',
          sku,
          '', // 備貨狀態
          '',
          '', // 商品编号
          'TRUE',
          'FALSE',
          'TRUE',
          'TRUE',
          'TRUE',
          'FALSE',
          'TRUE',
          'FALSE',
          'FALSE',
          'TRUE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'TRUE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          'FALSE',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '', // 账号
          '',
          '',
          '',
          '',
          '',
          '',
          'FALSE',
          '',
          '',
        ])
      })
    }
    console.log(list);
    exportToExcel(list, newName);
    setTimeout(() => {
      form.resetFields();
    }, 1000);
  }
  return (
    <div className="p-4" style={{
      background: 'var(--color-menu-light-bg)',
    }}>
      <div className="w-1/2 ml-[100px] py-10">
        <Form form={form} initialValues={{
          // baseurl: 'N:\\爱够不够采集\\精靈測試導出\\卡夫特'
        }}
          onChange={async (e) => {
            console.log(e);

            if (e.files) {
              const { toLutian } = await isToLuTian(e.files[0].originFile);
              setShowPath(!toLutian)
            } else {
              setShowPath(false)
            }
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: '请上传文件',
              },
            ]}
            label="上传文件"
            field="files"
          >
            <Upload limit={1} drag multiple={false}></Upload>
          </Form.Item>
          {showPath ? <Form.Item
            rules={[
              {
                required: true,
                message: '请输入文件路径',
              },
            ]}
            label="文件路径"
            field="baseurl"
          >
            <Input placeholder='请输入'></Input>
          </Form.Item> : null}
          <Form.Item label=" " field="">
            <Button
              type="primary"
              status="success"
              className="mt-4"
              onClick={() => {
                submit();
              }}
            >
              转换
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Business