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
      50, 0, 0, 50, 0, 50, 50, 50, 0,

      50, 50, 50, 50, 0, 50, 50, 50, 0,
      // xz 不是原点坐标
      50, 50, 0, 0, 50, 0, 50, 50, 50,

      0, 50, 50, 0, 50, 0, 50, 50, 50,
    ]);
    const vertices2 = new Float32Array([
      //  0
      0, 0, 0,
      // 1
      50, 0, 0,
      // 2
      0, 50, 0,
      // 3
      50, 50, 0,
      // 4
      0, 0, 50,
      // 5
      0, 50, 50,
      // 6
      50, 0, 50,
      //  7
      50, 50, 50,
    ]);

    const attribue = new THREE.BufferAttribute(vertices2, 3);
    const index = new Uint16Array([
      0, 1, 2, 1, 2, 3,

      0, 1, 6, 0, 4, 6,

      0, 4, 5, 0, 2, 5,

      4, 5, 7, 4, 6, 7,

      1, 6, 3, 7, 6, 3,

      3, 2, 7, 5, 2, 7,
    ]);
    geometry.index = new THREE.BufferAttribute(index, 1);
    console.log(geometry.getIndex());
    // 线材质  MeshDepthMaterial MeshBasicMaterial
    const materilalMesh = new THREE.MeshLambertMaterial({
      color: 0xffff00,
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
  // 法线 垂直于面的法线 使用顶点受光照影响的材质 需要几何体的法线数据
  // 网格模型 mesh 都是一个一个三角形面 拼接而成
  function meshs2() {
    // 创建一个空的几何体顶点对象
    const geometry = new THREE.BufferGeometry();
    // 添加顶点数据 3个数据为一组 xyz 类型化数组
    const vertices = new Float32Array([
      // yx
      0, 0, 0, 50, 0, 0, 50, 50, 0, 0, 50, 0,
    ]);
    // 属性缓冲区对象
    const attribue = new THREE.BufferAttribute(vertices, 3); // 3 个为一组 表示xyz
    // 设置集合体顶点位置的属性
    geometry.attributes.position = attribue;
    const index = new Uint16Array([0, 1, 2, 0, 2, 3]);
    geometry.index = new THREE.BufferAttribute(index, 1); // 一个为一组
    // 定义法线数据
    const norlmals = new Float32Array([
      // 0
      0, 0, 1,
      // 1
      0, 0, 1,
      // 2
      0, 0, 1,
      // 3
      0, 0, 1,
    ]);
    // 定义法线法线数据
    geometry.attributes.normal = new THREE.BufferAttribute(norlmals, 3);

    // 线材质  MeshDepthMaterial MeshBasicMaterial MeshLambertMaterial
    const materilalMesh = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      // wireframe: true,
      side: THREE.DoubleSide, // 设置正反面都可以看见 默认反面不可见 顺时针方向是正明
      // opacity: 0.5,
    });

    // 网格模型
    const meshs = new THREE.Mesh(geometry, materilalMesh);
    // // 创建一个三维向量
    // const v1 = new THREE.Vector3(100, 100, 100);
    // const v3 = new THREE.Vector3(100, 100, 100);
    // const v3 = v3.copy(v1)
    // // 朝着v3点方向平移
    // meshs.translateOnAxis(v3, 1);
    // meshs.rotation.x = Math.PI / 2;
    // meshs.rotation.y = Math.PI / 3;
    // meshs.rotateX(0.01);
    console.log(materilalMesh.color.setStyle('#fff'));
    return meshs;
  }
  function scene() {
    // 创建网格地面
    const gridHelper = new THREE.GridHelper(1000, 100, 0xff0000);
    // 克隆之后网格是独立单独的 材质和几何体 不操作的话 还是一样原来的
    const mesh = meshs2();
    const m2 = mesh.clone();
    m2.material = mesh.material.clone();
    m2.material.color.setStyle('#00ff00');
    m2.position.copy(mesh.position);
    m2.position.y += 50;
    const m3 = mesh.clone();
    m3.material = mesh.material.clone();
    m3.material.color.setStyle('#0000ff');
    m3.position.copy(mesh.position);
    m3.position.y -= 50;

    // 创建一个组对象等价于 Object3D 等价于mesh 也可以添加子模型 mesh.add(av)
    // const group = new THREE.Group();
    // 树结构
    const group = new THREE.Object3D();
    group.name = 'Object3D';
    // group.traverse(child => {
    //  递归便利查找所有模型节点
    // const nameNode = group.getobjectByName('名字') 更具某个名字获取某个节点
    //   console.log(child);
    // });
    const m4 = mesh.clone();
    const m5 = mesh.clone();
    m5.position.x += 50;
    group.add(m4);
    group.add(m5);

    // 创建一个场景
    const scene = new THREE.Scene();
    // 添加组对象
    scene.add(group, gridHelper);
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
      renderer.render(scene, camera);
      // 渲染下一针就会调用render函数
      requestAnimationFrame(render);
      mesh.rotateY(0.01);
      group.rotateY(0.01);
      m2.rotation.copy(mesh.rotation);
      m3.rotation.copy(mesh.rotation);
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
