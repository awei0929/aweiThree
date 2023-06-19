import { Card } from '@arco-design/web-react';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import * as dat from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

function Test() {
  const ref = useRef<HTMLDivElement>(null);
  const refCard = useRef<HTMLDivElement>(null);
  const [wH, setWH] = useState({ width: 800, height: 600 });
  const [r] = useState(100);
  const [y] = useState(100);
  function aa() {
    // 创建一个三维场景 (场景)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(0, 0, 0)');
    // 渲染函数
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
    });
    // 帧率
    const stats = new Stats();
    // 圆环缓冲扭结几何体
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    // 物体外观 (材质)
    // MeshBasicMaterial 不受光照影响 MeshDepthMaterial
    const material = new THREE.LineDashedMaterial();

    // 创建一个网格模型：表示生活中的物体
    const mesh = new THREE.Mesh(geometry, material);
    //  创建三维坐标轴 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    const axesHelper = new THREE.AxesHelper(500);
    // 创建一个点光源
    const pointLight = new THREE.PointLight(0xff0000, 1, 300);
    // 添加一个环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    // 定义相机输出画布点尺寸
    // const width = 800;
    // const height = 600;
    const width = wH.width - 32;
    const height = wH.height - 50;
    // 有场景了现在需要有相机来记录这个场景 创建一个透视投影相机
    // fov 垂直方向的视野角度
    // aspect 摄像机的宽高比
    // near 摄影机平截头体斤平面
    // fav 摄影机平截头体远平面
    // 视锥体 两个平面 中间是模型
    const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
    // 创建轨道控制器
    new OrbitControls(camera, renderer.domElement);
    // // 物体的xyz
    // const meshSetPosition = gui.addFolder('meshSetPosition');
    // 定义一个长方体 (几何体)
    // const geometry = new THREE.BoxGeometry(3, 3, 3); // 长宽高
    scene.add(axesHelper); // 添加坐标轴到三维场景中
    // 设置网格，模型在三维中的坐标
    mesh.position.set(0, 50, 0); // x y z
    // mesh.scale.set(20, 20, 20); // s x y z
    // 把这个模型添加进场景中
    scene.add(mesh);
    // gui
    const gui = new GUI();
    console.log(gui, '666');
    gui.domElement.style.top = '100px';
    gui.domElement.style.right = '40px';
    gui
      .add(mesh.position, 'x', 0, 180)
      .name('X轴')
      .onChange(v => {
        console.log(v);
        mesh.position.y = v;
      });
    const obj = {
      color: 0xffffff,
    };
    gui
      .addColor(obj, 'color')
      .name('颜色')
      .onChange(v => {
        material.color.set(v);
      });
    gui.add(mesh.position, 'y', 0, 180).name('Y轴');
    gui.add(mesh.position, 'z', 0, 180).name('Z轴');

    // 点光源的位置
    pointLight.position.set(150, 150, 150);

    // 添加到场景中
    // scene.add(pointLight);
    // 光源辅助观察
    // const poinLightsHelper = new THREE.PointLightHelper(pointLight, 2);
    // 添加到场景中
    // scene.add(poinLightsHelper);

    scene.add(ambient);
    // 添加一个平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(150, 120, 100);
    directionalLight.target = mesh;
    scene.add(directionalLight);
    // 平行光辅助观察
    const helper = new THREE.DirectionalLightHelper(
      directionalLight,
      5,
      0xffffff
    );
    scene.add(helper);
    // 创建网络辅助工具
    const gridHelper = new THREE.GridHelper(20, 20);
    // gridHelper.material.transparent = true;
    // gridHelper.material.opacity = 0.5;
    gridHelper.scale.set(50, 50, 50);
    scene.add(gridHelper);

    // 对相机进行简单的设置
    camera.position.set(100, y, r); // x y z  设置相机在三维中的那个地方
    // 相机的视线 观察目标点的坐标
    camera.lookAt(0, 100, 0); // 坐标原点
    camera.lookAt(mesh.position); // 指向网络模型mesh

    // 相机和物体有了 现在需要通过 WebGL渲染器来拿到这个物体渲染到浏览器中
    // 创建一个WebGl渲染器

    // 设置 canvas 画布大小
    renderer.setSize(width, height);
    // 执行一个渲染操作 ；类比相机到拍照动作
    // renderer.render(scene, camera);

    // const colok = new THREE.Clock();
    // console.log(devicePixelRatio); // 默认像素比是一的话,不用设置

    // 相机参数发生变化了 重新渲染一下 重新生成一张照片
    function render() {
      // const spt = colok.getDelta() * 1000;
      stats.update();
      // console.log('帧率', 1000 / spt);
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
      mesh.rotateY(0.01); // 弧度值周期性旋转0.01弧度
    }
    render();
    ref.current.replaceChildren(renderer.domElement);
    ref.current.appendChild(stats.dom);
    stats.dom.style.left = '260px';
    stats.dom.style.top = '90px';
  }
  useEffect(() => {
    if (refCard.current) {
      setWH({
        width: refCard.current.clientWidth,
        height: refCard.current.clientHeight,
      });
    }
    aa();
  }, [refCard.current?.clientWidth]);
  return (
    <Card style={{ height: '800px' }} ref={refCard}>
      <div ref={ref}></div>
    </Card>
  );
}

export default Test;
