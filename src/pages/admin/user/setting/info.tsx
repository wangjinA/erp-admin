import React, { useContext } from 'react';
import useI18n from '@/utils/useI18n';
import locale from './locale';
import { GlobalContext } from '@/context';
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from '@arco-design/web-react';
import { useDispatch } from 'react-redux';

function InfoForm({ loading }: { loading?: boolean }) {
  const t = useI18n(locale);
  const [form] = Form.useForm();
  const { lang } = useContext(GlobalContext);

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      await form.validate();
      Message.success('userSetting.saveSuccess');
    } catch (_) {}
  };

  const handleCancel = () => {
    dispatch({
      type: 'editPassword',
      payload: {
        editPassword: false,
      },
    });
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill('100%'),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: '500px', marginTop: '6px' }}
      form={form}
      labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
      wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
    >
      <Form.Item label="原密码" field="email">
        {loading ? (
          loadingNode()
        ) : (
          <Input type="password1" placeholder="请输入" />
        )}
      </Form.Item>
      <Form.Item label="新密码" field="email">
        {loading ? (
          loadingNode()
        ) : (
          <Input type="password23" placeholder="请输入" />
        )}
      </Form.Item>
      <Form.Item label="确认密码" field="email">
        {loading ? (
          loadingNode()
        ) : (
          <Input type="password" placeholder="请输入" />
        )}
      </Form.Item>
      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            修改
          </Button>
          <Button onClick={handleCancel}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
