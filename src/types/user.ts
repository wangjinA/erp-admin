export interface SysUser {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  id: string
  userName: string
  userPassword: string
  headImg: string
  userLoginAccount: string
  telephone: string
  tenantryId: string
  deptId: string
  userSex: number
  userStatus: number
  isAdmin: number
  remark: string
  deleteStatus: number
}

export interface SysMenuTenantryVo {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  menuId: string
  mainMenuId: string
  parentId: string
  tenantryId: string
  menuName: string
  menuIcon: string
  menuSort: number
  menuPath: string
  menuComponent: string
  menuType: string
  menuPerms: string
  menuDataType: number
  menuAdminType: number
  menuStatus: string
  showStatus: string
  cacheStatus: string
  childDataList: SysMenuTenantryVo[]
}

export interface LoginResponse {
  token: string
  sysUser: SysUser
  sysMenuTenantryVoList: SysMenuTenantryVo[]
  permissions: string[]
  logo: any // Change this to a specific type if the structure of the logo object is known
}
