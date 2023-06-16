import service from '@/service/fetch';
import { LoginSsoParams, SsoParams } from '@/types/login';

enum api {
  ssoRedirect = '/passport/redirect',
  ssoLogin = '/passport/login',
  userInfo = '/me',
  menu = '/menu',
}
/**
 * 获取SSO登录跳转地址
 */
export function AxiosGetSsoRedirect(params: SsoParams) {
  return service.get(api.ssoRedirect, params);
}

/** sso登陆 */
export function AxiosGetLoginSso(
  params: LoginSsoParams
): Promise<API.DetailResponse<{ token: string }>> {
  return service.get(api.ssoLogin, params);
}
