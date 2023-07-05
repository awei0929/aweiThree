import React, { ComponentType } from 'react';
import { IconGift } from '@arco-design/web-react/icon';

export interface RouteType {
  name: string;
  /**
   * 路由key，同时也是路由path
   */
  key: string;
  /**
   * icon 图标。通常使用用icon组件
   */
  icon?: any;
  /**
   * 是否在侧边栏隐藏。默认false
   */
  hidden?: boolean;
  /**
   * 组件在pages中的路径
   */
  componentPath?: string;
  /**
   * 子级
   */
  children?: RouteType[];
  /**
   * 组件实例
   */
  component?: ComponentType;
}

export const defaultRoute = 'home';

export const routes: RouteType[] = [
  {
    name: '欢迎页',
    key: 'home',
    icon: <IconGift />,
    componentPath: 'home.tsx',
    hidden: false,
  },
  {
    name: '自定义搜索栏组件页',
    key: 'test2',
    icon: <IconGift />,
    componentPath: 'testComponents.tsx',
    hidden: false,
  },
  {
    name: '自定义搜索栏组件页',
    key: 'test1',
    icon: <IconGift />,
    componentPath: 'test.tsx',
    hidden: false,
  },
  {
    name: '圆',
    key: 'circle',
    icon: <IconGift />,
    componentPath: 'circle.tsx',
    hidden: false,
  },
  {
    name: '点模型',
    key: 'points',
    icon: <IconGift />,
    componentPath: 'points.tsx',
    hidden: false,
  },
  {
    name: 'UV动画',
    key: 'animationUV',
    icon: <IconGift />,
    componentPath: 'animationUV.tsx',
    hidden: false,
  },
  {
    name: 'GLTF模型',
    key: 'gltfModel',
    icon: <IconGift />,
    componentPath: 'gltfModel.tsx',
    hidden: false,
  },
];
export const routes2: RouteType[] = [
  {
    name: '欢迎页',
    key: 'home',
    icon: <IconGift />,
    componentPath: 'home.tsx',
    hidden: false,
  },
  {
    name: '欢迎页',
    key: 'myRouter',
    icon: <IconGift />,
    componentPath: 'myRouter.tsx',
    hidden: false,
  },
];
