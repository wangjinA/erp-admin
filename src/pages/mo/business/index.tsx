import React, { useState } from 'react';
import { exportToExcel, getExcleData } from '@/utils';
import {
  Button,
  Form,
  Upload,
  InputNumber,
  Modal,
  Input,
  Message,
} from '@arco-design/web-react';
import { groupBy, uniqBy } from 'lodash';
import { useLocalStorageState, useSessionStorageState } from 'ahooks';

const tr1 = `1.商品圖檔：檔名必須以對應之商品編碼來命名。
2.商品品名：由品牌+賣點+特色關鍵字構成，字數不可超過五十個字。*品名禁止有相關文案如：活動名稱、活動日期、贈送××商品、代言、熱銷、與商品認知模糊之說明…等字。
3.商品名稱的品牌:由系統自動帶入(網路)品牌名稱，僅選擇99999999999999999其他品牌時，需要填寫。
4.商品圖檔命名(範例) : 主圖、專推圖與廣告圖
  (1)主圖：一個商品最多6張主圖，上傳方式區分為自動壓縮。
     自動壓縮：上傳後系統自動產生中圖及小圖，一律以B圖自動壓縮
     B圖為正方型圖檔1000*1000(100K~1000K)
     B圖圖檔命名規則：10001_B1.jpg,10001_B2.jpg,10001_B3.jpg,10001_B4.jpg,10001_B5.jpg,10001_B6.jpg
  (2)廣告圖：一個商品最多只會有一張廣告圖，廣告圖檔命名規則：10001_O.jpg (若命名錯誤將視為「未上傳外部廣告圖」)
  (3)專推圖：一個商品可有20張專推圖，圖檔命名規則：10001_m_1_1.jpg,,10001_m_1_2.jpg ...
     (至少上傳一張專推圖)
  (4)檢驗報告書圖：一個商品可至多上傳兩張檢驗報告書圖，檢驗報告書圖檔命名規則：10001_INSP1.jpg 及 10001_INSP2.jpg
      圖檔需長寬300px~1000px；大小500KB以內。
  (5)規格圖：一個規格可以上傳一張規格圖，規格圖圖檔命名規則：規格1 10001_01_001_B.jpg、10001_01_002_B.jpg   規格2  10001_02_001_B.jpg、10001_02_002_B.jpg
      圖檔需長寬1000*1000 (200K~1000K以內)
 (6)認証圖：一個商品最多只會有一張認証圖，認証圖檔命名規則：10001_PCERT.jpg 
5.商品圖檔上傳必須壓縮為ZIP檔案，且ZIP檔內不可有資料夾
6.商品請填寫完整外箱材積
7.單位說明：cm=公分、kg=公斤、100公克=0.1公斤
8.重複置入商店分類，請依照商品分類置入，置入多個商店分類，請使用Alt+Enter分行做為系統判別。
9.詳細介紹內文-商品影音，置入多個youtube id，請使用Alt+Enter分行做為系統判別。`;

const acHeaders = [
  '產品名稱',
  '長描述',
  '短描述',
  '產品來源鏈接',
  '變種名稱 1',
  '變種選項 1',
  '變種名稱 2',
  '變種選項 2',
  '變種名稱 3',
  '變種選項 3',
  '價格',
  '促銷價',
  '貨幣單位',
  '庫存',
  'SKU',
  '包裝重量',
  '包裝長度',
  '包裝寬度',
  '包裝高度',
  '產品圖 1',
  '產品圖 2',
  '產品圖 3',
  '產品圖 4',
  '產品圖 5',
  '產品圖 6',
  '產品圖 7',
  '產品圖 8',
  '產品圖 9',
  '變種圖 1',
];

const headers1 = [tr1];

const headers2 = [''];

const headers3 = [
  `商品編碼
(須從 10001開始填寫)`,
  `品牌
(僅選擇其他品牌時需填寫)`,
  '品名',
  `特色
關鍵字`,
  '商品分類(請至系統[B207]一般商品大量上架編碼對照表下載查詢)',
  '商店分類(請至系統[B207]一般商品大量上架編碼對照表下載查詢)',
  '(網路)品牌編號(請至系統[B207]一般商品大量上架編碼對照表下載查詢)',
  '品牌系列編號(請至系統[B207]一般商品大量上架編碼對照表下載查詢)',
  '台幣售價',
  '市價',
  `商品來源
(01原廠  02經銷商  03平行輸入)
若為平行輸入則每筆商品需上傳至少一張憑證圖檔，圖檔命名原則為
(以第一筆為例)
10001_1_1.jpg,10001_1_2.jpg…以此類推。`,
  `配送溫層
(常溫、冷凍、冷藏)`,
  '配送方式：超商取貨7-11(有/無)',
  '配送方式：一般宅配(有/無)',
  '配送方式：第三方物流(有/無)',
  `產地
編號
(請至系統[B207]一般商品大量上架編碼對照表下載查詢)`,

  `寬cm
公分`,
  `長cm
公分`,
  `高cm
公分`,
  `重量kg
公斤`,

  '有/無',
  `保固天數
(1年=365天，永久保固請輸入99999)`,
  '保固說明',
  '生效起日',
  '生效訖日',
  `規格1代碼
(請至系統[B207]一般商品大量上架編碼對照表下載查詢)`,
  `規格2代碼
(請至系統[B207]一般商品大量上架編碼對照表下載查詢)`,
  '詳細規格1',
  '詳細規格2',
  '規格1圖片',
  `商品
原廠編號`,
  '國際條碼',
  '庫存量',
  '配件',
  `是否含安裝
(不是大型家電填否即可)`,
  '回收項目',
  `出貨/回收地代碼
(請至系統[B207]一般商品大量上架編碼對照表下載查詢)`,
  `商品規格
(食品、保健、乙類成藥、醫療器材類別商品
請至隔頁工作表複製文案內容)`,
  '商檢字號/NCC字號/能源效率分級',
  '環境用藥許可證字號/廠商名稱/環境用藥販賣業許可證',
  `商品特色標語
(限字數15字內)`,
  '商品特色內文',
  '詳細介紹內文',
  `詳細介紹內文-商品影音youtube id
範例:
http://www.youtube.com/WKSKKKKK123
(請輸入紅色字體的參數即可11字元)`,
  `是否為免稅
(是/否/空白)`,
  `是否為廢四機回收
(是/否/空白)`,
  `是否為有政府補助
(是/否/空白)`,
  `是否為約定送貨
(是/否/空白)`,
  `商品影片
請輸入影片連結的youtube id
範例:
http://www.youtube.com/WKSKKKKK123
(請輸入紅色字體的參數即可11字元，只能置入1個)`,
  '商品主圖網址',
  '商品規格圖網址',
];

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
  };
}

