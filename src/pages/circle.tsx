import * as THREE from 'three';
import React, { useEffect } from 'react';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { Card } from '@arco-design/web-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import sj from '@/assets/世界.png';

// 所有模型对象都有一个父类 Object3D
export default function Circle() {
  const ref = React.useRef<HTMLDivElement>(null);
  const refDiv = React.useRef<HTMLDivElement>(null);
  function scene() {
    // 创建一个对象 对象属性值可以被gui库创建的交互界面改边
    const obj = {
      color: 0x00ffff,
      specular: 0x111111,
      intensity: 0.4,
      intensity2: 0.8,
      x: 100,
      y: 200,
      z: 100,
    };
    // 创建一个场景
    const scene = new THREE.Scene();
    // 创建一个模型
    const geometry = new THREE.SphereGeometry(50, 64, 32);
    // 创建一个纹理加载器对象
    const loadTex = new THREE.TextureLoader();
    // 贴图纹理贴图UV坐标范围 用于裁剪
    const texture = loadTex.load(sj);
    const material = new THREE.MeshPhongMaterial({
      // color: 0x00ffff,
      specular: 0x111111,
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 添加模型
    scene.add(mesh);
    // GUI
    const gui = new GUI();
    const Folder1 = gui.addFolder('材质');
    const Folder2 = gui.addFolder('光照范围');
    const Folder3 = gui.addFolder('光源位置');
    Folder1.addColor(obj, 'color')
      .name('颜色')
      .onChange(v => {
        material.color.set(v);
      });
    Folder1.addColor(obj, 'specular')
      .name('颜色2')
      .onChange(v => {
        material.specular.set(v);
      });
    Folder2.add(obj, 'intensity', 0, 1)
      .name('环境光')
      .onChange(v => {
        light.intensity = v;
      });
    Folder2.add(obj, 'intensity2', 0, 1)
      .name('平行光')
      .onChange(v => {
        directionalLight.intensity = v;
      });
    // 创建一个光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 平行光
    scene.add(directionalLight);
    const light = new THREE.AmbientLight(0x404040, 0.4); // 环境光
    directionalLight.position.set(obj.x, obj.y, obj.z);
    Folder3.add(directionalLight.position, 'x', -720, 720).name('x轴');
    Folder3.add(directionalLight.position, 'y', -720, 720).name('y轴');
    Folder3.add(directionalLight.position, 'z', -720, 720).name('z轴');
    scene.add(light);
    // 辅助观察坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 渲染
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
    });
    // 设置 canvas 画布大小
    renderer.setSize(
      ref.current.clientWidth - 32,
      ref.current.clientHeight - 32
    );

    // 透视相机
    const camera = new THREE.PerspectiveCamera(
      100,
      ref.current.clientWidth / ref.current.clientHeight,
      1,
      10000
    );
    // 对相机进行简单的设置
    camera.position.set(100, 100, 100); // x y z  设置相机在三维中的那个地方
    // 相机的视线 观察目标点的坐标
    camera.lookAt(0, 100, 0); // 坐标原点
    camera.lookAt(mesh.position); // 指向网络模型mesh
    // 创建轨道控制器 平滑控制摄像机
    new OrbitControls(camera, renderer.domElement);
    function render() {
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
      mesh.rotateY(0.01); // 弧度值周期性旋转0.01弧度
    }
    render();
    refDiv.current.appendChild(renderer.domElement);
  }

  useEffect(() => {
    if (ref.current) {
      scene();
    }
  }, []);
  return (
    <Card style={{ height: '800px' }} ref={ref}>
      <div ref={refDiv}></div>
    </Card>
  );
}
