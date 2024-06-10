import { routes } from '@/routes';
import useLocale from '@/utils/useLocale';
import {
  Avatar,
  Button,
  Divider,
  Form,
  Grid,
  Input,
  List,
  Radio,
  Space,
  Switch,
  Tree,
  Typography,
} from '@arco-design/web-react';
import { IconCheck, IconDelete, IconPlus } from '@arco-design/web-react/icon';
import { useState } from 'react';

export default () => {
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys);
  const locale = useLocale();

  return (
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
            >
              添加
            </Button>
          </Typography.Paragraph>
          {/* <Input.Search
            className="mb-4"
            placeholder="请输入仓库名称"
          ></Input.Search> */}
          <List>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <List.Item.Meta
                style={{ height: 76 }}
                className="hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3"
                key={item}
                avatar={<Avatar>仓</Avatar>}
                title="管理员"
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
              <Button
                icon={<IconCheck></IconCheck>}
                type="primary"
                status="success"
                size="small"
              >
                保存
              </Button>
              <Button icon={<IconDelete></IconDelete>} size="small">
                删除
              </Button>
            </Space>
          </Typography.Paragraph>
          <Form>
            <Form.Item label="货架名称">
              <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="是否可用">
              <Switch></Switch>
            </Form.Item>
            <Form.Item label="货架类型">
              <Radio.Group
                options={[
                  {
                    label: '库存架',
                    value: '库存架',
                  },
                  {
                    label: '快递架',
                    value: '快递架',
                  },
                  {
                    label: '问题架',
                    value: '问题架',
                  },
                  {
                    label: '退件架',
                    value: '退件架',
                  },
                ]}
              ></Radio.Group>
            </Form.Item>
            <Grid.Row>
              <Grid.Col span={3}></Grid.Col>
              <Grid.Col span={6}>
                <Form.Item
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  label="仓位前缀"
                >
                  <Input placeholder="请输入"></Input>
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  label="层"
                >
                  <Input placeholder="请输入"></Input>
                </Form.Item>
              </Grid.Col>
              <Grid.Col span={5}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  label="列"
                >
                  <Input placeholder="请输入"></Input>
                </Form.Item>
              </Grid.Col>
            </Grid.Row>
            <Divider></Divider>
          </Form>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
