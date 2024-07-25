import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';
import i18n from './locale';
export enum EndType {
  /**
   * 管理端
   */
  ADMIN = 'admin',
  /**
   * 用户端
   */
  CLIENT = 'client',
}

export type IRoute = AuthParams & {
  name: keyof typeof i18n['zh-CN'];
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
};

export const routes: IRoute[] = [
  // {
  //   name: 'admin.financial',
  //   key: 'admin/financial',
  //   children: [
  //     {
  //       name: 'admin.financial.statement', // 账单
  //       key: 'admin/financial/statement',
  //     },
  //     {
  //       name: 'admin.financial.expense', // 账单
  //       key: 'admin/financial/expense',
  //     },
  //     {
  //       name: 'admin.financial.businessMap', // 快递映射
  //       key: 'admin/financial/businessMap',
  //     },
  //   ]
  // },
  {
    name: 'admin.dict',
    key: 'admin/dict/list',
    // children: [
    //   {
    //     name: 'admin.dict.list',
    //     key: 'admin/dict/list',
    //   },
    // ]
  },
  {
    name: 'client.order',
    key: 'client.order',
    children: [
      {
        name: 'client.order.create',
        key: 'client/order/create',
      },
      {
        name: 'client.order.all',
        key: 'client/order/all',
      },
      // {
      //   name: 'client.order.toBeprocessed',
      //   key: 'client/order/toBeprocessed',
      // },
      {
        name: 'client.order.alreadyPacked',
        key: 'client/order/alreadyPacked',
      },
    ],
  },
  {
    name: 'client.store',
    key: 'client.store',
    children: [
      {
        name: 'client.store.list',
        key: 'client/store/list',
      },
      // {
      //   name: 'client.order.all',
      //   key: 'client/order/all',
      // },
      // {
      //   name: 'client.order.returnOrder',
      //   key: 'client/order/returnOrder',
      // },
      // {
      //   name: 'client.order.deliveryHistory',
      //   key: 'client/order/deliveryHistory',
      // },
    ],
  },
  {
    name: 'admin.business',
    key: 'admin/business',
    children: [
      {
        name: 'admin.business.deposit',
        key: 'admin/business/deposit',
      },
      {
        name: 'admin.business.delivery',
        key: 'admin/business/delivery',
      },
      {
        name: 'admin.business.signfor',
        key: 'admin/business/signfor',
      },
      // {
      //   name: 'admin.business.warehousingAndArchiving',
      //   key: 'admin/business/warehousingAndArchiving',
      // },
      {
        name: 'admin.business.scanHistory',
        key: 'admin/business/scanHistory',
      },
      {
        name: 'admin.business.returnToShelves',
        key: 'admin/business/returnToShelves',
      },
      {
        name: 'admin.business.retention',
        key: 'admin/business/retention',
      },
    ],
  },
  {
    name: 'admin.order',
    key: 'admin/order',
    children: [
      {
        name: 'admin.order.all',
        key: 'admin/order/all',
      },
      {
        name: 'admin.order.returnOrder',
        key: 'admin/order/returnOrder',
      },
      {
        name: 'admin.order.deliveryHistory',
        key: 'admin/order/deliveryHistory',
      },
    ],
  },
  {
    name: 'admin.entrepot',
    key: 'admin/entrepot',
    children: [
      {
        name: 'admin.entrepot.info',
        key: 'admin/entrepot/info',
      },
      {
        name: 'admin.entrepot.list',
        key: 'admin/entrepot/list',
      },
      {
        name: 'admin.entrepot.setting',
        key: 'admin/entrepot/setting',
      },
    ],
  },
  {
    name: 'admin.account',
    key: 'admin/account',
    children: [
      {
        name: 'admin.account.users',
        key: 'admin/account/users',
      },
      // {
      //   name: 'admin.account.member',
      //   key: 'admin/account/member',
      // },
      {
        name: 'admin.account.setting',
        key: 'admin/account/setting',
      },
      {
        name: 'admin.account.permission',
        key: 'admin/account/permission',
      },
    ],
  },
  {
    name: 'admin.express',
    key: 'admin/express',
    children: [
      {
        name: 'admin.express.signforHistory',
        key: 'admin/express/signforHistory',
      },
      // {
      //   name: 'admin.express.abnormal',
      //   key: 'admin/express/abnormal',
      // },
      {
        name: 'admin.express.rejection',
        key: 'admin/express/rejection',
      },
      {
        name: 'admin.express.returnManage',
        key: 'admin/express/returnManage',
      },
    ],
  },
  {
    name: 'admin.dashboard',
    key: 'admin/dashboard',
    children: [
      {
        name: 'admin.dashboard.workplace',
        key: 'admin/dashboard/workplace',
      },
      {
        name: 'admin.dashboard.monitor',
        key: 'admin/dashboard/monitor',
        requiredPermissions: [
          { resource: 'menu.dashboard.monitor', actions: ['write'] },
        ],
      },
    ],
  },
  {
    name: 'admin.visualization',
    key: 'admin/visualization',
    children: [
      {
        name: 'admin.visualization.dataAnalysis',
        key: 'admin/visualization/data-analysis',
        requiredPermissions: [
          { resource: 'menu.visualization.dataAnalysis', actions: ['read'] },
        ],
      },
      {
        name: 'admin.visualization.multiDimensionDataAnalysis',
        key: 'admin/visualization/multi-dimension-data-analysis',
        requiredPermissions: [
          {
            resource: 'menu.visualization.dataAnalysis',
            actions: ['read', 'write'],
          },
          {
            resource: 'menu.visualization.multiDimensionDataAnalysis',
            actions: ['write'],
          },
        ],
        oneOfPerm: true,
      },
    ],
  },
  {
    name: 'admin.list',
    key: 'admin/list',
    children: [
      {
        name: 'admin.list.searchTable',
        key: 'admin/list/search-table',
      },
      {
        name: 'admin.list.cardList',
        key: 'admin/list/card',
      },
    ],
  },
  {
    name: 'admin.form',
    key: 'admin/form',
    children: [
      {
        name: 'admin.form.group',
        key: 'admin/form/group',
        requiredPermissions: [
          { resource: 'menu.form.group', actions: ['read', 'write'] },
        ],
      },
      {
        name: 'admin.form.step',
        key: 'admin/form/step',
        requiredPermissions: [
          { resource: 'menu.form.step', actions: ['read'] },
        ],
      },
    ],
  },
  {
    name: 'admin.profile',
    key: 'admin/profile',
    children: [
      {
        name: 'admin.profile.basic',
        key: 'admin/profile/basic',
      },
    ],
  },

  {
    name: 'admin.result',
    key: 'admin/result',
    children: [
      {
        name: 'admin.result.success',
        key: 'admin/result/success',
        breadcrumb: false,
      },
      {
        name: 'admin.result.error',
        key: 'admin/result/error',
        breadcrumb: false,
      },
    ],
  },
  {
    name: 'admin.exception',
    key: 'admin/exception',
    children: [
      {
        name: 'admin.exception.403',
        key: 'admin/exception/403',
      },
      {
        name: 'admin.exception.404',
        key: 'admin/exception/404',
      },
      {
        name: 'admin.exception.500',
        key: 'admin/exception/500',
      },
    ],
  },
  {
    name: 'admin.user',
    key: 'admin/user',
    children: [
      {
        name: 'admin.user.info',
        key: 'admin/user/info',
      },
      {
        name: 'admin.user.setting',
        key: 'admin/user/setting',
      },
    ],
  },
].filter((item: any) => item.name.startsWith(getEndType())) as any;

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};


