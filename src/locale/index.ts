const i18n = {
  'zh-CN': {
    // 'admin.financial': '财务管理',
    // 'admin.financial.statement': '账单列表',
    // 'admin.financial.expense': '人员费用',
    // 'admin.financial.businessMap': '快递映射',

    'admin.dict': '字典管理',

    'admin.business': '业务操作',
    'admin.business.deposit': '扫码入库',
    'admin.business.delivery': '打包出库',
    'admin.business.signfor': '扫码签收',
    'admin.business.warehousingAndArchiving': '出库存档',
    'admin.business.scanHistory': '扫码记录',
    'admin.business.returnToShelves': '海外仓退件上架',
    'admin.business.retention': '盘点滞留件',

    'admin.order': '订单管理',
    'admin.order.all': '全部订单',
    'admin.order.returnOrder': '海外仓退件订单',
    'admin.order.deliveryHistory': '订单出库记录',

    'client.order.create': '手动创建订单',
    'client.order': '订单管理',
    'client.order.all': '店铺订单',
    'client.order.toBeprocessed': '待处理订单',
    'client.order.alreadyPacked': '已打包订单',
    // 'client.order.all': '全部订单',
    // 'client.order.all': '全部订单',
    // 'client.order.all': '全部订单',
    'client.order.returnOrder': '海外仓退件订单',
    'client.order.deliveryHistory': '订单出库记录',

    'client.express': '快递管理',
    'client.express.abnormal': '问题包裹',
    'client.express.claim': '包裹认领',
    'client.express.rejection': '拒收管理',
    'client.express.returnManage': '退件管理',

    'client.store': '店铺管理',
    'client.store.list': '店铺授权',

    'client.tools': '快捷工具',
    'client.tools.shipment': '出货修改',

    'client.account': '账户管理',
    'client.account.users': '用户管理',
    'client.account.member': '会员管理',
    'client.account.setting': '账户设置',
    'client.account.role': '角色管理',
    'client.account.menu': '菜单管理',

    'admin.entrepot': '仓库管理',
    'admin.entrepot.info': '仓库信息',
    'admin.entrepot.list': '仓库列表',
    'admin.entrepot.setting': '仓库设置',

    'admin.account': '账户管理',
    'admin.account.users': '用户管理',
    'admin.account.member': '会员管理',
    'admin.account.setting': '账户设置',
    'admin.account.role': '角色管理',
    'admin.account.menu': '物流菜单',
    'admin.account.clientMenu': '店铺菜单',

    'admin.express': '快递管理',
    'admin.express.signforHistory': '签收记录',
    'admin.express.abnormal': '问题包裹',
    'admin.express.rejection': '拒收管理',
    'admin.express.returnManage': '退件管理',

    'admin.tenantry': '店铺管理',
    'admin.tenantry.users': '店铺用户',
    'admin.tenantry.role': '店铺角色',
    'admin.tenantry.menu': '店铺菜单',
    'admin.tenantry.consumer': '店铺授权',

    'admin.dashboard': '仪表盘',
    'admin.list': '列表页',
    'admin.result': '结果页',
    'admin.exception': '异常页',
    'admin.form': '表单页',
    'admin.profile': '详情页',
    'admin.visualization': '数据可视化',
    'admin.user': '个人中心',
    'admin.exception.403': '403',
    'admin.exception.404': '404',
    'admin.exception.500': '500',
    'admin.profile.basic': '基础详情页',
    'admin.list.cardList': '卡片列表',
    'admin.visualization.dataAnalysis': '分析页',
    'admin.result.error': '失败页',
    'admin.form.group': '分组表单',
    'admin.dashboard.monitor': '实时监控',
    'admin.visualization.multiDimensionDataAnalysis': '多维数据分析',
    'admin.list.searchTable': '查询表格',
    'admin.form.step': '分步表单',
    'admin.result.success': '成功页',
    'admin.user.info': '用户信息',
    'admin.user.setting': '用户设置',
    'admin.user.switchRoles': '切换角色',
    'admin.user.role.admin': '管理员',
    'admin.user.role.user': '普通用户',
    'admin.dashboard.workplace': '工作台',
    'navbar.logout': '退出登录',
    'settings.title': '页面配置',
    'settings.themeColor': '主题色',
    'settings.content': '内容区域',
    'settings.navbar': '导航栏',
    'settings.menuWidth': '菜单宽度 (px)',
    'settings.navbar.theme.toLight': '点击切换为亮色模式',
    'settings.navbar.theme.toDark': '点击切换为暗黑模式',
    'settings.menu': '菜单栏',
    'settings.footer': '底部',
    'settings.otherSettings': '其他设置',
    'settings.colorWeek': '色弱模式',
    'settings.alertContent':
      '配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。',
    'settings.copySettings': '复制配置',
    'settings.copySettings.message':
      '复制成功，请粘贴到 src/settings.json 文件中',
    'settings.close': '关闭',
    'settings.color.tooltip':
      '根据主题颜色生成的 10 个梯度色',
    'message.tab.title.message': '消息',
    'message.tab.title.notice': '通知',
    'message.tab.title.todo': '待办',
    'message.allRead': '全部已读',
    'message.seeMore': '查看更多',
    'message.empty': '清空',
    'message.empty.tips': '暂无内容',
    'message.lang.tips': '语言切换至 ',
    'navbar.search.placeholder': '输入内容查询',
  },
  'en-US': {
    'admin.welcome': 'Welcome',
    'admin.dashboard': 'Dashboard',
    'admin.list': 'List',
    'admin.result': 'Result',
    'admin.exception': 'Exception',
    'admin.form': 'Form',
    'admin.profile': 'Profile',
    'menu.visualization': 'Data Visualization',
    'menu.user': 'User Center',
    'menu.exception.403': '403',
    'menu.exception.404': '404',
    'menu.exception.500': '500',
    'menu.profile.basic': 'Basic Profile',
    'menu.list.cardList': 'Card List',
    'menu.visualization.dataAnalysis': 'Analysis',
    'menu.result.error': 'Error',
    'menu.form.group': 'Group Form',
    'menu.dashboard.monitor': 'Real-time Monitor',
    'menu.visualization.multiDimensionDataAnalysis': 'Multi-D Analysis',
    'menu.list.searchTable': 'Search Table',
    'menu.form.step': 'Step Form',
    'menu.result.success': 'Success',
    'menu.user.info': 'User Info',
    'menu.user.setting': 'User Setting',
    'menu.user.switchRoles': 'Switch Roles',
    'menu.user.role.admin': 'Admin',
    'menu.user.role.user': 'General User',
    'menu.dashboard.workplace': 'Workplace',
    'navbar.logout': 'Logout',
    'settings.title': 'Settings',
    'settings.themeColor': 'Theme Color',
    'settings.content': 'Content Setting',
    'settings.navbar': 'Navbar',
    'settings.menuWidth': 'Menu Width (px)',
    'settings.navbar.theme.toLight': 'Click to use light mode',
    'settings.navbar.theme.toDark': 'Click to use dark mode',
    'settings.menu': 'Menu',
    'settings.footer': 'Footer',
    'settings.otherSettings': 'Other Settings',
    'settings.colorWeek': 'Color Week',
    'settings.alertContent':
      'After the configuration is only temporarily effective, if you want to really affect the project, click the "Copy Settings" button below and replace the configuration in settings.json.',
    'settings.copySettings': 'Copy Settings',
    'settings.copySettings.message':
      'Copy succeeded, please paste to file src/settings.json.',
    'settings.close': 'Close',
    'settings.color.tooltip':
      '10 gradient colors generated according to the theme color',
    'message.tab.title.message': 'Message',
    'message.tab.title.notice': 'Notice',
    'message.tab.title.todo': 'ToDo',
    'message.allRead': 'All Read',
    'message.seeMore': 'SeeMore',
    'message.empty': 'Empty',
    'message.empty.tips': 'No Content',
    'message.lang.tips': 'Language switch to ',
    'navbar.search.placeholder': 'Please search',
  },
}

export default i18n
