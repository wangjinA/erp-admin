import { Grid, Tabs } from '@arco-design/web-react'

import EntrepotList from '../components/EntrepotList'
import SenderList from '../components/SenderList'
import { useEntrepotInfo } from '../info/hooks'

export default () => {
  const entrepotInfoHandle = useEntrepotInfo({
    isPureList: true,
  })
  const { activeEntrepot } = entrepotInfoHandle
  return (
    <div className="bg-white py-6 px-4">

      <Grid.Row gutter={[20, 0]}>
        <Grid.Col span={6} className="border-r border-neutral-3 pr-4">
          <EntrepotList entrepotInfoHandle={entrepotInfoHandle}></EntrepotList>
        </Grid.Col>

        <Grid.Col span={18} className="pr-6">
          <Tabs defaultActiveTab="寄件人姓名">
            <Tabs.TabPane title="费用设置" key="费用设置">
              费用设置 开发中...
            </Tabs.TabPane>
            <Tabs.TabPane title="人员设置" key="人员设置">
              人员设置 开发中...
            </Tabs.TabPane>
            <Tabs.TabPane title="寄件人姓名" key="寄件人姓名">
              {activeEntrepot ? <SenderList entrepotId={activeEntrepot.id}></SenderList> : null}
            </Tabs.TabPane>
            <Tabs.TabPane title="仓库参数设置" key="仓库参数设置">
              仓库参数设置 开发中...
            </Tabs.TabPane>
          </Tabs>
        </Grid.Col>
      </Grid.Row>
    </div>
  )
}
