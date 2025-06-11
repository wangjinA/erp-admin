import {
  Button,
  ButtonProps,
  Form,
  FormProps,
  Modal,
  ModalProps,
  Space,
  Table,
  TableProps,
} from '@arco-design/web-react'

import { ColumnProps } from '@arco-design/web-react/es/Table'

import {
  IconEdit,
  IconEye,
  IconPlus,
  IconRefresh,
  IconSearch,
} from '@arco-design/web-react/icon'

import {
  useLocalStorageState,
  useRequest,
  useSessionStorageState,
} from 'ahooks'

import { AxiosResponse } from 'axios'

import classNames from 'classnames'
import { omit } from 'lodash'
import React, { CSSProperties, forwardRef, useImperativeHandle } from 'react'

import { CreateFormItemType } from '../CreateFormItem'
import CreateWrap, { ActionsContext, CreateWrapProps } from '../CreateWrap'
import FilterForm, { FilterFormProps } from '../FilterForm'
import PopconfirmDelete from '../PopconfirmDelete'

import { useSearchParam } from './hooks'

import { APIListResponse, APIResponse, IPageParams, ListResponse } from '@/api/type'
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants'
import { showMessage } from '@/utils'

export interface SearchTableRef {
  refreshSearchTable: () => void
}

const SearchTable = forwardRef<SearchTableRef, SearchTableProps>(
  (props, ref) => {
    const {
      name,
      formItemConfigList,
      isSearchParams = true,
      className,
      style,
      majorKey = 'id',
      tableProps,
      formProps,
      initialValues = {},
      createInitialValue = {},
      showActions = true,
      createText = '新建',
      createButtonProps = {},
      formModalProps = {},
      filterFormProps = {},
      requestQueryTransform,
      leftTool,
      onView,
      createRequest,
      createHandle,
      getListRequest,
      updateRequest,
      removeRequest,
      editTransform,
      onDataChange,
    } = props
    const [formRef] = Form.useForm()
    const [searchFromRef] = Form.useForm()
    const {
      value: searchFromData,
      setValue: setSearchFromData,
      resetParams,
    } = useSearchParam({
      initialValues,
      isSearchParams,
    })

    const [pageSize, setPageSize] = useLocalStorageState(`${name}-page-size`, {
      defaultValue: 10,
    })
    const [pageNum, setPageNum] = useSessionStorageState(`${name}-page-num`, {
      defaultValue: 1,
    })

    const { data, run, loading } = useRequest(
      () => {
        return getListRequest?.({
          ...(requestQueryTransform ? requestQueryTransform(searchFromData) : searchFromData),
          pageNum,
          pageSize,
        }).then((res) => {
          const result = res.data.data
          // 删除最后一页且只有一行的的时候优化加载。
          if (result.total && result.list.length === 0 && pageNum !== 1) {
            setPageNum(pageNum - 1)
            return
          }
          onDataChange?.(result)
          return result
        })
      },
      {
        refreshDeps: [pageSize, pageNum],
      },
    )

    useImperativeHandle(ref, () => {
      return {
        refreshSearchTable: run,
      }
    })

    const showSearchSection = formItemConfigList.some(item => item.isSearch) // 是否有搜索项
    const showHeaderSection = showSearchSection || createRequest // 是否有搜索项或者创建按钮
    return (
      <CreateWrap
        formRef={formRef}
        createRequest={createRequest}
        updateRequest={updateRequest}
        refreshRequest={run}
      >
        <ActionsContext.Consumer>
          {({ showType, setShowType, createAction, updateAction }) => (
            <div className={className} style={style}>
              {showSearchSection
                ? (
                    <FilterForm
                      {...formProps}
                      form={searchFromRef}
                      initialValues={searchFromData}
                      formItemConfigList={formItemConfigListStatusFilter(
                        formItemConfigList,
                        'isSearch',
                      )}
                      onValuesChange={(val, vals) => {
                        setSearchFromData(vals)
                      }}
                    >
                    </FilterForm>
                  )
                : null}
              {showHeaderSection
                ? (
                    <div className={classNames('flex justify-between pr-2', showSearchSection ? 'py-6' : 'pb-6')}>
                      <Space size={16}>
                        {(createRequest || createHandle) && (
                          <Button
                            type="primary"
                            onClick={() => {
                              if (createHandle) {
                                createHandle()
                              }
                              else {
                                setShowType(ShowFormType.create)
                              }
                            }}
                            icon={<IconPlus></IconPlus>}
                            {...createButtonProps}
                          >
                            {createText}
                          </Button>
                        )}
                        {leftTool?.()}
                      </Space>

                      {showSearchSection
                        ? (
                            <Space size={16}>
                              <Button
                                type="default"
                                loading={loading}
                                icon={<IconRefresh />}
                                onClick={() => {
                                  searchFromRef.clearFields()
                                  searchFromRef.setFieldsValue(resetParams())

                                  setTimeout(() => {
                                    if (pageNum === 1) {
                                      run()
                                    }
                                    else {
                                      setPageNum(1)
                                    }
                                  })
                                }}
                              >
                                重置
                              </Button>
                              <Button
                                type="primary"
                                icon={<IconSearch />}
                                loading={loading}
                                onClick={() => run()}
                              >
                                查询
                              </Button>
                            </Space>
                          )
                        : null}
                    </div>
                  )
                : null}
              <Table
                rowKey={majorKey}
                pagination={{
                  pageSize,
                  current: pageNum,
                  total: data?.total || tableProps?.data?.length,
                  showTotal: true,
                  sizeCanChange: true,
                  onChange(pageNumber, pageSize) {
                    setPageNum(pageNumber)
                    setPageSize(pageSize)
                  },
                }}
                data={data?.list}
                loading={loading}
                {...tableProps}
                columns={[
                  ...createFormListToColumnList(
                    formItemConfigList.filter(
                      item =>
                        !item.hideTable && item.schema.field !== 'actions',
                    ),
                  ),
                  ...(showActions
                    ? [
                        {
                          title: '操作',
                          key: 'actions',
                          width: 315,
                          render: (_, record, index) => (
                            <Space size={0}>
                              {onView && (
                                <Button
                                  type="text"
                                  icon={<IconEye />}
                                  onClick={() => {
                                    onView(record)
                                  }}
                                >
                                  查看
                                </Button>
                              )}
                              {formItemConfigList
                                .find(
                                  oitem => oitem.schema.field === 'actions',
                                )
                                ?.render?.(_, record, index)}
                              {updateRequest && (
                                <Button
                                  type="text"
                                  status="warning"
                                  icon={<IconEdit />}
                                  onClick={() => {
                                    setShowType(ShowFormType.edit, record)
                                  }}
                                >
                                  编辑
                                </Button>
                              )}
                              {removeRequest && (
                                <PopconfirmDelete
                                  buttonProps={{
                                    type: 'text',
                                  }}
                                  onOk={() =>
                                    showMessage(() => removeRequest(record[majorKey])).then(() => {
                                      run()
                                    })}
                                >
                                </PopconfirmDelete>
                              )}
                            </Space>
                          ),
                        },
                      ]
                    : []),
                ]}
              >
              </Table>

              <Modal
                {...FormModalCommonProps}
                confirmLoading={createAction?.loading || updateAction?.loading}
                onCancel={() => {
                  setShowType(null)
                  formRef.resetFields()
                }}
                onOk={async () => {
                  const formData = await formRef.validate()
                  switch (showType) {
                    case ShowFormType.create:
                      createAction.run(formData)
                      break
                    case ShowFormType.edit:
                      updateAction.run(formData)
                      break
                    default:
                      break
                  }
                }}
                visible={!!showType}
                title={`${ShowFormTypeMap[showType]}${name}`}
                unmountOnExit={true}
                {...formModalProps}
              >
                <FilterForm
                  initialValues={createInitialValue}
                  form={formRef}
                  labelLength={8}
                  span={12}
                  className="pb-4 pt-6"
                  formItemConfigList={[
                    ...formItemConfigListStatusFilter(
                      formItemConfigList,
                      'isCreate',
                      { showType },
                    ),
                    {
                      schema: {
                        field: majorKey,
                      },
                      formItemProps: {
                        hidden: true,
                      },
                    },
                  ]}
                  {...filterFormProps}
                >
                </FilterForm>
              </Modal>
            </div>
          )}
        </ActionsContext.Consumer>
      </CreateWrap>
    )
  },
)

