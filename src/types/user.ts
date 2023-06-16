export interface InterUserItems {
  /** 用户id */
  id: string;
  /** 用户昵称 */
  name: string;
  /** 用户头像 */
  avatar: string;
  /** 手机号码, 主账号才有 */
  mobilePhoneNumber: string;
  /** 用户编号 */
  userNo: number;
  /** 是否子账号 */
  isSubAccount: boolean;
  /** 主账号id */
  primaryAccountId: string;
  /** 登录凭证，仅登录相关接口返回 */
  sessionToken: string;
}
