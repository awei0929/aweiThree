import React, { useEffect, useRef } from 'react';
import { Card } from '@arco-design/web-react';
// 引入three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui';

const Index = () => {
  const domRef = useRef(null);

  useEffect(() => {
    threeInit();
  }, []);

  function threeInit() {
    // 1. 创建场景
    const scene = new THREE.Scene();
    // 2. 创建相机
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(20, 20, 20);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    // 5. 创建立方体(几何+材质)
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    const gui = new dat.GUI();
    const guiPosition = gui.addFolder('移动');
    guiPosition.add(cube.position, 'x').min(-10).max(10).step(1);
    guiPosition.add(cube.position, 'y').min(-10).max(10).step(1);
    guiPosition.add(cube.position, 'z').min(-10).max(10).step(1);

    const guiScale = gui.addFolder('缩放');
    guiScale.add(cube.scale, 'x').min(1).max(10).step(1);
    guiScale.add(cube.scale, 'y').min(1).max(10).step(1);
    guiScale.add(cube.scale, 'z').min(1).max(10).step(1);

    const guiRotation = gui.addFolder('旋转');
    guiRotation.add(cube.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.01);
    guiRotation.add(cube.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.01);
    guiRotation.add(cube.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.01);
    // 添加到场景
    scene.add(cube);

    // 6. 坐标轴辅助工具(x轴: 红色; y轴: 绿色; z轴: 蓝色 rgb)
    // x轴水平方向(右正); y轴垂直方向(上正); z轴垂直xy平面即屏幕(外正)
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // 3. 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(400, 400);
    domRef.current.appendChild(renderer.domElement);

    // 创建网络辅助工具
    const gridHelper = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
    // gridHelper.material.transparent = true;
    // gridHelper.material.opacity = 0.5;

    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    // 4. 渲染
    function animation() {
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }
    animation();
  }

  return (
    <Card>
      <div ref={domRef} style={{ width: 500, height: 400 }}></div>
    </Card>
  );
};

export default Index;
