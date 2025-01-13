import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageLayout from './layout/page-layout';
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
    return getLoginRoute();

    // return getUnLoginRoute();
  };

  return (
    <BrowserRouter>
      <Provider store={store}>{getRoutes()}</Provider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
