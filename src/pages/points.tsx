import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Card } from '@arco-design/web-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default function Circle() {
  const ref = React.useRef<HTMLDivElement>(null);
  const refDiv = React.useRef<HTMLDivElement>(null);
  // 点模型
  function points() {
    // 创建一个空的几何体顶点对象
    const geometry = new THREE.BufferGeometry();
    // 添加顶点数据 3个数据为一组 xyz 类型化数组
    const vertices = new Float32Array([
      0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10, 50, 50, 50,
    ]);
    const attribue = new THREE.BufferAttribute(vertices, 3);
    // 点材质
    const materilalPoint = new THREE.PointsMaterial({
      color: 0xffff00,
      size: 5, // 像素尺寸
    });
    // 设置集合体顶点位置的属性
    geometry.attributes.position = attribue;
    // 点模型对象
    const points = new THREE.Points(geometry, materilalPoint);
    return points;
  }
  // 线模型
  function lines() {
    // 创建一个空的几何体顶点对象
    const geometry = new THREE.BufferGeometry();
    // 添加顶点数据 3个数据为一组 xyz 类型化数组
    const vertices = new Float32Array([
      0, -10, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10, 50, 50,
      50,
    ]);
    const attribue = new THREE.BufferAttribute(vertices, 3);
    // 线材质
    const materilalPoint = new THREE.LineBasicMaterial({
      color: 0xffff00,
    });
    // 设置集合体顶点位置的属性
    geometry.attributes.position = attribue;
    // 线模型对象 lineLoop 闭合起点和终点连成 非连续性线条lineSegments 两两像连接
    const lines = new THREE.Line(geometry, materilalPoint);
    return lines;
  }
  // 网格模型 mesh 都是一个一个三角形面 拼接而成
  function meshs() {
    // 创建一个空的几何体顶点对象
    const geometry = new THREE.BufferGeometry();
    // 添加顶点数据 3个数据为一组 xyz 类型化数组
    // 立方体
    const vertices = new Float32Array([
      // yx
      0, 0, 0, 50, 0, 0, 0, 50, 0,

      0, 50, 0, 50, 50, 0, 50, 0, 0,
      // xz
      0, 0, 0, 50, 0, 0, 50, 0, 50,

      0, 0, 0, 0, 0, 50, 50, 0, 50,
      // yz
      0, 0, 0, 0, 50, 0, 0, 50, 50,

      0, 0, 0, 0, 0, 50, 0, 50, 50,
      // 不是原点坐标 yz
      0, 0, 50, 0, 50, 50, 50, 50, 50,

      0, 0, 50, 50, 0, 50, 50, 50, 50,
      //  不是原点坐标 xy
      50, 0, 50, 50, 50, 0, 0, 50, 0,

      50, 0, 50, 50, 50, 0, 50, 50, 50,
      // xz 不是原点坐标
      0, 50, 50, 0, 50, 0, 50, 50, 50,

      50, 50, 0, 0, 50, 0, 50, 50, 50,
    ]);
    const attribue = new THREE.BufferAttribute(vertices, 3);
    // 线材质  MeshDepthMaterial MeshBasicMaterial
    const materilalMesh = new THREE.MeshDepthMaterial({
      // color: 0xffff00,
      wireframe: true,
      side: THREE.DoubleSide, // 设置正反面都可以看见 默认反面不可见 顺时针方向是正明
      opacity: 0.5,
    });
    // 设置集合体顶点位置的属性
    geometry.attributes.position = attribue;
    // 网格羡慕
    const meshs = new THREE.Mesh(geometry, materilalMesh);
    return meshs;
  }
  function scene() {
    // 创建一个场景
    const scene = new THREE.Scene();
    // 添加点模型
    scene.add(meshs());
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
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
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
