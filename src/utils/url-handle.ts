import qs from 'query-string';

export type ParamsType = Record<string, any>;

/**
 * 获取路由参数
 * @returns 路由参数obj
 */
export function getUrlQuery<T extends ParamsType>(): T {
  const params = qs.parseUrl(window.location.href).query;
  return params as T;
}

/**
 * 删除url上的指定参数
 */
export function delUrlParam(paramKeyArr: string[]) {
  const url = qs.exclude(window.location.href, paramKeyArr);
  window.history.replaceState(null, null, url); // 更新地址栏
}
