import { Tabs } from '@arco-design/web-react';
import { useState } from 'react';
import Business from '../com';
import Coupang from '../../coupang/Coupang';

export default function Mo() {
  const [activeTab, setActiveTab] = useState('coupang');
  return (
    <div className="p-4 bg-white">
      <Tabs>
        <Tabs.TabPane key="mo" title="mo商品表格转换">
          <Business />
        </Tabs.TabPane>
        <Tabs.TabPane key="coupang" title="coupang表格转换">
          <Coupang />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
