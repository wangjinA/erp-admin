import React, { useState } from 'react';
import { ShowFormType } from '@/constants';
import { useRequest } from 'ahooks';
import { showMessageStatus, tryFn } from '@/utils';
import { AxiosResponse } from 'axios';
import { APIResponse } from '@/api/type';
import { Result } from 'ahooks/lib/useRequest/src/types';
import { FormInstance } from '@arco-design/web-react';

interface ChildrenParams {
  showType?: ShowFormType;
  setShowType?: (type: ShowFormType) => void;
  createAction?: Result<any, any>;
  updateAction?: Result<any, any>;
}

export interface CreateWrapProps {
  createRequest?: (params) => Promise<AxiosResponse<APIResponse>>;
  updateRequest?: (id) => Promise<AxiosResponse<APIResponse>>;
  refreshRequest?: () => void;
  children?: React.ReactNode;
  formRef?: FormInstance;
}

export const ActionsContext = React.createContext<Partial<ChildrenParams>>({});

const CreateWrap:React.FC<CreateWrapProps> = ((props) => {
  const { formRef, children, createRequest, updateRequest, refreshRequest } = props;
  const [showType, setShowType] = useState<ShowFormType>(null);
  const createAction = useRequest(
    async (params) => {
      return tryFn(async () => {
        if (createRequest) {
          const res = await createRequest(params);
          await showMessageStatus(res.data);
          formRef?.resetFields();
          setShowType(null);
          refreshRequest?.();
        }
      });
    },
    {
      manual: true,
    }
  );
  const updateAction = useRequest(
    async (params) => {
      return tryFn(async () => {
        if (updateRequest) {
          const res = await updateRequest(params);
          await showMessageStatus(res.data);
          formRef?.resetFields();
          setShowType(null);
          refreshRequest?.();
        }
      });
    },
    {
      manual: true,
    }
  );

  return (
    <ActionsContext.Provider
      value={{
        showType,
        setShowType,
        createAction,
        updateAction,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
});

export default CreateWrap;
