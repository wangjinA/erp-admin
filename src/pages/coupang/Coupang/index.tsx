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
  Space,
  Typography,
  Select,
} from '@arco-design/web-react';
import { useLocalStorageState, useSessionStorageState } from 'ahooks';

const { Title, Text } = Typography;
const { Option } = Select;

// 用户验证信息
const userInfos = [
  { name: 'mo123', psd: 'mo123' },
  { name: 'admin', psd: 'admin123' },
  { name: 'yunyi168', psd: 'yunyi168' },
];

// 运费选项
const shippingFeeOptions = [
  { label: '運費 (0-60cm): $65', value: '運費 (0-60cm): $65' },
  { label: '運費 (61-90cm): $70', value: '運費 (61-90cm): $70' },
  { label: '運費 (91-120cm): $90', value: '運費 (91-120cm): $90' },
  { label: '運費 (121-140cm): $105', value: '運費 (121-140cm): $105' },
  { label: '運費 (141-160cm): $135', value: '運費 (141-160cm): $135' },
  { label: '運費 (161-180cm): $180', value: '運費 (161-180cm): $180' },
  { label: '運費 (181-200cm): $285', value: '運費 (181-200cm): $285' },
  { label: '運費 (201-240cm): $365', value: '運費 (201-240cm): $365' },
];



// Coupang表头定义 - 第一行（分组标题）
const coupangHeaderRow1 = [
  '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', '商品基本資訊', // 9列
  '選項', '選項', '選項', '選項', '選項', '選項', '選項', '選項', '選項', '選項', '選項', '選項', // 12列
  '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', // 8列 (1-4)
  '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', // 12列 (5-10)
  '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', // 10列 (11-15)
  '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', '搜尋篩選', // 10列 (16-20)
  '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', // 12列
  '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', '結構資訊', // 16列
  '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', '商品資訊', // 15列
  '商品圖片', '商品圖片', '商品圖片', '商品圖片', '商品圖片', '商品圖片', // 6列
  '詳細說明', // 1列
];

// Coupang表头定义 - 第二行（字段名）
const coupangHeaderRow2 = [
  '品類', '商品名稱', '銷售期間(起)', '銷售期間(迄)', 'Offer condition', '狀態說明', '品牌', '製造商', '關鍵字',
  '選項名稱 1', '選項值 1', '選項名稱 2', '選項值 2', '選項名稱 3', '選項值 3', '選項名稱 4', '選項值 4', '選項名稱 5', '選項值 5', '選項名稱 6', '選項值 6',
  '篩選條件 1', '篩選值 1', '篩選條件 2', '篩選值 2', '篩選條件 3', '篩選值 3', '篩選條件 4', '篩選值 4',
  'Unexposed attribute 5', 'Unexposed value 5', 'Unexposed attribute 6', 'Unexposed value 6', 'Unexposed attribute 7', 'Unexposed value 7', 'Unexposed attribute 8', 'Unexposed value 8', 'Unexposed attribute 9', 'Unexposed value 9', 'Unexposed attribute 10', 'Unexposed value 10',
  '選項類型11', '選項值11', '選項類型12', '選項值12', '選項類型13', '選項值13', '選項類型14', '選項值14', '選項類型15', '選項值15',
  '選項類型16', '選項值16', '選項類型17', '選項值17', '選項類型18', '選項值18', '選項類型19', '選項值19', '選項類型20', '選項值20',
  '售價', '代售手續費', '原價', '庫存數量', '出貨準備時間', '運費', '購買上限(數量)', '購買上限(天)', '限制級商品', '營業稅', '是否平行進口', '海外代購商品',
  '賣家商品編號', '型號', '條碼', 'Certification code name', 'Certification code number',
  '認證∙行動通訊預先承諾書或認證代理商證書', '認證∙銷售商預先承諾認證標誌或行動通訊公司代理商認證標誌', '認證∙申報等資訊類型', '認證∙申報等資訊價值',
  '認證∙行動通訊預先承諾書或認證代理商證書', '認證∙銷售商預先承諾認證標誌或行動通訊公司代理商認證標誌', '認證∙申報等資訊類型', '認證∙申報等資訊價值',
  '認證∙行動通訊預先承諾書或認證代理商證書', '認證∙銷售商預先承諾認證標誌或行動通訊公司代理商認證標誌',
  '訂單補充訊息', '類別',
  '欄位 1', '欄位 2', '欄位 3', '欄位 4', '欄位 5', '欄位 6', '欄位 7', '欄位 8', '欄位 9', '欄位 10', '欄位 11', '欄位 12', '欄位 13', '欄位 14',
  '代表圖片', '主要圖片（矩形）', '其他圖片', '狀態圖片（二手商品）', '重複圖片', '圖片質量',
  '詳細說明',
];

