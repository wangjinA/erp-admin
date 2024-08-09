import {
  Button,
  Form,
  FormProps,
  Modal,
  Space,
  Table,
  TableProps,
} from '@arco-design/web-react';

import { ColumnProps } from '@arco-design/web-react/es/Table';

import {
  IconEdit,
  IconEye,
  IconPlus,
  IconRefresh,
  IconSearch,
} from '@arco-design/web-react/icon';
import {
  useLocalStorageState,
  useRequest,
  useSessionStorageState,
} from 'ahooks';

import { AxiosResponse } from 'axios';

import { omit } from 'lodash';
import React, { CSSProperties, forwardRef, useImperativeHandle } from 'react';

import { CreateFormItemType } from '../CreateFormItem';
import CreateWrap, { ActionsContext, CreateWrapProps } from '../CreateWrap';
import FilterForm from '../FilterForm';
import PopconfirmDelete from '../PopconfirmDelete';

import { useSearchParam } from './hooks';

import { APIListResponse, APIResponse, IPageParams } from '@/api/type';
import {
  FormModalCommonProps,
  ShowFormType,
  ShowFormTypeMap,
} from '@/constants';

export interface SearchTableRef {
  refreshSearchTable: () => void;
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
      showActions = true,
      leftTool,
      onView,
      createRequest,
      createHandle,
      getListRequest,
      updateRequest,
      removeRequest,
    } = props;
    const [formRef] = Form.useForm();
    const [searchFromRef] = Form.useForm();
    const {
      value: searchFromData,
      setValue: setSearchFromData,
      resetParams,
    } = useSearchParam({
      initialValues,
      isSearchParams,
    });

    const [pageSize, setPageSize] = useLocalStorageState(`${name}-page-size`, {
      defaultValue: 10,
    });
    const [pageNum, setPageNum] = useSessionStorageState(`${name}-page-num`, {
      defaultValue: 1,
    });

    const { data, run, loading } = useRequest(
      () => {
        return getListRequest?.({
          ...searchFromData,
          pageNum,
          pageSize,
        }).then((res) => {
          const result = res.data.data;
          // 删除最后一页且只有一行的的时候优化加载。
          if (result.total && result.list.length === 0 && pageNum !== 1) {
            setPageNum(pageNum - 1);
            return;
          }
          return result;
        });
      },
      {
        refreshDeps: [pageSize, pageNum],
      }
    );

    useImperativeHandle(ref, () => {
      return {
        refreshSearchTable: run,
      };
    });

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
              <FilterForm
                {...formProps}
                form={searchFromRef}
                initialValues={searchFromData}
                formItemConfigList={formItemConfigListStatusFilter(
                  formItemConfigList,
                  'isSearch'
                )}
                onValuesChange={(val, vals) => {
                  setSearchFromData(vals);
                }}
              ></FilterForm>
              <div className="flex justify-between py-6 pr-2">
                <Space size={20}>
                  {(createRequest || createHandle) && (
                    <Button
                      type="primary"
                      onClick={() => {
                        if (createHandle) {
                          createHandle();
                        } else {
                          setShowType(ShowFormType.create);
                        }
                      }}
                      icon={<IconPlus></IconPlus>}
                    >
                      新建
                    </Button>
                  )}
                  {leftTool?.()}
                </Space>

                <Space size={20}>
                  <Button
                    type="default"
                    loading={loading}
                    icon={<IconRefresh />}
                    onClick={() => {
                      searchFromRef.clearFields();
                      searchFromRef.setFieldsValue(resetParams());

                      setTimeout(() => {
                        if (pageNum === 1) {
                          run();
                        } else {
                          setPageNum(1);
                        }
                      });
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
              </div>
              <Table
                rowKey={majorKey}
                pagination={{
                  pageSize,
                  current: pageNum,
                  total: data?.total,
                  showTotal: true,
                  sizeCanChange: true,
                  onChange(pageNumber, pageSize) {
                    setPageNum(pageNumber);
                    setPageSize(pageSize);
                  },
                }}
                data={data?.list}
                loading={loading}
                {...tableProps}
                columns={[
                  ...createFormListToColumnList(
                    formItemConfigList.filter(
                      (item) =>
                        !item.hideTable && item.schema.field !== 'actions'
                    )
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
                                    onView(record);
                                  }}
                                >
                                  查看
                                </Button>
                              )}
                              {formItemConfigList
                                .find(
                                  (oitem) => oitem.schema.field === 'actions'
                                )
                                ?.render?.(_, record, index)}
                              {updateRequest && (
                                <Button
                                  type="text"
                                  status="warning"
                                  icon={<IconEdit />}
                                  onClick={() => {
                                    setShowType(ShowFormType.edit);
                                    formRef.setFieldsValue(record);
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
                                    removeRequest(record[majorKey]).then(() => {
                                      run();
                                    })
                                  }
                                ></PopconfirmDelete>
                              )}
                            </Space>
                          ),
                        },
                      ]
                    : []),
                ]}
              ></Table>

              <Modal
                {...FormModalCommonProps}
                confirmLoading={createAction?.loading || updateAction.loading}
                onCancel={() => {
                  setShowType(null);
                  formRef.resetFields();
                }}
                onOk={async () => {
                  const formData = await formRef.validate();
                  switch (showType) {
                    case ShowFormType.create:
                      createAction.run(formData);
                      break;
                    case ShowFormType.edit:
                      updateAction.run(formData);
                      break;
                    default:
                      break;
                  }
                }}
                visible={!!showType}
                title={`${ShowFormTypeMap[showType]}${name}`}
              >
                <FilterForm
                  // initialValues={createInitialValue}
                  form={formRef}
                  labelLength={8}
                  span={12}
                  // className="pb-4 pt-6"  // !留意一下哪里用到了这个样式
                  formItemConfigList={[
                    ...formItemConfigListStatusFilter(
                      formItemConfigList,
                      'isCreate'
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
                ></FilterForm>
              </Modal>
            </div>
          )}
        </ActionsContext.Consumer>
      </CreateWrap>
    );
  }
);

