import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Tabs } from '@arco-design/web-react';
import useI18n from '@/utils/useI18n';
import locale from './locale';
import InfoHeader from './header';
import InfoForm from './info';
import Security from './security';
import './mock';
import Verified from './verified';
import { GlobalState } from '@/store';

function UserInfo() {
  const t = useI18n(locale);
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const loading = useSelector((state: GlobalState) => state.userLoading);
  const editPassword = useSelector((state: GlobalState) => state.editPassword);
  const [activeTab, setActiveTab] = useState('basic');
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
  );
}

export default UserInfo;
