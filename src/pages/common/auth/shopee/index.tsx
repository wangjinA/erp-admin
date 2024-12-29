import { Button, Link, Result, Space } from '@arco-design/web-react'
import { IconCheckCircleFill } from '@arco-design/web-react/icon'

export default function AuthShopee() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="success"
        icon={<IconCheckCircleFill className="block" style={{ color: '#00b42a', fontSize: 64 }} />}
        title="授权成功"
        subTitle="您已成功完成授权。现在可以使用我们的服务了。"
        extra={(
          <Space size="medium">
            <Link href="/client/store/list">
              <Button type="primary" size="large">
                返回
              </Button>
            </Link>
          </Space>
        )}
      />
    </div>
  )
}
