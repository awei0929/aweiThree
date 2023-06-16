import { GlobalActionType } from '@/constants/ReduxType';
import defaultSettings from '../settings.json';
import { removeLocalStorage } from '@/utils/manageStorage';

export interface GlobalState {
  settings?: typeof defaultSettings;
  token: string | undefined;
  userInfo: Partial<any>;
}

export interface GlobalAction {
  type: GlobalActionType;
  payload: { [name: string]: any };
}

const initialState = {
  settings: defaultSettings,
  token: localStorage.getItem('token'),
  userInfo: {},
};

export default function (state = initialState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.UPDATE_SETTINGS: {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case GlobalActionType.UPDATE_USERINFO: {
      const { userInfo } = action.payload;
      return {
        ...state,
        userInfo,
      };
    }
    case GlobalActionType.UPDATE_TOKEN: {
      const { token } = action.payload;
      localStorage.setItem('token', token);

      return {
        ...state,
        token,
      };
    }
    case GlobalActionType.LOGOUT: {
      removeLocalStorage('token');
      window.location.reload();
      return {
        ...state,
        token: undefined,
        appNo: undefined,
        userInfo: {},
      };
    }
    default:
      return state;
  }
}
