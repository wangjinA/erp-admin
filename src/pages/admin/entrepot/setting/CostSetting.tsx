import { Divider, Modal, Spin, Table } from '@arco-design/web-react'

import { ColumnProps } from '@arco-design/web-react/es/Table'
import { useLocalStorageState, useRequest } from 'ahooks'
import { pick } from 'lodash'
import { useCallback, useMemo } from 'react'

import { dictChildAPI } from '@/api/admin/dict'
import { Cost, costAPI } from '@/api/admin/entrepot'
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

  const settingConfigHandler = useRequest(async (feeTypes) => {
    if (!entrepotId) {
      return null
    }
    const res = await Promise.all<Cost[][]>(
      feeTypes.map(feeType => costAPI.getSetting({
        entrepotId,
        feeType,
        ...costFilter,
      }).then(r => r.data.data.list)),
    )
    return res
  }, {
    manual: true,
    // refreshDeps: [entrepotId, JSON.stringify(costFilter)],
  })

  const { data: dictList, loading: dictLoadig } = useRequest(() => {
    return dictChildAPI.getListByDictCode([
      ...Object.values(CostDictMap),
      'cost_setting',
      'membership_level',
    ]).then(r => r.data.data.list).then((r) => {
      settingConfigHandler.run(r.filter(o => o.dictCode === 'cost_setting').map(o => o.dictValue))
      return r
    })
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

  const getMembershipLevelsColumns = useCallback((feeType: string) => {
    return membershipLevels
      ? membershipLevels.map<ColumnProps>(membership => ({
        title: membership.label,
        dataIndex: `${membership.value}.expense`,
        render: (value, row) => (
          <Remark
            title="价格"
            value={value || 0}
            type={RemarkType.Number}
            notRefres={true}
            onChange={(newVal) => {
              const p: any = {
                ...costFilter,
                expense: newVal,
                entrepotId,
                feeType,
                membershipLevel: membership.value,
                settingItemValue: row.settingItemValue,
              }
              const expenseInfo = row[membership.value]
              if (expenseInfo?.id) {
                p.id = expenseInfo.id
              }
              return costAPI.setSetting(p)
            }}
          >
          </Remark>
        ),
      }))
      : []
  }, [entrepotId, JSON.stringify(costFilter), JSON.stringify(membershipLevels), entrepotId])

  return (
    <Spin className={className} loading={settingConfigHandler.loading || dictLoadig}>
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
        dictList?.filter(o => o.dictCode === 'cost_setting')?.map((feeTypeItem, i) => (
          <div key={`${entrepotId}-${feeTypeItem.dictValue}`}>
            <Divider orientation="left">
              {feeTypeItem.displayName}
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
                ...getMembershipLevelsColumns(feeTypeItem.dictValue),
              ]}
              data={dictList?.filter(o => o.dictCode === CostDictMap[i])?.map((item) => {
                const rowObj = membershipLevels.reduce((acc, cur) => {
                  const expenseInfo = settingConfigHandler.data?.[i].find(o =>
                  // vip等级和费用项
                    o.membershipLevel === cur.value && o.settingItemValue === item.dictValue)
                  // 费用类型
                  acc[cur.value] = expenseInfo
                    ? pick(expenseInfo, ['expense', 'id'])
                    : {
                        value: 0,
                        id: null,
                      }
                  return acc
                }, {})
                return ({
                  feeType: item.displayName,
                  settingItemValue: item.dictValue,
                  ...rowObj,
                })
              })}
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
    </Spin>
  )
}
