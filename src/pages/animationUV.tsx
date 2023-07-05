import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Card } from '@arco-design/web-react';
import sj from '@/assets/世界.png';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default function Circle() {
  const ref = React.useRef<HTMLDivElement>(null);
  const refDiv = React.useRef<HTMLDivElement>(null);
  // 法线 垂直于面的法线 使用顶点受光照影响的材质 需要几何体的法线数据
  // 网格模型 mesh 都是一个一个三角形面 拼接而成
  function meshs() {
    const geometry = new THREE.PlaneGeometry(200, 50);
    const texLoader = new THREE.TextureLoader();
    const texture = texLoader.load(sj);
    console.log(texture);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      // color: 0xff0000,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(-Math.PI / 2);

    texture.offset.x = 0.5; // uv(0,1) 坐标 U方向偏移
    // texture.offset.y = 0.5; // uv(0,1) 坐标 v方向偏移
    texture.wrapS = THREE.RepeatWrapping; // 改变映射方式
    // texture.wrapT = THREE.RepeatWrapping; // 改变映射方式
    texture.repeat.x = 50;
    return { mesh, texture };
  }
  function scene() {
    // 创建一个组对象等价于 Object3D 等价于mesh 也可以添加子模型 mesh.add(av)
    // const group = new THREE.Group();
    // 树结构
    const group = new THREE.Object3D();
    group.name = 'Object3D';
    const { mesh, texture } = meshs();
    // 创建一个场景
    const scene = new THREE.Scene();
    // 添加组对象
    scene.add(group);
    scene.add(mesh);
    // 添模型
    // scene.add(mesh, m2, m3);
    // 创建一个光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 平行光
    scene.add(directionalLight);
    const light = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    directionalLight.position.set(100, 100, 100);
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
    // 创建轨道控制器 平滑控制摄像机
    new OrbitControls(camera, renderer.domElement);
    function render() {
      texture.offset.x += 0.2;
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
      group.rotateY(0.01);
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