/**
 * 创建、搜索。状态过滤，并去除相关字段
 */
function formItemConfigListStatusFilter(
  formItemConfigList: SearchTableSchema[],
  key: string
): any {
  return formItemConfigList
    .filter((item) => item[key])
    .map((item) => omit(item, ['isCreate', 'isSearch']));
}

function createFormListToColumnList(
  formItemConfigList: SearchTableSchema[]
): SearchTableSchema & Required<ColumnProps>[] {
  const res: any = formItemConfigList
    .filter((item) => !item.formItemProps?.hidden)
    .map((item) => ({
      ...item,
      title: item.title || item.schema.label,
      dataIndex: item.schema.field,
    }));
  return res;
}

export default SearchTable;

interface SearchTableProps {
  name: string;
  formItemConfigList: SearchTableSchema[];
  isSearchParams?: boolean;
  className?: string;
  style?: CSSProperties;
  majorKey?: string;
  tableProps?: TableProps;
  formProps?: FormProps;
  initialValues?: any;
  showActions?: boolean;
  leftTool?: () => React.ReactNode;
  createRequest?: CreateWrapProps['createRequest'];
  createHandle?: () => void;
  getListRequest?: (
    params: IPageParams & Record<string, any>
  ) => Promise<AxiosResponse<APIListResponse<any>>>;
  removeRequest?: (id) => Promise<AxiosResponse<APIResponse>>;
  updateRequest?: (id) => Promise<AxiosResponse<APIResponse>>;
  onView?: (record) => void;
}

export type SearchTableSchema = CreateFormItemType &
  Partial<ColumnProps> & {
    isSearch?: boolean;
    isCreate?: boolean;
    hideTable?: boolean;
  };
