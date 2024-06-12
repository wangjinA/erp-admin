import FilterForm from '@/components/FilterForm';
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants';
import {
  Avatar,
  Button,
  Grid,
  List,
  Modal,
  Space,
  Typography,
} from '@arco-design/web-react';
import { IconCheck, IconDelete, IconPlus } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import useInfo from './hooks';
import { CreateEntrepotSchema, CreateRacksSchema } from './schema';

const createInitialValue = {
  entrepotName: '测试111',
  entrepotType: 0,
  storeType: [0],
  consignee: '老吴头',
  phone: '15270848188',
  deliveryAddress: '省市区',
  detailedAddress: '详细地址哈哈哈',
  openUser: 1,
  inventoryStatus: 1,
  qrCode:
    'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2206469993218/O1CN01GgZIv21ZdtGVU5hF1_!!0-item_pic.jpg_.webp',
};

const createRacksInitialValue = {
  storageRacksName: '',
  available: '',
  entrepotName: '',
  locationPrefix: '',
  numberFloors: '5',
  numberColumns: '5',
};

export default () => {
  const {
    showTypeRacks,
    setShowTypeRacks,
    showTypeEntrepot,
    setShowTypeEntrepot,
    formEntrepotRef,
    formRacksRef,
    activeEntrepot,
    setActiveEntrepot,
    racksList,
    rackLoading,
    getRacksList,
    createEntrepotHandler,
    createEntrepotLoading,
    getEntrepotList,
    entrepotList,
    entrepotLoading,
    activeRacks,
    setActiveRacks,
    createRacksLoading,
    createRacksHandler,
  } = useInfo();

  return (
    <div className="bg-white p-4 pb-6">
      <Grid.Row gutter={[20, 0]}>
        <Grid.Col span={5} className="border-r border-neutral-3 pr-4">
          <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
            <Typography.Title heading={6} className="mb-0">
              仓库列表
            </Typography.Title>
            <Button
              icon={<IconPlus></IconPlus>}
              type="primary"
              size="small"
              className="ml-auto"
              onClick={() => {
                setShowTypeEntrepot(ShowFormType.create);
              }}
            >
              新增
            </Button>
          </Typography.Paragraph>
          {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓库名称"
          ></Input.Search> */}
          <List>
            {entrepotList?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveEntrepot(item);
                }}
              >
                <List.Item.Meta
                  style={{ height: 76 }}
                  className={classNames(
                    activeEntrepot?.id === item.id
                      ? 'bg-gray-100 dark:bg-zinc-500'
                      : '',
                    'hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3'
                  )}
                  avatar={<Avatar>{item.consignee[0]}</Avatar>}
                  title={item.entrepotName}
                  description={item.detailedAddress}
                ></List.Item.Meta>
              </div>
            ))}
          </List>
        </Grid.Col>

        <Grid.Col span={5} className="border-r border-neutral-3 pr-4">
          <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
            <Typography.Title heading={6} className="mb-0">
              货架列表
            </Typography.Title>
            <Button
              icon={<IconPlus></IconPlus>}
              type="primary"
              size="small"
              className="ml-auto"
              disabled={showTypeRacks === ShowFormType.create}
              onClick={() => {
                formRacksRef.resetFields();
                setShowTypeRacks(ShowFormType.create);
              }}
            >
              新增
            </Button>
          </Typography.Paragraph>
          {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓位名称"
          ></Input.Search> */}
          <List size="small">
            {racksList?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveRacks(item);
                  formRacksRef.setFieldsValue(item);
                }}
              >
                <List.Item.Meta
                  style={{ height: 76 }}
                  className={classNames(
                    activeRacks?.id === item.id
                      ? 'bg-gray-100 dark:bg-zinc-500'
                      : '',
                    'hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3'
                  )}
                  avatar={<Avatar>{item.locationPrefix}</Avatar>}
                  title={item.storageRacksName}
                  description={item.storageRacksCode}
                ></List.Item.Meta>
              </div>
            ))}
          </List>
        </Grid.Col>
        {showTypeRacks && (
          <Grid.Col span={14} className="pr-6">
            <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
              <Typography.Title heading={6} className="mb-0">
                {ShowFormTypeMap[showTypeRacks]}货架
              </Typography.Title>
              {showTypeRacks === ShowFormType.create && (
                <Space className="ml-auto" size="large">
                  <Button
                    icon={<IconPlus></IconPlus>}
                    type="primary"
                    status="success"
                    size="small"
                    loading={createRacksLoading}
                    onClick={async () => {
                      const formData = await formRacksRef.validate();
                      createRacksHandler(formData);
                    }}
                  >
                    新增
                  </Button>
                  <Button
                    icon={<IconDelete></IconDelete>}
                    loading={createRacksLoading}
                    size="small"
                    onClick={() => {
                      formRacksRef.setFieldsValue(activeEntrepot);
                      setShowTypeRacks(null);
                    }}
                  >
                    取消
                  </Button>
                </Space>
              )}
              {showTypeRacks === ShowFormType.edit && (
                <Space className="ml-auto" size="large">
                  <Button
                    icon={<IconCheck></IconCheck>}
                    type="primary"
                    size="small"
                  >
                    保存
                  </Button>
                  <Button
                    icon={<IconDelete></IconDelete>}
                    size="small"
                    status="danger"
                  >
                    删除
                  </Button>
                </Space>
              )}
            </Typography.Paragraph>
            <FilterForm
              initialValues={createRacksInitialValue}
              form={formRacksRef}
              labelLength={10}
              formItemConfigList={CreateRacksSchema}
            ></FilterForm>
          </Grid.Col>
        )}
      </Grid.Row>
      <Modal
        {...FormModalCommonProps}
        confirmLoading={createEntrepotLoading}
        onCancel={() => setShowTypeEntrepot(null)}
        onOk={async () => {
          const formData = await formEntrepotRef.validate();
          createEntrepotHandler(formData);
        }}
        visible={!!showTypeEntrepot}
        title={`${ShowFormTypeMap[showTypeEntrepot]}仓库`}
      >
        <FilterForm
          initialValues={createInitialValue}
          form={formEntrepotRef}
          labelLength={8}
          span={24}
          formItemConfigList={CreateEntrepotSchema}
        ></FilterForm>
      </Modal>
    </div>
  );
};
