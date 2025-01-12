import { FormInstance } from '@arco-design/web-react'
import { useRequest } from 'ahooks'
import { Result } from 'ahooks/lib/useRequest/src/types'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import { APIResponse } from '@/api/type'
import { ShowFormType } from '@/constants'
import { showMessage } from '@/utils'

interface ChildrenParams {
  showType?: ShowFormType
  setShowType?: (type: ShowFormType) => void
  createAction?: Result<any, any>
  updateAction?: Result<any, any>
  resetAndRefreshHandle: () => void
}

export interface CreateWrapProps {
  createRequest?: (params) => Promise<AxiosResponse<APIResponse>>
  updateRequest?: (id) => Promise<AxiosResponse<APIResponse>>
  refreshRequest?: () => void
  children?: React.ReactNode
  formRef?: FormInstance
}

export const ActionsContext = React.createContext<Partial<ChildrenParams>>({})

const CreateWrap: React.FC<CreateWrapProps> = (props) => {
  const { formRef, children, createRequest, updateRequest, refreshRequest }
    = props
  const [showType, setShowType] = useState<ShowFormType>(null)

  function resetAndRefreshHandle() {
    formRef?.resetFields?.()
    setShowType(null)
    refreshRequest?.()
  }

  const createAction = useRequest(
    async (params) => {
      // return tryFn(async () => {
      if (createRequest) {
        await showMessage(() => createRequest(params))
        resetAndRefreshHandle()
      }
      // });
    },
    {
      manual: true,
    },
  )
  const updateAction = useRequest(
    async (params) => {
      // return tryFn(async () => {
      if (updateRequest) {
        await showMessage(() => updateRequest(params))
        resetAndRefreshHandle()
      }
      // });
    },
    {
      manual: true,
    },
  )

  return (
    <ActionsContext.Provider
      value={{
        showType,
        setShowType,
        createAction,
        updateAction,
        resetAndRefreshHandle,
      }}
    >
      {children}
    </ActionsContext.Provider>
  )
}

export default CreateWrap
