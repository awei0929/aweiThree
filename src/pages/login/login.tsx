import React, { memo, useEffect } from 'react';
import { Button, Card, Notification } from '@arco-design/web-react';
import { AxiosGetLoginSso, AxiosGetSsoRedirect } from '@/api/login';
import { getUrlQuery } from '@/utils/url-handle';

const Login = memo(() => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const { token, extra } = getUrlQuery();
  const getLoginAddress = async () => {
    try {
      const res = await AxiosGetSsoRedirect({ extra: extra || '' });
      window.location.href = res.data.url;
    } catch {
      Notification.error({ title: '跳转地址失败', content: '' });
    }
  };

  // 获取登陆状态
  const init = async () => {
    if (token) {
      const {
        data: { token: auth },
      } = await AxiosGetLoginSso({ token });

      localStorage.setItem('token', auth);
      window.location.href = '/';
      return;
    }
    getLoginAddress();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={style}>
      <Card style={{ width: 300 }} title="火族创作者业务后台">
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={getLoginAddress}>
            统一授权登录
          </Button>
        </div>
      </Card>
    </div>
  );
});

export default Login;
