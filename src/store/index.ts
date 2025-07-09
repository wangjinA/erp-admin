import defaultSettings from '../settings.json'

import { UserInfo } from '@/api/admin/user'
import { LogisticsBoundInfo } from '@/api/client/bound'
import { MenuItem } from '@/api/menu'
import { getEndType } from '@/routes'
import { LoginResponse } from '@/types/user'

export enum CountMapKey {
  CLIENT_ORDER_PENDING = 'client/order/pending',
}

export interface GlobalState {
  settings?: typeof defaultSettings
  userInfo?: Partial<UserInfo>
  userLoading?: boolean
  editPassword: boolean
  clientMenuList: MenuItem[]
  loginInfo?: LoginResponse
  boundInfo?: LogisticsBoundInfo
  countMap: Record<CountMapKey, number>
}

const settingsData = localStorage.getItem(`${getEndType()}-settings`)

const initialState: GlobalState = {
  settings: settingsData ? JSON.parse(settingsData) : defaultSettings,
  userInfo: JSON.parse(localStorage.getItem(`${getEndType()}-userInfo`) || '{}'),
  editPassword: false,
  clientMenuList: [],
  loginInfo: undefined,
  boundInfo: null,
  countMap: {
    [CountMapKey.CLIENT_ORDER_PENDING]: 0,
  },
}

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload
      return {
        ...state,
        settings,
      }
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload
      return {
        ...state,
        userLoading,
        userInfo,
      }
    }
    case 'editPassword': {
      const { editPassword } = action.payload
      return {
        ...state,
        editPassword,
      }
    }
    case 'set-client-menu-list': {
      const { clientMenuList } = action.payload
      return {
        ...state,
        clientMenuList,
      }
    }
    case 'set-login-info': {
      const { loginInfo } = action.payload
      return {
        ...state,
        loginInfo,
      }
    }
    case 'set-count-map': {
      const { countMap } = action.payload
      return {
        ...state,
        countMap: {
          ...state.countMap,
          ...countMap,
        },
      }
    }
    default:
      return state
  }
}
