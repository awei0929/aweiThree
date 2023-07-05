import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Card } from '@arco-design/web-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import gltf from '../pages/gc.glb';
export default function Circle() {
  const ref = React.useRef<HTMLDivElement>(null);
  const refDiv = React.useRef<HTMLDivElement>(null);
  // 法线 垂直于面的法线 使用顶点受光照影响的材质 需要几何体的法线数据
  // 网格模型 mesh 都是一个一个三角形面 拼接而成
  function meshs() {
    const loader = new GLTFLoader();
    const model = new THREE.Group();
    loader.load('../src/pages/gc.glb', gltf => {
      model.add(gltf.scene);
      const dhc = gltf.scene.getObjectByName('大货车');
      setInterval(() => {
        if (dhc.position.z > -78) {
          dhc.position.z -= 10;
        } else if (dhc.position.x > -38) {
          if (dhc.rotation._y > 1.4 && dhc.position.x < 35) {
            dhc.position.x += 1;
          } else {
            dhc.rotateY(-0.2);
          }
        } 
        console.log(dhc.position);
      }, 100);
    });

    model.name = '工厂';

    return model;
  }
  function scene() {
    const model = meshs();
    // 创建一个场景
    const scene = new THREE.Scene();

    // 添加组对象
    scene.add(model);
    // scene.add(meshs());
    // 添模型
    // scene.add(mesh, m2, m3);
    // 创建一个光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 平行光
    scene.add(directionalLight);

    const light = new THREE.AmbientLight(0xffffff, 0.2); // 环境光
    directionalLight.position.set(100, 100, 100);
    scene.add(light);
    // 辅助观察坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
    model.traverse(child => {
      //  递归便利查找所有模型节点
      // const nameNode = scene.getObjectByName('大货车'); // 更具某个名字获取某个节点
      console.log(child.getObjectByName('大货车'));
    });

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
      1000
    );
    // 对相机进行简单的设置
    // camera.position.set(100, 100, 100); // x y z  设置相机在三维中的那个地方
    camera.position.set(9, 5, 79); // x y z  设置相机在三维中的那个地方
    // 相机的视线 观察目标点的坐标
    camera.lookAt(0, 100, 0); // 坐标原点
    // 创建轨道控制器 平滑控制摄像机
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set(0, 100, 0); // 和lookat设置一样
    controls.update();
    function render() {
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
      // console.log(camera.position);

      // group.rotateY(0.01);
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
