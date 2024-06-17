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
}

interface CreateWrapProps {
  createRequest: (params) => Promise<AxiosResponse<APIResponse>>;
  children: React.ReactNode;
  formRef: FormInstance;
}

export const ActionsContext = React.createContext<Partial<ChildrenParams>>({});

const CreateWrap = React.forwardRef<any, CreateWrapProps>((props) => {
  const { createRequest, formRef, children } = props;
  const [showType, setShowType] = useState<ShowFormType>(null);
  const createAction = useRequest(
    async (params) => {
      tryFn(async () => {
        const res = await createRequest(params);
        await showMessageStatus(res.data.data);
        formRef.resetFields();
        setShowType(null);
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
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
});

export default CreateWrap;
