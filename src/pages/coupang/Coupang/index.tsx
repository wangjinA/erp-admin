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
} from '@arco-design/web-react';
import { useLocalStorageState, useSessionStorageState } from 'ahooks';

const { Title, Text } = Typography;

// 用户验证信息
const userInfos = [
  { name: 'mo123', psd: 'mo123' },
  { name: 'admin', psd: 'admin123' },
  { name: 'yunyi168', psd: 'yunyi168' },
];

// Coupang表头定义
const coupangHeaders = [
  '品類',
  '商品名稱',
  '銷售期間(起)',
  '銷售期間(迄)',
  '品牌',
  '製造商',
  '關鍵字',
  '選項名稱 1',
  '選項值 1',
  '選項名稱 2',
  '選項值 2',
  '選項名稱 3',
  '選項值 3',
  '選項名稱 4',
  '選項值 4',
  '篩選條件 1',
  '篩選值 1',
  '篩選條件 2',
  '篩選值 2',
  '篩選條件 3',
  '篩選值 3',
  '篩選條件 4',
  '篩選值 4',
  '售價',
  '原價',
  '庫存數量',
  '出貨準備時間',
  '運費',
  '購買上限(數量)',
  '購買上限(天)',
  '限制級商品',
  '營業稅',
  '賣家商品編號',
  '型號',
  '條碼',
  '類別',
  '欄位 1',
  '欄位 2',
  '欄位 3',
  '欄位 4',
  '欄位 5',
  '欄位 6',
  '欄位 7',
  '欄位 8',
  '欄位 9',
  '欄位 10',
  '欄位 11',
  '欄位 12',
  '欄位 13',
  '欄位 14',
  '代表圖片',
  '其他圖片',
  '詳細說明',
];

function Coupang() {
  const [form] = Form.useForm();
  const [loginForm] = Form.useForm();
  const [userInfo, setUserInfo] = useSessionStorageState('coupang-user-info', {
    defaultValue: { name: '', psd: '' },
  });
  const [localForm, setLocalForm] = useLocalStorageState('coupang-form-data', {
    defaultValue: {
      shippingFee: 65,
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

      // 转换数据
      const convertedData = [coupangHeaders];

      dataRows.forEach((row) => {
        try {
          // 原表字段映射（根据表头顺序）
          const productName = row[0] || ''; // 产品名称
          const longDesc = row[1] || ''; // 长描述
          const shortDesc = row[2] || ''; // 短描述
          const sourceUrl = row[3] || ''; // 产品来源链接
          const variantName1 = row[4] || ''; // 变种名称1
          const variantValue1 = row[5] || ''; // 变种选项1
          const variantName2 = row[6] || ''; // 变种名称2
          const variantValue2 = row[7] || ''; // 变种选项2
          const variantName3 = row[8] || ''; // 变种名称3
          const variantValue3 = row[9] || ''; // 变种选项3
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

          // 转换后的行数据
          const convertedRow = [
            '[64681] 家庭用品>生活百貨>其他家居用品>其他雜貨', // 品類
            productName, // 商品名稱
            '', // 銷售期間(起)
            '', // 銷售期間(迄)
            '無', // 品牌
            '', // 製造商
            '', // 關鍵字
            variantName1, // 選項名稱 1
            variantValue1, // 選項值 1
            variantName2, // 選項名稱 2
            variantValue2, // 選項值 2
            variantName3, // 選項名稱 3
            variantValue3, // 選項值 3
            '', // 選項名稱 4
            '', // 選項值 4
            '', // 篩選條件 1
            '', // 篩選值 1
            '', // 篩選條件 2
            '', // 篩選值 2
            '', // 篩選條件 3
            '', // 篩選值 3
            '', // 篩選條件 4
            '', // 篩選值 4
            salePrice, // 售價
            originalPrice, // 原價
            stock, // 庫存數量
            formData.preparationDays, // 出貨準備時間
            formData.shippingFee, // 運費
            '', // 購買上限(數量)
            '', // 購買上限(天)
            '', // 限制級商品
            '', // 營業稅
            sku, // 賣家商品編號
            '', // 型號
            '', // 條碼
            'TW_General', // 類別
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
            '', // 欄位 1-14
            productImages[0] || '', // 代表圖片
            otherImages, // 其他圖片
            detailDescription, // 詳細說明
          ];

          convertedData.push(convertedRow);
        } catch (error) {
          console.error('转换行数据失败:', error);
        }
      });

      // 导出Excel
      exportToExcel(convertedData, newName);
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
            rules={[
              { required: true, message: '请输入运费' },
              { type: 'number', min: 0, message: '运费不能为负数' },
            ]}
            label="运费"
            field="shippingFee"
            extra="单位：元"
          >
            <InputNumber
              placeholder="请输入运费"
              style={{ width: '100%' }}
              min={0}
            />
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
