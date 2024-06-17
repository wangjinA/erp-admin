import auth, { AuthParams } from '@/utils/authentication';
import { useEffect, useMemo, useState } from 'react';
import i18n from './locale';

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
  {
    name: 'menu.business',
    key: 'business',
    children: [
      {
        name: 'menu.business.deposit',
        key: 'business/deposit',
      },
      {
        name: 'menu.business.delivery',
        key: 'business/delivery',
      },
      {
        name: 'menu.business.signfor',
        key: 'business/signfor',
      },
      // {
      //   name: 'menu.business.warehousingAndArchiving',
      //   key: 'business/warehousingAndArchiving',
      // },
      {
        name: 'menu.business.scanHistory',
        key: 'business/scanHistory',
      },
      {
        name: 'menu.business.returnToShelves',
        key: 'business/returnToShelves',
      },
      {
        name: 'menu.business.retention',
        key: 'business/retention',
      },
    ],
  },
  {
    name: 'menu.order',
    key: 'order',
    children: [
      {
        name: 'menu.order.all',
        key: 'order/all',
      },
      {
        name: 'menu.order.returnOrder',
        key: 'order/returnOrder',
      },
      {
        name: 'menu.order.deliveryHistory',
        key: 'order/deliveryHistory',
      },
    ],
  },
  {
    name: 'menu.entrepot',
    key: 'entrepot',
    children: [
      {
        name: 'menu.entrepot.info',
        key: 'entrepot/info',
      },
      {
        name: 'menu.entrepot.list',
        key: 'entrepot/list',
      },
      {
        name: 'menu.entrepot.setting',
        key: 'entrepot/setting',
      },
    ],
  },
  {
    name: 'menu.account',
    key: 'account',
    children: [
      {
        name: 'menu.account.users',
        key: 'account/users',
      },
      // {
      //   name: 'menu.account.member',
      //   key: 'account/member',
      // },
      {
        name: 'menu.account.setting',
        key: 'account/setting',
      },
      {
        name: 'menu.account.permission',
        key: 'account/permission',
      },
    ],
  },
  {
    name: 'menu.express',
    key: 'express',
    children: [
      {
        name: 'menu.express.signforHistory',
        key: 'express/signforHistory',
      },
      // {
      //   name: 'menu.express.abnormal',
      //   key: 'express/abnormal',
      // },
      {
        name: 'menu.express.rejection',
        key: 'express/rejection',
      },
      {
        name: 'menu.express.returnManage',
        key: 'express/returnManage',
      },
    ],
  },
  {
    name: 'menu.dashboard',
    key: 'dashboard',
    children: [
      {
        name: 'menu.dashboard.workplace',
        key: 'dashboard/workplace',
      },
      {
        name: 'menu.dashboard.monitor',
        key: 'dashboard/monitor',
        requiredPermissions: [
          { resource: 'menu.dashboard.monitor', actions: ['write'] },
        ],
      },
    ],
  },
  {
    name: 'menu.visualization',
    key: 'visualization',
    children: [
      {
        name: 'menu.visualization.dataAnalysis',
        key: 'visualization/data-analysis',
        requiredPermissions: [
          { resource: 'menu.visualization.dataAnalysis', actions: ['read'] },
        ],
      },
      {
        name: 'menu.visualization.multiDimensionDataAnalysis',
        key: 'visualization/multi-dimension-data-analysis',
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
    name: 'menu.list',
    key: 'list',
    children: [
      {
        name: 'menu.list.searchTable',
        key: 'list/search-table',
      },
      {
        name: 'menu.list.cardList',
        key: 'list/card',
      },
    ],
  },
  {
    name: 'menu.form',
    key: 'form',
    children: [
      {
        name: 'menu.form.group',
        key: 'form/group',
        requiredPermissions: [
          { resource: 'menu.form.group', actions: ['read', 'write'] },
        ],
      },
      {
        name: 'menu.form.step',
        key: 'form/step',
        requiredPermissions: [
          { resource: 'menu.form.step', actions: ['read'] },
        ],
      },
    ],
  },
  {
    name: 'menu.profile',
    key: 'profile',
    children: [
      {
        name: 'menu.profile.basic',
        key: 'profile/basic',
      },
    ],
  },

  {
    name: 'menu.result',
    key: 'result',
    children: [
      {
        name: 'menu.result.success',
        key: 'result/success',
        breadcrumb: false,
      },
      {
        name: 'menu.result.error',
        key: 'result/error',
        breadcrumb: false,
      },
    ],
  },
  {
    name: 'menu.exception',
    key: 'exception',
    children: [
      {
        name: 'menu.exception.403',
        key: 'exception/403',
      },
      {
        name: 'menu.exception.404',
        key: 'exception/404',
      },
      {
        name: 'menu.exception.500',
        key: 'exception/500',
      },
    ],
  },
  {
    name: 'menu.user',
    key: 'user',
    children: [
      {
        name: 'menu.user.info',
        key: 'user/info',
      },
      {
        name: 'menu.user.setting',
        key: 'user/setting',
      },
    ],
  },
];

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

const useRoute = (userPermission): [IRoute[], string] => {
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

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
