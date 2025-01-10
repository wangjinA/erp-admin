import { Button, Divider, Modal, Spin, Table } from '@arco-design/web-react'

import { ColumnProps } from '@arco-design/web-react/es/Table'
import { useLocalStorageState, useRequest } from 'ahooks'
import { useMemo } from 'react'

import { costAPI } from '@/api/admin/entrepot'
import FilterForm from '@/components/FilterForm'
import Remark, { RemarkType } from '@/components/Remark'
import { useDictOptions } from '@/components/Selectors/DictSelector'

interface CostSetting {
  entrepotId: any
  className?: string
}

export default (props: CostSetting) => {
  const { entrepotId, className } = props
  const [costFilter, setCostFilter] = useLocalStorageState('cost-filter', {
    defaultValue: {
      platform: '0',
      region: 'TW',
    },
  })

  const { data: membershipLevels } = useDictOptions({
    dictCode: 'membership_level',
  })
  const { data: basePacking } = useDictOptions({
    dictCode: 'base_packing',
  })

  const settingConfigHandler = useRequest(() => {
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

  const membershipLevelsColumns = useMemo(() => {
    return membershipLevels
      ? membershipLevels.map<ColumnProps>(item => ({
        title: item.label,
        dataIndex: item.value,
        render: (value, item) => (
          <Remark
            title="价格编辑"
            value={value || 0}
            type={RemarkType.Number}
            onChange={(newVal) => {
              return costAPI.setSetting({
                expense: newVal,
                entrepotId,
                feeType: item.feeType,
                membershipLevel: item.value,
              })
            }}
          >
          </Remark>
        ),
      }))
      : []
  }, [membershipLevels])

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
        <Divider orientation="left">
          <span>
            基础打包费用配置
            <Button onClick={() => {

            }}
            >
              添加收费设置
            </Button>
          </span>
        </Divider>
        <Table
          borderCell={true}
          rowKey="feeType"
          columns={[
            {
              title: '收费类目',
              dataIndex: 'feeType',
            },
            ...membershipLevelsColumns,
          ]}
          data={basePacking?.map(item => ({
            feeType: item.label,
          // ...item.membershipLevels.reduce((acc, cur) => {
          //   acc[cur.level] = cur.fee
          //   return acc
          // }, {}),
          }))}
        >
        </Table>
        <Divider orientation="left">打包附加收费</Divider>
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
        <Divider orientation="left">基础打包费用配置</Divider>
        <Table columns={[
          {
            title: '收费类目',
            dataIndex: 'feeType',
          },
          ...membershipLevelsColumns,
        ]}
        >
        </Table>
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
