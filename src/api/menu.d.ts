export interface MenuItem {
  cacheStatus: string
  createBy: number
  createTime: string
  menuAdminType: number
  menuComponent: string
  menuDataType: number
  menuIcon: string
  menuId: number
  menuName: string
  menuPath: string
  menuPerms: string
  menuSort: number
  menuStatus: string
  menuType: string
  parentId: string
  remark: string
  showStatus: string
  updateBy: number
  updateTime: string
  children?: MenuItem[]
}