export const LoginPathMap = {
  [EndType.ADMIN]: '/admin/login',
  [EndType.CLIENT]: '/client/login',
};

export const EndTypeTextMap = {
  [EndType.ADMIN]: '物流端',
  [EndType.CLIENT]: '商家端',
};

export const getLoginPagePath = () => {
  return LoginPathMap[getEndType()] || LoginPathMap[EndType.ADMIN];
};

/**
 * 判断当前端类型
 */
export function getEndType(): EndType {
  return location.pathname.startsWith('/admin')
    ? EndType.ADMIN
    : EndType.CLIENT;
}

export function getPathEndKey(): EndType {
 return (location.pathname.split('/').filter(Boolean)[0]) as EndType;
}

export function getEndTypeName() {
  return EndTypeTextMap[getEndType()];
}

export const toLoginPage = () => {
  const loginPagePath = getLoginPagePath();
  if (!location.pathname.endsWith(loginPagePath)) {
    window.location.href = loginPagePath;
  }
};

type DefaultRouteMap = Partial<Record<EndType, string>>;

const useRoute = (userPermission): [IRoute[], DefaultRouteMap] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRouteMap = useMemo(() => {
    return Object.values(EndType).reduce<DefaultRouteMap>((pre, endKey) => {
      const first = permissionRoute.find((item) => item.key.startsWith(endKey));
      if (first) {
        const firstRoute = first?.children?.[0]?.key || first.key;
        pre[endKey] = firstRoute;
      }
      return pre;
    }, {})
  }, [permissionRoute]);

  return [permissionRoute, defaultRouteMap];
};

export default useRoute;