/**
 * 创建、搜索。状态过滤，并去除相关字段
 */
function formItemConfigListStatusFilter(
  formItemConfigList: SearchTableSchema[],
  key: 'isSearch' | 'isCreate',
  dynamicHandleParams: { showType?: ShowFormType } = {},
): any[] {
  const result = formItemConfigList
    .filter(item => item[key])
    .map((item) => {
      return ({ ...omit(item, ['isCreate', 'isSearch', 'dynamicHandle']), ...{
        schema: {
          ...item.schema,
          required: key === 'isSearch' ? false : item.schema.required,
          rules: key === 'isSearch' ? null : item.schema.rules,
        },
      }, ...(item.dynamicHandle ? item.dynamicHandle(dynamicHandleParams) : {}) })
    })
  console.log(result)

  return result
}

function createFormListToColumnList(
  formItemConfigList: SearchTableSchema[],
): SearchTableSchema & Required<ColumnProps>[] {
  const res: any = formItemConfigList
    .filter(item => !item.formItemProps?.hidden)
    .map(item => ({
      ...item,
      title: item.title || item.schema.label,
      dataIndex: item.schema.field,
    }))
  return res
}

export default SearchTable

interface SearchTableProps {
  name: string
  formItemConfigList: SearchTableSchema[]
  isSearchParams?: boolean
  className?: string
  style?: CSSProperties
  majorKey?: string // rowKey
  tableProps?: TableProps
  formProps?: FormProps
  initialValues?: any
  createInitialValue?: any
  showActions?: boolean
  createText?: string
  formModalProps?: ModalProps
  createButtonProps?: ButtonProps
  filterFormProps?: Partial<FilterFormProps>
  editTransform?: (params: any) => any
  requestQueryTransform?: (params: any) => any
  leftTool?: () => React.ReactNode
  createRequest?: CreateWrapProps['createRequest']
  createHandle?: () => void
  getListRequest?: (
    params: IPageParams & Record<string, any>
  ) => Promise<AxiosResponse<APIListResponse<any>>>
  removeRequest?: (id) => Promise<AxiosResponse<APIResponse>>
  updateRequest?: (id) => Promise<AxiosResponse<APIResponse>>
  onView?: (record) => void
  onDataChange?: (data: ListResponse) => void
}

export type SearchTableSchema = CreateFormItemType &
  Partial<ColumnProps> & {
    isSearch?: boolean
    isCreate?: boolean
    hideTable?: boolean
    dynamicHandle?: (p: {
      showType?: ShowFormType
    }) => Omit<SearchTableSchema, 'dynamicHandle'>
  }
