import React from 'react';
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

export default () => {
  const [form] = Form.useForm();
  async function submit() {
    const { files, baseurl } = await form.validate();
    const file = files[0].originFile;
    console.log(file);
    const fileName = file.name;
    const newName = fileName.split('.')[0] + '_new';

    const res = await getExcleData(file);
    console.log(res);
    const list = [];
    if (res[0].some((i) => ['起標價'].includes(i))) {
      list.push(acHeaders);
      res.slice(1).filter(olist => olist.some(Boolean)).forEach((olist) => {
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
              RelativePath: baseurl+img,
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
    }
    console.log(list);
    exportToExcel(list, newName);
  }
  return (
    <div className="p-4" style={{
      background: 'var(--color-menu-light-bg)',
    }}>
      <div className="w-1/2 ml-[100px] py-10">
        <Form form={form} initialValues={{
          // baseurl: 'N:\\爱够不够采集\\精靈測試導出\\卡夫特'
        }}>
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
            <Upload drag></Upload>
          </Form.Item>
          <Form.Item
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
          </Form.Item>
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
