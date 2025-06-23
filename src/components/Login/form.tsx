import {
  Button,
  Form,
  Image,
  Input,
  Message,
  Space,
  Spin,
} from '@arco-design/web-react'
import { IconLock, IconSafe, IconSwap, IconUser } from '@arco-design/web-react/icon'

import { useLocalStorageState, useRequest } from 'ahooks'

import classNames from 'classnames'
import { random } from 'lodash'
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import Forget from './forget'
import locale from './locale'
import Register from './register'
import styles from './style/index.module.less'

import { SuccessCode, requestEndInfo } from '@/api'
import { getCaptcha, login } from '@/api/admin/user'
import { userAPI } from '@/api/client/user'
import {
  EndType,
  EndTypeTextMap,
  LoginPathMap,
  getEndType,
  getEndTypeName,
  isAdmin,
  isClient,
} from '@/routes'
import { showMessage } from '@/utils'
import useI18n from '@/utils/useI18n'
import useStorage from '@/utils/useStorage'

export default function LoginForm() {
  const [form] = Form.useForm()
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [isForget, setIsForget] = useState(false)
  const [loginParams, setLoginParams, removeLoginParams]
    = useStorage('loginParams')
  const dispatch = useDispatch()
  const [value, setValue] = useLocalStorageState('userInfo')
  const [randomStr, setRandomStr] = useState(random(1, 99999))
  const t = useI18n(locale)

  const [rememberPassword, setRememberPassword] = useState(!!loginParams)

  const {
    run: loginHandler,
    loading,
  } = useRequest(
    async (params) => {
      try {
        const res = await login(params, randomStr)
        if (res.data.code === SuccessCode) {
          const loginInfo = res.data.data
          setValue(loginInfo)
          localStorage.setItem(requestEndInfo.tokenKey, loginInfo.token)
          localStorage.setItem(requestEndInfo.loginInfoKey, JSON.stringify(loginInfo))
          dispatch({
            type: 'set-login-info',
            payload: {
              loginInfo,
            },
          })
          localStorage.removeItem('scan-entrepot')
          afterLoginSuccess(params)
        }
        else {
          throw new Error(res.data.msg)
        }
      }
      catch (error) {
        Message.error(error.message || t['login.form.login.errMsg'])
        setRandomStr(random(1, 99999))
      }
    },
    {
      manual: true,
    },
  )

  const {
    run: registerHandler,
    loading: registerLoading,
  } = useRequest(
    async (params) => {
      await showMessage(() => userAPI.register(params), '注册')
      setIsRegister(false)
    },
    {
      manual: true,
    },
  )

  const {
    run: forgetHandler,
    loading: forgetLoading,
  } = useRequest(
    async (params) => {
      await showMessage(() => userAPI.forgetPassword(params), '修改')
      setIsForget(false)
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    localStorage.removeItem(requestEndInfo.tokenKey)
  }, [])

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params))
    }
    else {
      removeLoginParams()
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login')
    // 跳转首页
    window.location.href = `/${getEndType()}`
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
    form.validate().then((values) => {
      if (isClient()) {
        if (isRegister) {
          return registerHandler(values)
        }
        else if (isForget) {
          return forgetHandler(values)
        }
      }
      loginHandler(values)
    })
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams
    setRememberPassword(rememberPassword)
    if (form && rememberPassword) {
      const parseParams = JSON.parse(loginParams)
      form.setFieldsValue(parseParams)
    }
  }, [loginParams])

  const actionName = isRegister
    ? '注册'
    : isForget
      ? '确认修改'
      : '登录'

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>{getEndTypeName()}</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        form={form}
        // initialValues={
        //   isAdmin()
        //     ? {
        //         userLoginAccount: 'admin',
        //         userLoginPassword: '123456',
        //       }
        //     : {
        //         userLoginAccount: '15279298921',
        //         userLoginPassword: '123456',
        //       }
        // }
      >
        {!isRegister && !isForget
          ? (
              <>
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
                      width={135}
                      className="flex-shrink-0 cursor-pointer"
                      loader={(
                        <div className="flex justify-center">
                          <Spin size={4} dot></Spin>
                        </div>
                      )}
                      preview={false}
                      src={getCaptcha(randomStr)}
                      onClick={() => setRandomStr(random(1, 99999))}
                    />
                  </div>
                </Form.Item>
              </>
            )
          : null}
        {
          isRegister && isClient() ? <Register form={form}></Register> : null
        }
        {
          isForget && isClient() ? <Forget form={form}></Forget> : null
        }
        <Space size={16} direction="vertical">
          {/* <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div> */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {/* {t['login.form.login']} */}
            {actionName}
          </Button>
          {
            isClient()
              ? (
                  <div className="w-full flex">
                    {
                      !isForget
                        ? (
                            <Button
                              type="text"
                              className={classNames(styles['login-form-register-btn'], 'flex-1')}
                              onClick={() => {
                                setIsForget(false)
                                setIsRegister(!isRegister)
                              }}
                            >
                              {isRegister ? '返回登录' : '注册'}
                            </Button>
                          )
                        : null
                    }
                    {/* 忘记密码 */}
                    <Button
                      type="text"
                      className={classNames(styles['login-form-register-btn'], 'flex-1')}
                      onClick={() => {
                        setIsRegister(false)
                        setIsForget(!isForget)
                      }}
                    >
                      {isForget ? '返回登录' : '忘记密码'}
                    </Button>
                  </div>
                )
              : null
          }
          <Button
            type="text"
            status="success"
            long
            className={styles['login-form-register-btn']}
            onClick={() => {
              if (isAdmin()) {
                window.location.href = LoginPathMap.client
              }
              else {
                window.location.href = LoginPathMap.admin
              }
            }}
          >
            <IconSwap />
            切换
            {isAdmin()
              ? EndTypeTextMap[EndType.CLIENT]
              : EndTypeTextMap[EndType.ADMIN]}
          </Button>
        </Space>
      </Form>
    </div>
  )
}
