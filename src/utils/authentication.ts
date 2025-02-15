/**
 * { data-analysis:  ['read', 'write'] }
 */

import { LoginResponse } from '@/types/user'

export type UserPermission = Record<string, string[]>

interface Auth {
  resource: string | RegExp
  actions?: string[]
}

export interface AuthParams {
  requiredPermissions?: Array<Auth>
  oneOfPerm?: boolean
}

function judge(actions: string[], perm: string[]) {
  if (!perm || !perm.length) {
    return false
  }

  if (perm.join('') === '*') {
    return true
  }

  return actions.every(action => perm.includes(action))
}

function auth(params: Auth, userPermission: UserPermission) {
  const { resource, actions = [] } = params
  if (resource instanceof RegExp) {
    const permKeys = Object.keys(userPermission)
    const matchPermissions = permKeys.filter(item => item.match(resource))
    if (!matchPermissions.length) {
      return false
    }
    return matchPermissions.every((key) => {
      const perm = userPermission[key]
      return judge(actions, perm)
    })
  }

  const perm = userPermission[resource]
  return judge(actions, perm)
}

export default (params: AuthParams, loginInfo: LoginResponse) => {
  // const { requiredPermissions, oneOfPerm } = params;
  // if (Array.isArray(requiredPermissions) && requiredPermissions.length) {
  //   let count = 0;
  //   for (const rp of requiredPermissions) {
  //     if (auth(rp, userPermission)) {
  //       count++;
  //     }
  //   }
  //   return oneOfPerm ? count > 0 : count === requiredPermissions.length;
  // }
  return true
}
