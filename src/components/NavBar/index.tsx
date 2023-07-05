import React from 'react';
import {
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Space,
  Image,
  Tag,
} from '@arco-design/web-react';
import { useSelector } from 'react-redux';
import { GlobalState } from '@/redux/global';
import store, { ReducerState } from '@/redux';

import Logo from '@/assets/logo.png';

import styles from './style/index.module.less';
import { GlobalActionType } from '@/constants/ReduxType';
import { logout } from '@/redux/actionCreators';

const { Title, Text } = Typography;

enum MenuKey {
  LOGOUT = 'logout', // 登出
  user1 = 'user1', // 登出
  user2 = 'user2', // 登出
}

function Navbar() {
  const { userInfo } = useSelector<ReducerState, GlobalState>(
    state => state.global
  );

  function backHome() {
    window.location.href = import.meta.env.VITE_APP_LOGIN_REDIRECT_URL;
  }

  function onMenuItemClick(key) {
    if (key === MenuKey.LOGOUT) {
      store.dispatch({
        type: GlobalActionType.LOGOUT,
        payload: {},
      });
    }
  }

  function isEnviroment() {
    const env = import.meta.env.MODE;
    const tags = [
      { env: '测试', id: 'test', color: 'green' },
      { env: '灰度', id: 'gray', color: 'red' },
    ];
    const { env: text, color } = tags.find(i => i.id === env) || {};
    return text && <Tag color={color}>{text}</Tag>;
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Space style={{ cursor: 'pointer' }} size={8}>
          <Image
            style={{ display: 'block' }}
            width={33}
            height={33}
            preview={false}
            src={Logo}
            onClick={() => backHome}
          />
          <Title
            style={{ margin: 0, fontSize: 18 }}
            heading={5}
            onClick={() => backHome}
          >
            THREE
          </Title>
          {isEnviroment()}
        </Space>
      </div>
      <ul className={styles.right}>
        {userInfo && (
          <li>
            <Dropdown
              position="bottom"
              trigger="click"
              droplist={
                <Menu onClickMenuItem={() => onMenuItemClick}>
                  <Menu.Item
                    key={MenuKey.LOGOUT}
                    onClick={() => {
                      store.dispatch(logout());
                    }}
                  >
                    登出
                  </Menu.Item>
                  <Menu.Item
                    key={MenuKey.user1}
                    onClick={() => {
                      store.dispatch({
                        type: GlobalActionType.USER_TOGGLE,
                        payload: 1,
                      });
                    }}
                  >
                    用户1
                  </Menu.Item>
                  <Menu.Item
                    key={MenuKey.user2}
                    onClick={() => {
                      store.dispatch({
                        type: GlobalActionType.USER_TOGGLE,
                        payload: 2,
                      });
                    }}
                  >
                    用户2
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar size={24} style={{ marginRight: 8 }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
              <Text className={styles.username}>{userInfo.name}</Text>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
