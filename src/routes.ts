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
    name: 'menu.tool-mo-excel',
    key: 'mo/business',
    // children: [
    //   {
    //     name: 'menu.business.deposit',
    //     key: 'business/deposit',
    //   },
    //   {
    //     name: 'menu.business.delivery',
    //     key: 'business/delivery',
    //   },
    //   {
    //     name: 'menu.business.signfor',
    //     key: 'business/signfor',
    //   },
    //   {
    //     name: 'menu.business.warehousingAndArchiving',
    //     key: 'business/warehousingAndArchiving',
    //   },
    //   {
    //     name: 'menu.business.scanHistory',
    //     key: 'business/scanHistory',
    //   },
    //   {
    //     name: 'menu.business.returnToShelves',
    //     key: 'business/returnToShelves',
    //   },
    //   {
    //     name: 'menu.business.retention',
    //     key: 'business/retention',
    //   },
    // ],
  },
  {
    name: 'menu.tool-coupang-excel',
    key: 'coupang/business',
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
