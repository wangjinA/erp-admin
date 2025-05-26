import { Grid, Tabs } from '@arco-design/web-react'

import classNames from 'classnames'

import EntrepotList from '../components/EntrepotList'
import EntrepotUsers from '../components/EntrepotUsers'
import SenderList from '../components/SenderList'
import { useEntrepotInfo } from '../info/hooks'

import CostSetting from './CostSetting'
import ParamSetting from './ParamSetting'
import styles from './style.module.less'

export default () => {
  const entrepotInfoHandle = useEntrepotInfo({
    isPureList: true,
  })
  const { activeEntrepot, entrepotLoading } = entrepotInfoHandle
  console.log(!entrepotLoading && !activeEntrepot)

  return (
    <div className="bg-white p-4 main-content-box overflow-hidden">
      <Grid.Row gutter={[20, 0]} className="h-full">
        <Grid.Col span={6} className="border-r border-neutral-3 pr-4 h-full">
          <EntrepotList entrepotInfoHandle={entrepotInfoHandle}></EntrepotList>
        </Grid.Col>
        {
          activeEntrepot
            ? (
                <Grid.Col span={18} className="pr-6 h-full">
                  <Tabs defaultActiveTab="费用设置" lazyload={true} className={classNames('h-full flex-col flex', styles['entrepot-setting-tabs'])}>
                    <Tabs.TabPane title="费用设置" key="费用设置">
                      <CostSetting className="!block px-4" entrepotId={activeEntrepot?.id}></CostSetting>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="人员设置" key="人员设置">
                      <EntrepotUsers entrepotId={activeEntrepot?.id}></EntrepotUsers>
                    </Tabs.TabPane>
                    <Tabs.TabPane title="寄件人姓名" key="寄件人姓名">
                      {activeEntrepot ? <SenderList entrepotId={activeEntrepot.id}></SenderList> : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane title="仓库参数设置" key="仓库参数设置" className="h-full overflow-auto">
                      <ParamSetting className="px-4 overflow-hidden" entrepotId={activeEntrepot?.id}></ParamSetting>
                    </Tabs.TabPane>
                  </Tabs>
                </Grid.Col>
              )
            : null
        }
      </Grid.Row>
    </div>
  )
}
