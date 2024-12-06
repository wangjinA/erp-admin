import defaultSettings from '../settings.json'

import { UserInfo } from '@/api/admin/user'
import { MenuItem } from '@/api/client/menu'
import { getEndType } from '@/routes'

export interface GlobalState {
  settings?: typeof defaultSettings
  userInfo?: Partial<UserInfo>
  // {
  // name?: string;
  // avatar?: string;
  // job?: string;
  // organization?: string;
  // location?: string;
  // email?: string;
  // permissions: Record<string, string[]>;
  // };
  userLoading?: boolean
  editPassword: boolean
  clientMenuList: MenuItem[]
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: JSON.parse(localStorage.getItem(`${getEndType()}-userInfo`) || '{}'),
  editPassword: false,
  clientMenuList: [],
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
    default:
      return state
  }
}
