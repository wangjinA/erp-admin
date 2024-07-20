import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
  Message,
  Image,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconSafe, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { useLocalStorageState, useRequest } from 'ahooks';
import { getCaptcha, login } from '@/api/user';
import { random } from 'lodash';
import { requestEndInfo, SuccessCode } from '@/api';
import { EndType, getEndType, getEndTypeName, LoginPathMap, toLoginPage } from '@/routes';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');
  const [value, setValue] = useLocalStorageState('userInfo');
  const [randomStr, setRandomStr] = useState(null);
  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  const {
    run: loginHandler,
    loading,
    data,
  } = useRequest(
    async (params) => {
      const res = await login(params);
      if (res.data.code === SuccessCode) {
        setValue(res.data.data);
        localStorage.setItem(requestEndInfo.tokenKey, res.data.data.token);
        localStorage.removeItem('scan-entrepot');
        afterLoginSuccess(params);
      } else {
        Message.error(res.data.msg || t['login.form.login.errMsg']);
      }
    },
    {
      manual: true,
    }
  );

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }

  // function loginHandler(params) {
  //   setErrorMessage('');
  //   setLoading(true);
  //   axios
  //     .post('/api/user/login', params)
  //     .then((res) => {
  //       const { status, msg } = res.data;
  //       if (status === 'ok') {
  //         afterLoginSuccess(params);
  //       } else {
  //         setErrorMessage(msg || t['login.form.login.errMsg']);
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      loginHandler(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {getEndTypeName()}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{
          userLoginAccount: 'admin',
          userLoginPassword: '123456',
        }}
      >
        <Form.Item
          field="userLoginAccount"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="userLoginPassword"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex">
            <Form.Item
              noStyle={true}
              field="captcha"
              rules={[
                { required: true, message: t['login.form.password.errMsg'] },
              ]}
            >
              <Input
                prefix={<IconSafe />}
                placeholder="请输入验证码答案"
                onPressEnter={onSubmitClick}
              />
            </Form.Item>
            <Image
              preview={false}
              src={getCaptcha(randomStr)}
              onClick={() => setRandomStr(random(1, 99999))}
            />
          </div>
        </Form.Item>
        <Space size={16} direction="vertical">
          {/* <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div> */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => {
              if (getEndType() === EndType.ADMIN) {
                window.location.href = LoginPathMap.client;
              } else {
                window.location.href = LoginPathMap.admin;
              }
            }}
          >
            {/* {t['login.form.register']} */}
            切换{getEndType() === EndType.ADMIN ? getEndTypeName[EndType.CLIENT] : getEndTypeName[EndType.ADMIN]}
          </Button>
        </Space>
      </Form>
    </div>
  );
}