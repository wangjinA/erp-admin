import { roleAPI } from '@/api/admin/role';
import CreateWrap, { ActionsContext } from '@/components/CreateWrap';
import FilterForm from '@/components/FilterForm';
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants';
import { routes } from '@/routes';
import useLocale from '@/utils/useLocale';
import {
  Avatar,
  Button,
  Grid,
  List,
  Modal,
  Space,
  Tree,
  Typography,
} from '@arco-design/web-react';
import useForm from '@arco-design/web-react/es/Form/useForm';
import { IconDelete, IconPlus } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { useState } from 'react';

const Permission = () => {
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys);
  const locale = useLocale();
  const [formRef] = useForm();
  const { data: roles, loading: rolesLoading } = useRequest(() => {
    return roleAPI
      .get({
        pageNum: 1,
        pageSize: 10,
      })
      .then((r) => r.data.data.list);
  });
  return (
    <CreateWrap formRef={formRef} createRequest={roleAPI.create}>
      <ActionsContext.Consumer>
        {({ showType, setShowType, createAction }) => (
          <div className="bg-white p-4 pb-6">
            <Grid.Row gutter={[20, 0]}>
              <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
                <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    用户组
                  </Typography.Title>
                  <Button
                    icon={<IconPlus></IconPlus>}
                    type="primary"
                    size="small"
                    className="ml-auto"
                    loading={rolesLoading}
                    onClick={() => {
                      setShowType(ShowFormType.create);
                    }}
                  >
                    添加
                  </Button>
                </Typography.Paragraph>
                {/* <Input.Search
              className="mb-4"
              placeholder="请输入仓库名称"
            ></Input.Search> */}
                <List>
                  {roles?.map((item) => (
                    <List.Item.Meta
                      style={{ height: 76 }}
                      className="hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3"
                      key={item.id}
                      avatar={<Avatar>仓</Avatar>}
                      title={item.roleName}
                      description="系统分组"
                    ></List.Item.Meta>
                  ))}
                </List>
              </Grid.Col>

              <Grid.Col span={9} className="border-r border-neutral-3 pr-4">
                <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    功能权限
                  </Typography.Title>
                </Typography.Paragraph>
                <Tree
                  checkable
                  checkedKeys={checkedKeys}
                  selectedKeys={selectedKeys}
                  expandedKeys={expandedKeys}
                  onSelect={(keys, extra) => {
                    console.log(keys, extra);
                    setSelectedKeys(keys);
                  }}
                  onCheck={(keys, extra) => {
                    console.log(keys, extra);
                    setCheckedKeys(keys);
                  }}
                  onExpand={(keys, extra) => {
                    console.log(keys, extra);
                    setExpandedKeys(keys);
                  }}
                  fieldNames={{
                    title: 'name',
                  }}
                  renderTitle={(data: any) => {
                    return locale[data.name];
                  }}
                  treeData={routes}
                ></Tree>
              </Grid.Col>
              <Grid.Col span={9} className="pr-6">
                <Typography.Paragraph className="flex items-baseline !mb-0 !mt-2">
                  <Typography.Title heading={6} className="mb-0">
                    货架列表
                  </Typography.Title>
                  <Space className="ml-auto" size="large">
                    <Button icon={<IconDelete></IconDelete>} size="small">
                      删除
                    </Button>
                  </Space>
                </Typography.Paragraph>
              </Grid.Col>
            </Grid.Row>
            <Modal
              {...FormModalCommonProps}
              confirmLoading={createAction?.loading}
              onCancel={() => {
                setShowType(null);
                formRef.resetFields();
              }}
              onOk={async () => {
                const formData = await formRef.validate();
                if (showType === ShowFormType.create) {
                  createAction.run(formData);
                } else {
                  // await updateEntrepot({
                  //   ...formData,
                  //   id: activeEntrepot.id,
                  // });
                }
              }}
              visible={!!showType}
              title={`${ShowFormTypeMap[showType]}用户组`}
            >
              <FilterForm
                // initialValues={createInitialValue}
                form={formRef}
                labelLength={8}
                span={24}
                formItemConfigList={[
                  {
                    schema: {
                      label: '用户组名称',
                      span: 12,
                      field: 'roleName',
                      required: true,
                    },
                    control: 'input',
                  },
                ]}
              ></FilterForm>
            </Modal>
          </div>
        )}
      </ActionsContext.Consumer>
    </CreateWrap>
  );
};

export default Permission;
