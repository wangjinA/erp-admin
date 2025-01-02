import { Button, Form, FormInstance, Input } from '@arco-design/web-react'
import { IconLock, IconSafe, IconUser } from '@arco-design/web-react/icon'
import { useLocalStorageState, useRequest } from 'ahooks'

import { useEffect } from 'react'

import { userAPI } from '@/api/client/user'
import { showMessage } from '@/utils'

export default (props: { form: FormInstance }) => {
  const { form } = props
  const [codeTime, setCodeTime] = useLocalStorageState('registerCodeTime', {
    defaultValue: 0,
  })

  useEffect(() => {
    function tick() {
      if (codeTime > 0) {
        setCodeTime(codeTime - 1)
      }
    }
    const timerId = setInterval(tick, 1000)
    return () => clearInterval(timerId)
  }, [codeTime])

  const { run: sendCode, loading: sendCodeLoading } = useRequest(() => {
    return showMessage(() => userAPI.sendCode({
      tenantryPhone: form.getFieldValue('tenantryPhone'),
    }), '发送').then(() => {
      setCodeTime(60)
    })
  }, {
    manual: true,
  })
  return (
    <>
      <Form.Item
        field="tenantryPhone"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input
          prefix={<IconUser />}
          placeholder="请输入手机号"
          // onPressEnter={onSubmitClick}
        />
      </Form.Item>
      <Form.Item
        field="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<IconLock />}
          placeholder="请输入密码"
          // onPressEnter={onSubmitClick}
        />
      </Form.Item>
      <Form.Item
        field="passwordConfirm"
        rules={[{ required: true, message: '请输入确认密码' }]}
      >
        <Input.Password
          prefix={<IconLock />}
          placeholder="请输入确认密码"
          // onPressEnter={onSubmitClick}
        />
      </Form.Item>
      <Form.Item>
        <div className="flex">
          <Form.Item
            noStyle={true}
            field="verificationCode"
            rules={[
              { required: true, message: '请输入验证码' },
            ]}
          >
            <Input
              prefix={<IconSafe />}
              placeholder="请输入验证码"
              suffix={(
                <Button
                  disabled={codeTime > 0}
                  className="-mr-[12px]"
                  loading={sendCodeLoading}
                  status="warning"
                  onClick={() => {
                    sendCode()
                  }}
                >
                  发送验证码
                  {' '}
                  {codeTime > 0 ? `${codeTime}s` : ''}
                </Button>
              )}
            // onPressEnter={onSubmitClick}
            />
          </Form.Item>

        </div>
      </Form.Item>

    </>
  )
}