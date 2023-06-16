import { RouteType } from '@/routes';
import { isArray } from '@/utils/is';
import lazyload from '@/utils/lazyload';
import { useEffect, useState } from 'react';

// 匹配懒加载文件路径
const matchingPaths = (path: string) => {
  if (path.match(/\.tsx$/)) {
    return `../pages/${path}`;
  }
  return `../pages/${path}/index.tsx`;
};

/**
 * 动态加载组件
 * @param routes
 */
export function getFlattenRoutes(routes: RouteType[]) {
  const mod = import.meta.glob('../pages/**/[a-z[]*.tsx');
  const res: RouteType[] = [];
  function travel(_routes: RouteType[]) {
    _routes.forEach(route => {
      if (
        route.componentPath &&
        (!isArray(route.children) ||
          (isArray(route.children) && !route.children.length))
      ) {
        route.component = lazyload(mod[matchingPaths(route.componentPath)]);
        res.push(route);
      } else if (route.componentPath && isArray(route.children)) {
        route.component = lazyload(mod[matchingPaths(route.componentPath)]);
        res.push(route);
        travel(route.children);
      } else if (
        !route.componentPath &&
        isArray(route.children) &&
        route.children.length
      ) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}

/**
 * 路由鉴权
 */
export function usePermission(routes: RouteType[]) {
  const [routeList, setRoutes] = useState([]);
  const [flattenRoutes, setFlattenRoutes] = useState([]);

  useEffect(() => {
    // 从服务端动态获取路由时
    // getMenu().then(({ data: { results } }) => {
    //   console.log(results, 'results');
    //   function filterHasPermissioRouter(_routes) {
    //     /**
    //      * 返回列表中所有的key,并且平铺
    //      * @param route
    //      * @returns
    //      */
    //     function getAsyncRouteKey(route): string[] {
    //       const arr: string[] = [];
    //       route.forEach(el => {
    //         el.name && arr.push(el.name);
    //         if (el?.menus?.length) {
    //           arr.push(...getAsyncRouteKey(el.menus));
    //         }
    //       });
    //       arr.push('welcome');
    //       return arr;
    //     }
    //     const keys = getAsyncRouteKey(_routes);

    //     /**
    //      * 返回有权限的路由表
    //      * @param _routes
    //      * @returns
    //      */
    //     function getAllowAccessRoute(_routes): string[] {
    //       const arr = [];
    //       _routes.forEach(el => {
    //         if (el?.children?.length) {
    //           el.children = getAllowAccessRoute(el.children);
    //         }
    //         keys.includes(el.key) && arr.push(el);
    //       });
    //       return arr;
    //     }
    //     return getAllowAccessRoute(routes);
    //   }
    //   const allowAccessMenus = filterHasPermissioRouter(results);
    //   setRoutes(allowAccessMenus);
    //   setFlattenRoutes(getFlattenRoutes(allowAccessMenus));
    // });
    setRoutes(routes);
    setFlattenRoutes(getFlattenRoutes(routes));
  }, []);

  return { routeList, flattenRoutes };
}
