import { CreateFormItemType } from '@/components/CreateFormItem';
import DictSelector from '@/components/Selectors/DictSelector';
import RegionSelector from '@/components/Selectors/RegionSelector';
import { WhetherBooleanOptions, WhetherOptions } from '@/constants';
import { Checkbox, Radio } from '@arco-design/web-react';

export const CreateEntrepotSchema: CreateFormItemType[] = [
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入仓库名称',
        },
      ],
    },
    schema: {
      field: 'entrepotName',
      label: '仓库名称',
    },
    control: 'input',
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
    schema: {
      field: 'inventoryStatus',
      label: '支持库存',
      span: 8,
    },
    control: (props: any) => (
      <Radio.Group {...props} options={WhetherOptions}></Radio.Group>
    ),
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
    schema: {
      field: 'entrepotType',
      label: '仓库类型',
      span: 8,
    },
    control: (props: any) => (
      <Radio.Group
        {...props}
        options={[
          {
            label: '国内',
            value: 0,
          },
          {
            label: '海外',
            value: 1,
          },
        ]}
      ></Radio.Group>
    ),
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
    schema: {
      field: 'storeType',
      label: '支持店铺',
      span: 8,
    },
    control: (props: any) => (
      <Checkbox.Group
        {...props}
        options={[
          {
            label: '跨境店',
            value: 0,
          },
          {
            label: '本土店',
            value: 1,
          },
        ]}
      ></Checkbox.Group>
    ),
  },
  {
    // 收货人
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择仓库类型',
        },
      ],
    },
    schema: {
      field: 'consignee',
      label: '收货人',
      span: 12,
    },
    control: 'input',
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入电话',
        },
      ],
    },
    schema: {
      field: 'phone',
      label: '电话',
      span: 12,
    },
    control: 'input',
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入收货地址',
        },
      ],
    },
    schema: {
      field: 'deliveryAddress',
      label: '收货地址',
    },
    control: <RegionSelector></RegionSelector>,
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入详细地址',
        },
      ],
    },
    schema: {
      field: 'detailedAddress',
      label: '详细地址',
    },
    control: 'input',
  },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请上传微信二维码',
        },
      ],
    },
    schema: {
      field: 'qrCode',
      label: '微信二维码',
    },
    control: 'upload',
    controlProps: {
      limit: 1,
    },
  },
  // {
  //   schema: {
  //     field: 'isStock',
  //     label: '支持仓储收费',
  //   },
  //   control: (props: any) => (
  //     <Radio.Group {...props} options={WhetherOptions}></Radio.Group>
  //   ),
  // },
  {
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择',
        },
      ],
    },
    schema: {
      field: 'openUser',
      label: '对用户开放',
    },
    control: (props: any) => (
      <Radio.Group {...props} options={WhetherOptions}></Radio.Group>
    ),
  },
];

export const CreateRacksSchema: CreateFormItemType[] = [
  {
    schema: {
      field: 'storageRacksName',
      label: '货架名称',
      required: true,
      span: 24,
    },
    control: 'input',
  },
  {
    schema: {
      field: 'available',
      label: '是否可用',
      span: 24,
      required: true,
    },
    control: <Radio.Group options={WhetherBooleanOptions} />,
  },
  {
    schema: {
      field: 'storageRacksType',
      label: '货架类型',
      span: 24,
      required: true,
    },
    control(props) {
      return (
        <DictSelector
          {...props}
          type="radio"
          dictCode="storage_racks_type"
        ></DictSelector>
      );
    },
  },
  {
    schema: {
      field: 'locationPrefix',
      label: '仓位前缀',
      required: true,
      span: 9,
    },
    control: 'input',
  },
  {
    schema: {
      field: 'numberFloors',
      label: '层',
      required: true,
      span: 7,
    },
    formItemProps: {
      labelCol: {
        style: {
          flex: '0 0 4em',
        },
      },
    },
    control: 'number',
  },
  {
    schema: {
      field: 'numberColumns',
      label: '列',
      required: true,
      span: 7,
    },
    formItemProps: {
      labelCol: {
        style: {
          flex: '0 0 4em',
        },
      },
    },
    control: 'number',
  },
];
