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
  Typography,
} from '@arco-design/web-react';
import { IconCheck, IconDelete, IconPlus } from '@arco-design/web-react/icon';

export default () => {
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
            >
              新增
            </Button>
          </Typography.Paragraph>
          <Input.Search
            className="mb-4"
            placeholder="请输入仓库名称"
          ></Input.Search>
          <List>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <List.Item.Meta
                style={{ height: 76 }}
                className="hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3"
                key={item}
                avatar={<Avatar>仓</Avatar>}
                title={'凤凰国际仓'}
                description="广东省,东莞市, 广东省东莞市东坑镇 寮边头桃源3巷1号、5楼501"
              ></List.Item.Meta>
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
            >
              新增
            </Button>
          </Typography.Paragraph>
          <Input.Search
            className="mb-4"
            placeholder="请输入仓位名称"
          ></Input.Search>
          <List size="small">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <List.Item.Meta
                style={{ height: 76 }}
                className="hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3"
                key={item}
                avatar={<Avatar>货</Avatar>}
                title="货架名称"
                description="货架编码：HJ00000706"
              ></List.Item.Meta>
            ))}
          </List>
        </Grid.Col>
        <Grid.Col span={14} className="pr-6">
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
