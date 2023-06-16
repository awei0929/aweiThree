import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Link, useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import qs from 'query-string';
import Navbar from '../components/NavBar';
import LoadingBar from '../components/LoadingBar';
import { routes, defaultRoute } from '@/routes';
import { isArray } from '@/utils/is';
import { ReducerState } from '@/redux';
import styles from './style/layout.module.less';
import { getFlattenRoutes, usePermission } from './usePermission';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

const { Sider } = Layout;
const { Content } = Layout;

function renderRoutes() {
  const nodes = [];
  function travel(_routes, level) {
    return _routes.map(route => {
      const titleDom = (
        <>
          <span style={{ fontSize: 18, verticalAlign: 'middle' }}>
            {route.icon}
          </span>{' '}
          {route.name}
        </>
      );
      if (route.hidden) {
        return;
      }
      if (
        route.component &&
        (!isArray(route.children) ||
          (isArray(route.children) && !route.children.length))
      ) {
        if (level > 1) {
          return <MenuItem key={route.key}>{titleDom}</MenuItem>;
        }
        nodes.push(
          <Link to={`/${route.key}`} key={route.key}>
            <MenuItem key={route.key}>{titleDom}</MenuItem>
          </Link>
        );
      }
      if (route.component && isArray(route.children)) {
        nodes.push(
          <Link to={`/${route.key}`} key={route.key}>
            <MenuItem key={route.key}>{titleDom}</MenuItem>
          </Link>
        );
      }
      if (
        !route.component &&
        isArray(route.children) &&
        route.children.length
      ) {
        if (level > 1) {
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1)}
            </SubMenu>
          );
        }
        nodes.push(
          <SubMenu key={route.key} title={titleDom}>
            {travel(route.children, level + 1)}
          </SubMenu>
        );
      }
      return null;
    });
  }
  travel(routes, 1);
  return nodes;
}

function PageLayout() {
  const { pathname } = window.location;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const navigate = useNavigate();

  const { settings } = useSelector((state: ReducerState) => state.global);

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const loadingBarRef = useRef(null);
  const { routeList } = usePermission(routes);

  // 使用history跳转时，更新菜单选中项
  useEffect(() => {
    setSelectedKeys([currentComponent]);
  }, [currentComponent]);

  const navbarheight = settings.navbarHeight;
  const menuwidth = collapsed ? 48 : settings.menuWidth;

  const flattenRoutes = useMemo(
    () => getFlattenRoutes(routeList) || [],
    [routeList]
  );

  const onClickMenuItem = key => {
    const currentRoute = flattenRoutes.find(r => r.key === key);
    const { component } = currentRoute;
    // @ts-ignore
    const preload = component.preload();
    loadingBarRef.current.loading();
    preload.then(() => {
      setSelectedKeys([key]);
      navigate(`/${key}`);
      loadingBarRef.current.success();
    });
  };

  const toggleCollapse = () => {
    setCollapsed(collapsed => !collapsed);
  };

  const paddingLeft = { paddingLeft: menuwidth };
  const paddingTop = { paddingTop: navbarheight };
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  return (
    <Layout className={styles.layout}>
      <LoadingBar ref={loadingBarRef} />
      <div className={styles.layoutNavbar} style={{ height: navbarheight }}>
        <Navbar />
      </div>
      <Layout>
        <Sider
          className={styles.layoutSider}
          width={menuwidth}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          collapsible
          breakpoint="xl"
          style={paddingTop}
        >
          <div className={styles.menuWrapper}>
            <Menu
              collapse={collapsed}
              onClickMenuItem={onClickMenuItem}
              selectedKeys={selectedKeys}
              autoOpen={false}
              accordion
            >
              {renderRoutes()}
            </Menu>
          </div>
          <div className={styles.collapseBtn} onClick={toggleCollapse}>
            {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
          </div>
        </Sider>
        <Layout className={styles.layoutContent} style={paddingStyle}>
          <Content className={styles.rootContent}>
            <Routes>
              {flattenRoutes.length &&
                flattenRoutes.map(route => (
                  <Route
                    key={route.key}
                    path={`/${route.key}`}
                    element={
                      <Suspense fallback={<div>加载中...</div>}>
                        <route.component />
                      </Suspense>
                    }
                  />
                ))}
              {flattenRoutes.length && (
                <Route
                  path="*"
                  element={<Navigate to={`/${defaultRoute}`} />}
                />
              )}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
