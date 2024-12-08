import { Card, Tabs } from '@arco-design/web-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import useLocale from '@/utils/useLocale'

import InfoHeader from './header'
import InfoForm from './info'
import locale from './locale'
import './mock'

import { GlobalState } from '@/store'

function UserInfo() {
  const t = useLocale(locale)
  const userInfo = useSelector((state: GlobalState) => state.userInfo)
  const loading = useSelector((state: GlobalState) => state.userLoading)
  const editPassword = useSelector((state: GlobalState) => state.editPassword)
  const [activeTab, setActiveTab] = useState('basic')
  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      {editPassword && (
        <Card style={{ marginTop: '16px' }}>
          <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
            <Tabs.TabPane key="basic" title="修改密码">
              <InfoForm loading={loading} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      )}
    </div>
  )
}

export default UserInfo
