import { ThunkAction } from 'redux-thunk';
import { GlobalAction, GlobalState } from './global';
import { axiosGetAccountInfo } from '@/api/user';
import { GlobalActionType } from '@/constants/ReduxType';

/**
 * 账号登出
 * @returns
 */
export function logout() {
  return function (dispatch) {
    dispatch({ type: GlobalActionType.LOGOUT, payload: {} });
    window.location.reload();
  };
}

/**
 * 获取账号信息
 * @returns
 */
export function getAccountInfo(): ThunkAction<
  Promise<void>,
  GlobalState,
  unknown,
  GlobalAction
> {
  return function (_dispatch): Promise<void> {
    return axiosGetAccountInfo().then(({ data }) => {
      _dispatch({
        type: GlobalActionType.UPDATE_USERINFO,
        payload: { userInfo: data },
      });
    });
  };
}