const userInfos = [
  {
    name: 'mo123',
    psd: 'mo123',
  },
  {
    name: 'admin',
    psd: 'admin123',
  },
  {
    name: 'yunyi168',
    psd: 'yunyi168',
  },
];

function Business() {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [userInfo, setUserInfo] = useSessionStorageState('mo-user-info', {
    defaultValue: {
      name: '',
      psd: '',
    },
  });
  const [localForm, setLocalForm] = useLocalStorageState('mo-form-data', {
    defaultValue: {
      prieceShouJia: 12,
      prieceShiJia: 14,
    },
  });
  const [visible, setVisible] = useState(false);
  async function submit() {
    const { files } = await form.validate();
    const file = files[0].originFile;
    const fileName = file.name;
    const newName = fileName.split('.')[0] + '_new';

    const list = [headers1, headers2, headers3];
    const excelData = await getExcleData(file);
    const excelDataFilter = excelData
      .slice(1)
      .filter((olist) => olist.some(Boolean));
    const groupData = groupBy(excelDataFilter, (e) => e[0]);
    const formData = await form.validate();
    setLocalForm({
      prieceShouJia: formData.prieceShouJia,
      prieceShiJia: formData.prieceShiJia,
    });
    Object.entries(groupData).forEach(([key, lists], index) => {
      try {
        const uniqList = uniqBy(
          lists,
          (olist) => `${olist[5] || ''}${olist[7] || ''}`
        );
        list.push(
          ...uniqList.map((olist) => [
            10000 + index + 1,
            '',
            olist[0],
            '',
            '2600700012', // 注意！
            '',
            '99999999999999999',
            '',
            Math.ceil(olist[11] * formData.prieceShouJia), // 售价
            Math.ceil(olist[11] * formData.prieceShiJia), // 市价
            '',
            // 常溫	無	有	無
            `常溫`,
            '無',
            '有',
            '無',
            '',
            200,
            200,
            200,
            20,
            '有',
            7,
            '',
            '',
            '',
            '',
            '',
            olist[5],
            olist[7] || '',
            '',
            `国内${olist[11]}`.split('.')[0],
            '',
            olist[13] || 0,
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
            `是`,
            '',
            [olist[19], olist[20], olist[21], olist[22], olist[23], olist[24]]
              .filter(Boolean)
              .join('\n'),
            olist[28],
          ])
        );
      } catch (error) {
        console.error(error);
      }
    });
    console.log(list);
    exportToExcel(list, newName);
    Message.success('转换成功！');
  }
  return (
    <div
      className="p-4"
      style={{
        background: 'var(--color-menu-light-bg)',
      }}
    >
      <div className="w-1/2 ml-[100px] py-10">
        <Form form={form} initialValues={localForm}>
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
          <Form.Item
            rules={[
              {
                required: true,
                message: '请输入售价倍数',
              },
            ]}
            label="售价倍数"
            field="prieceShouJia"
          >
            <InputNumber placeholder="请输入" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '请输入市价倍数',
              },
            ]}
            label="市价倍数"
            field="prieceShiJia"
          >
            <InputNumber placeholder="请输入" />
          </Form.Item>
          <Form.Item label=" " field="">
            <Button
              type="primary"
              status="success"
              className="mt-4"
              onClick={() => {
                if (userInfo.name === '' || userInfo.psd === '') {
                  setVisible(true);
                } else {
                  submit();
                }
              }}
            >
              转换
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="登录"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onConfirm={async () => {
          const data = await loginForm.validate();
          if (data.name === '' || data.psd === '') {
            return;
          }
          if (
            userInfos.some((i) => i.name === data.name && i.psd === data.psd)
          ) {
            setUserInfo(data);
            setVisible(false);
            Message.success({
              content: '登录成功！',
            });
          } else {
            Modal.error({
              title: '登录失败',
              content: '用户名或密码错误',
            });
          }
        }}
      >
        <Form form={loginForm}>
          <Form.Item
            label="用户名"
            field="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            field="psd"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Business;
