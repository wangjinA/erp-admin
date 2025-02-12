import { Divider, Modal, Spin, Table } from '@arco-design/web-react'

import { ColumnProps } from '@arco-design/web-react/es/Table'
import { useLocalStorageState, useRequest } from 'ahooks'
import { useCallback, useMemo } from 'react'

import { dictChildAPI } from '@/api/admin/dict'
import { costAPI } from '@/api/admin/entrepot'
import FilterForm from '@/components/FilterForm'
import Remark, { RemarkType } from '@/components/Remark'

interface CostSetting {
  entrepotId: any
  className?: string
}

// cost_setting             费用设置
// membership_level        会员等级
// billing_mode      计费方式
// charge_classification    收费分类

// base_packing   基础打包-费用设置
// entry_charge   进店费用-费用设置
// first_air_freight  头程空运费用-费用设置
// first_sea_freight  头程海运费用-费用设置
// first_express_freight    头程特快费用-费用设置
// first_leg_sea_freight    头程空转海费用-费用设置
// warehousing_charge    仓储收费-费用设置

const CostDictMap = {
  0: 'base_packing',
  1: 'entry_charge',
  2: 'first_air_freight',
  3: 'first_sea_freight',
  4: 'first_express_freight',
  5: 'first_leg_sea_freight',
  6: 'warehousing_charge',
}

export default (props: CostSetting) => {
  const { entrepotId, className } = props
  const [costFilter, setCostFilter] = useLocalStorageState('cost-filter', {
    defaultValue: {
      platform: '0',
      region: 'TW',
    },
  })

  const { data: dictList, loading } = useRequest(() => {
    return dictChildAPI.getListByDictCode([
      ...Object.values(CostDictMap),
      'cost_setting',
      'membership_level',
    ]).then(r => r.data.data.list)
  }, {
    manual: false,
    refreshDeps: [entrepotId, JSON.stringify(costFilter)],
  })

  const membershipLevels = useMemo(() => {
    return dictList?.filter(item => item.dictCode === 'membership_level')?.map(item => ({
      label: item.displayName,
      value: item.dictValue,
    }))
  }, [JSON.stringify(dictList)])

  const settingConfigHandler = useRequest(() => {
    if (!entrepotId) {
      return null
    }
    return costAPI.getSetting({
      entrepotId,
      ...costFilter,
    })
  }, {
    manual: false,
    refreshDeps: [entrepotId, JSON.stringify(costFilter)],
  })

  // const setSettingConfigHandler = useRequest((data: Partial<Cost>) => {
  //   return costAPI.setSetting({
  //     ...data,
  //     entrepotId,
  //   })
  // }, {
  //   manual: true,
  // })

  const getMembershipLevelsColumns = useCallback((feeType: string) => {
    return membershipLevels
      ? membershipLevels.map<ColumnProps>(membership => ({
        title: membership.label,
        dataIndex: membership.value,
        render: (value, row) => (
          <Remark
            title="价格"
            value={value || 0}
            type={RemarkType.Number}
            onChange={(newVal) => {
              return costAPI.setSetting({
                ...costFilter,
                expense: newVal,
                entrepotId,
                feeType,
                membershipLevel: membership.value,
                settingItemValue: row.settingItemValue,
              })
            }}
          >
          </Remark>
        ),
      }))
      : []
  }, [entrepotId, JSON.stringify(costFilter), JSON.stringify(membershipLevels)])

  return (
    <Spin loading={settingConfigHandler.loading}>
      <div className={className}>
        <FilterForm
          initialValues={costFilter}
          formItemConfigList={[
            {
              schema: {
                label: '平台',
                field: 'platform',
              },
              control: 'dictSelector',
              controlProps: {
                dictCode: 'platform_type',
              },
            },
            {
              schema: {
                label: '区域',
                field: 'region',
              },
              control: 'dictSelector',
              controlProps: {
                dictCode: 'region',
              },
            },
          ]}
          onChange={(v, vv: any) => {
            setCostFilter(vv)
          }}
        >
        </FilterForm>
        {
          dictList?.filter(o => o.dictCode === 'cost_setting')?.map((item, i) => (
            <div key={item.dictValue}>
              <Divider orientation="left">
                {item.displayName}
              </Divider>
              <Table
                borderCell={true}
                rowKey="feeType"
                pagination={false}
                columns={[
                  {
                    title: '收费类目',
                    dataIndex: 'feeType',
                  },
                  ...getMembershipLevelsColumns(CostDictMap[i]),
                ]}
                data={dictList?.filter(o => o.dictCode === CostDictMap[i])?.map(item => ({
                  feeType: item.displayName,
                  settingItemValue: item.dictValue,
                  // ...item.membershipLevels.reduce((acc, cur) => {
                  //   acc[cur.level] = cur.fee
                  //   return acc
                  // }, {}),
                }))}
              >
              </Table>
            </div>
          ))
        }

        {/* <Divider orientation="left">打包附加收费</Divider>
        <Table columns={[
          {
            title: '收费类目',
            dataIndex: 'category',
          },
          {
            title: '普通会员',
            dataIndex: 'normal',
          },
          {
            title: 'VIP会员',
            dataIndex: 'vip',
          },
          {
            title: '钻石会员',
            dataIndex: 'diamond',
          },
          {
            title: '状态',
            dataIndex: 'status',
          },
          {
            title: '操作',
            dataIndex: 'action',
          },
        ]}
        >
        </Table>
        <Divider orientation="left">仓储收费</Divider>
        <Table columns={[
          {
            title: '收费类目',
            dataIndex: 'feeType',
          },
          ...membershipLevelsColumns,
        ]}
        >
        </Table> */}
        <Modal visible={false}>
          <FilterForm formItemConfigList={[
            {
              schema: {
                field: 'feeType',
                label: '收费类目',
              },
            },
            {
              schema: {
                field: 'membershipLevel',
                label: '会员等级',
              },
              control: 'dictSelector',
              controlProps: {
                dictCode: 'membership_level',
              },
            },
            {
              schema: {
                field: 'fee',
                label: '收费金额',
              },
            },
            {
              schema: {
                field: 'status',
                label: '状态',
              },
            },
            {
              schema: {
                field: 'action',
                label: '操作',
              },
            },

          ]}
          >

          </FilterForm>
        </Modal>
      </div>
    </Spin>
  )
}
