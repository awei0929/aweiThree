import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from './layout/page-layout';
import Login from './pages/login/login';
import { useToken } from '@/hooks/useToken';
import store from './redux';
// import { getAccountInfo } from '@/redux/actionCreators';

function App() {
  const { isLogin } = useToken();

  useEffect(() => {
    if (isLogin) {
      // store.dispatch(getAccountInfo());
    }
  }, []);

  /**
   * 获取未登录状态的route
   * @returns
   */
  const getUnLoginRoute = () => (
    <Routes>
      <Route path="/sso" element={<Login />} />
      <Route path="*" element={<Navigate to="/sso" />} />
    </Routes>
  );

  /**
   * 获取已登录状态的route
   * @returns
   */
  const getLoginRoute = () => (
    <Routes>
      <Route path="*" element={<PageLayout />} />
    </Routes>
  );

  /** 路由返回 */
  const getRoutes = () => {
    if (isLogin) {
      return getLoginRoute();
    }
    return getUnLoginRoute();
  };

  return (
    <BrowserRouter>
      <Provider store={store}>{getRoutes()}</Provider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