// Coupang表头定义 - 第三行（必填说明）
const coupangHeaderRow3 = [
  '必填', '必填', '選填', '選填', 'Optional', 'Optional', '必填', '必填', '選填',
  '必填', '必填', '必填', '必填', '選填/必填', '選填/必填', '選填/必填', '選填/必填', '選填/必填', '選填/必填', '選填/必填', '選填/必填',
  '選填', '選填', '選填', '選填', '選填', '選填', '選填', '選填',
  'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional',
  'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional',
  'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional', 'Optional',
  '必填', '必須選擇', '必填', '必填', '必填', '必填', '選填', '選填', '選填', '選擇(預設值)', '選擇(預設值)', '選擇(預設值)',
  '選填', '選填', '選填', 'Optional', 'Optional',
  'Optional', 'Optional', 'Optional', 'Optional',
  'Optional', 'Optional', 'Optional', 'Optional',
  'Optional', 'Optional',
  'Optional', '必填',
  '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填', '必填',
  '必填', '選擇', '選擇', '選擇', '', '',
  '必填',
];
const coupangHeaderRow4 = coupangHeaderRow1.map(() => '');
function Coupang() {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [userInfo, setUserInfo] = useSessionStorageState('coupang-user-info', {
    defaultValue: { name: '', psd: '' },
  });
  const [localForm, setLocalForm] = useLocalStorageState('coupang-form-data', {
    defaultValue: {
      shippingFee: shippingFeeOptions[0].value,
      preparationDays: 7,
      stockQuantity: 200,
      prieceShouJia: 12, // 售价倍数
      prieceShiJia: 14, // 市价倍数
    },
  });
  const [visible, setVisible] = useState(false);

  // 提交转换
  async function submit() {
    try {
      const formData = await form.validate();
      const file = formData.files[0].originFile;
      const fileName = file.name.split('.')[0];
      const newName = `${fileName}_coupang`;
      // 保存表单配置到本地存储
      setLocalForm({
        shippingFee: formData.shippingFee,
        preparationDays: formData.preparationDays,
        stockQuantity: formData.stockQuantity,
        prieceShouJia: formData.prieceShouJia,
        prieceShiJia: formData.prieceShiJia,
      });

      // 读取Excel数据
      const excelData = await getExcleData(file);
      // 过滤掉表头和空行
      const dataRows = excelData.slice(1).filter((row) => row.some(Boolean));

      // 转换数据 - 包含3行表头
      const convertedData = [coupangHeaderRow1, coupangHeaderRow2, coupangHeaderRow3, coupangHeaderRow4];

      dataRows.forEach((row) => {
        try {
          // 原表字段映射（根据表头顺序）
          const productName = row[0] || ''; // 产品名称
          const longDesc = row[1] || ''; // 长描述
          const shortDesc = row[2] || ''; // 短描述
          const sourceUrl = row[3] || ''; // 产品来源链接
          const variantName1 = `顏色
[必填]`
          row[4] || ''; // 变种名称1
          const variantValue1 = row[5] || ''; // 变种选项1
          const variantName2 = `尺寸
[必填]`
          const variantValue2 = row[7] || ''; // 变种选项2
          // const variantName3 = row[8] || ''; // 变种名称3
          // const variantValue3 = row[9] || ''; // 变种选项3
          const price = Number(row[10]) || 0; // 价格
          const promoPrice = Number(row[11]) || 0; // 促销价
          const currency = row[12] || 'CNY'; // 货币单位
          const stock = Number(row[13]) || formData.stockQuantity; // 库存
          const sku = row[14] || ''; // SKU
          // 包装信息 row[15-18]
          // 产品图片 row[19-27]
          const productImages = [
            row[19],
            row[20],
            row[21],
            row[22],
            row[23],
            row[24],
            row[25],
            row[26],
            row[27],
          ].filter(Boolean);
          // 变种图片 row[28-36]

          // 计算售价和原价（使用促销价作为售价，价格作为原价）
          const salePrice = Math.ceil((promoPrice || price) * formData.prieceShouJia);
          const originalPrice = Math.ceil(price * formData.prieceShiJia);

          // 构建其他图片字符串（除第一张外的所有图片）
          const otherImages = productImages.slice(1).join(',');

          // 构建详细说明
          const detailDescription = [longDesc, shortDesc, sourceUrl]
            .filter(Boolean)
            .join('\n\n');

          // 转换后的行数据（对齐新表头格式：107列）
          const convertedRow = [
            // 商品基本資訊 (9列)
            '[77968] 傢俱/傢飾>傢俱>學生/辦公傢俱>書桌>一般書桌', // 品類
            productName, // 商品名稱
            '', // 銷售期間(起)
            '', // 銷售期間(迄)
            '', // Offer condition
            '', // 狀態說明
            '無', // 品牌
            '', // 製造商
            '', // 關鍵字
            // 選項 (12列)
            variantName1 || '無', // 選項名稱 1
            variantValue1 || '無', // 選項值 1
            variantName2 || '無', // 選項名稱 2
            variantValue2 || '無', // 選項值 2
            '無',// variantName3, // 選項名稱 3
            '無',// variantValue3, // 選項值 3
            '無', // 選項名稱 4
            '無', // 選項值 4
            '無', // 選項名稱 5
            '無', // 選項值 5
            '無', // 選項名稱 6
            '無', // 選項值 6
            // 搜尋篩選 1-4 (8列)
            '', '', '', '', '', '', '', '',
            // Unexposed attribute 5-10 (12列)
            '', '', '', '', '', '', '', '', '', '', '', '',
            // 選項類型 11-15 (10列)
            '', '', '', '', '', '', '', '', '', '',
            // 選項類型 16-20 (10列)
            '', '', '', '', '', '', '', '', '', '',
            // 結構資訊 (12列)
            salePrice, // 售價
            '', // 代售手續費
            originalPrice, // 原價
            stock, // 庫存數量
            formData.preparationDays, // 出貨準備時間
            formData.shippingFee, // 運費
            '', // 購買上限(數量)
            '', // 購買上限(天)
            '', // 限制級商品
            '', // 營業稅
            '', // 是否平行進口
            '', // 海外代購商品
            // 結構資訊续 (16列)
            sku, // 賣家商品編號
            '', // 型號
            '', // 條碼
            '', // Certification code name
            '', // Certification code number
            '', // 認證1
            '', // 認證1
            '', // 認證1
            '', // 認證1
            '', // 認證2
            '', // 認證2
            '', // 認證2
            '', // 認證2
            '', // 認證3
            '', // 認證3
            '', // 訂單補充訊息
            // 商品資訊 (15列)
            'TW_General', // 類別
            '', // 欄位 1 - 國內製造商或負責商名稱
            '', // 欄位 2 - 原產地/國
            '', // 欄位 3 - 注意事項/備註欄
            '', // 欄位 4
            '', // 欄位 5
            '', // 欄位 6
            '', // 欄位 7
            '', // 欄位 8
            '', // 欄位 9
            '', // 欄位 10
            '', // 欄位 11
            '', // 欄位 12
            '', // 欄位 13
            '', // 欄位 14
            // 商品圖片 (6列)
            productImages[0] || '', // 代表圖片
            '', // 主要圖片（矩形）
            otherImages, // 其他圖片
            '', // 狀態圖片（二手商品）
            '', // 重複圖片
            '', // 圖片質量
            // 詳細說明 (1列)
            detailDescription, // 詳細說明
          ];
          const curCount = convertedData.filter(row => row[1] === productName).length;
          if (curCount < 200) {
            convertedData.push(convertedRow);
          }
        } catch (error) {
          console.error('转换行数据失败:', error);
        }
      });

      // 导出Excel (xls格式)
      exportToExcel(convertedData, newName, [], 'xls');
      Message.success(`转换成功！已生成 ${convertedData.length - 1} 条数据`);
    } catch (error) {
      console.error('转换失败:', error);
      Message.error('转换失败，请检查文件格式是否正确');
    }
  }

  // 处理登录
  const handleLogin = async () => {
    try {
      const data = await loginForm.validate();
      if (userInfos.some((i) => i.name === data.name && i.psd === data.psd)) {
        setUserInfo(data);
        setVisible(false);
        Message.success('登录成功！');
      } else {
        Modal.error({
          title: '登录失败',
          content: '用户名或密码错误',
        });
      }
    } catch (error) {
      // 验证失败
    }
  };

  return (
    <div
      className="p-4 bg-white"
    >
      <div className="w-full max-w-3xl mx-auto">
        <Title heading={3} style={{ marginBottom: 24 }}>
          Coupang 数据转换工具
        </Title>
        <Form
          form={form}
          initialValues={localForm}
          layout="vertical"
          style={{
            background: 'var(--color-bg-2)',
            padding: 32,
            borderRadius: 8,
          }}
        >
          <Form.Item
            rules={[{ required: true, message: '请上传文件' }]}
            label="上传文件"
            field="files"
            extra="支持上传 .xlsx 或 .xls 格式的 Excel 文件"
          >
            <Upload
              limit={1}
              drag
              multiple={false}
              tip="点击或拖拽文件到此处上传"
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: '请选择运费' }]}
            label="运费"
            field="shippingFee"
            extra="根据商品尺寸选择对应的运费标准"
          >
            <Select placeholder="请选择运费" style={{ width: '100%' }}>
              {shippingFeeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: '请输入出货准备时间' },
              { type: 'number', min: 1, message: '出货准备时间至少为1天' },
            ]}
            label="出货准备时间"
            field="preparationDays"
            extra="单位：天"
          >
            <InputNumber
              placeholder="请输入出货准备时间"
              style={{ width: '100%' }}
              min={1}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: '请输入默认库存数量' },
              { type: 'number', min: 0, message: '库存数量不能为负数' },
            ]}
            label="默认库存数量"
            field="stockQuantity"
            extra="当原表中没有库存数据时使用此默认值"
          >
            <InputNumber
              placeholder="请输入默认库存数量"
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: '请输入售价倍数' },
              { type: 'number', min: 1, message: '售价倍数至少为1' },
            ]}
            label="售价倍数"
            field="prieceShouJia"
            extra="售价 = 原价格 × 售价倍数（向上取整）"
          >
            <InputNumber
              placeholder="请输入售价倍数"
              style={{ width: '100%' }}
              min={1}
            />
          </Form.Item>

          <Form.Item
            rules={[
              { required: true, message: '请输入市价倍数' },
              { type: 'number', min: 1, message: '市价倍数至少为1' },
            ]}
            label="市价倍数"
            field="prieceShiJia"
            extra="市价 = 原价格 × 市价倍数（向上取整）"
          >
            <InputNumber
              placeholder="请输入市价倍数"
              style={{ width: '100%' }}
              min={1}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  if (!userInfo.name || !userInfo.psd) {
                    setVisible(true);
                  } else {
                    submit();
                  }
                }}
              >
                开始转换
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>

      {/* 登录弹窗 */}
      <Modal
        title="用户验证"
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={handleLogin}
        autoFocus={false}
        focusLock={true}
      >
        <Form form={loginForm}>
          <Form.Item
            label="用户名"
            field="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            field="psd"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Coupang;
