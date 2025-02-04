import { SearchTableSchema } from '@/components/SearchTable'
import StatusTag from '@/components/StatusTag'
import { usableTagInfoMap } from '@/constants/statusTag'

export const dictFormItemConfigList: SearchTableSchema[] = [
  {
    schema: {
      field: 'dictName',
      label: '字典名称',
    },
    isSearch: true,
    isCreate: true,
    width: 200,
  },
  // {
  //   schema: {
  //     field: 'createBy',
  //     label: '创建人',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'deleteStatus',
  //     label: '删除状态', // ：0.正常，1.删除
  //   },
  //   isSearch: true,
  // },
  {
    schema: {
      field: 'dictCode',
      label: '字典标识',
    },
    isSearch: true,
    isCreate: true,
  },
  {
    schema: {
      field: 'dictStatus',
      label: '字典状态', // ：0.正常，1.异常
    },
    render(col) {
      return <StatusTag tagInfos={usableTagInfoMap} value={col}></StatusTag>
    },
    // isSearch: true,
  },
  {
    schema: {
      field: 'remark',
      label: '字典备注',
    },
    isSearch: true,
    isCreate: true,
    render(r) {
      return r || '无'
    },
  },
  // {
  //   schema: {
  //     field: 'sequenceNo',
  //     label: '序号',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'updateBy',
  //     label: '更新人',
  //   },
  //   isSearch: true,
  // },
  // {
  //   schema: {
  //     field: 'updateTime',
  //     label: '更新时间',
  //   },
  //   render(r) {
  //     return r || '-'
  //   },
  // },
  // {
  //   schema: {
  //     field: 'tableActions',
  //     label: '更新时间',
  //   },
  //   render(col, record){
  //     return <Button >

  //     </Button>
  //   }
  // },
]

export const dictChildFormItemConfigList: SearchTableSchema[] = [
  {
    schema: {
      field: 'displayName',
      label: '字典名称',
    },
    isSearch: true,
    isCreate: true,
    width: 200,
  },
  // {
  //   schema: {
  //     field: 'createBy',
  //     label: '创建人',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'deleteStatus',
  //     label: '删除状态', // ：0.正常，1.删除
  //   },
  //   isSearch: true,
  // },
  {
    schema: {
      field: 'dictValue',
      label: '字典标识',
    },
    isSearch: true,
    isCreate: true,
  },
  {
    schema: {
      field: 'dictChildStatus',
      label: '字典状态', // ：0.正常，1.异常
    },
    render(col) {
      return <StatusTag tagInfos={usableTagInfoMap} value={col}></StatusTag>
    },
    // isSearch: true,
  },
  {
    schema: {
      field: 'dictChildDesc',
      label: '字典备注',
    },
    isSearch: true,
    isCreate: true,
  },
  // {
  //   schema: {
  //     field: 'sequenceNo',
  //     label: '序号',
  //   },
  // },
  // {
  //   schema: {
  //     field: 'updateBy',
  //     label: '更新人',
  //   },
  //   isSearch: true,
  // },
  {
    schema: {
      field: 'updateTime',
      label: '更新时间',
    },
  },
  {
    schema: {
      field: 'dictCode',
      label: '字典ID',
    },
    formItemProps: {
      hidden: true,
    },
    isSearch: true,
    isCreate: true,
  },
]
