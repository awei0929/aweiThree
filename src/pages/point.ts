import THREE from 'three';

function point() {
  // 创建一个空的几何体顶点对象
  const geometry = new THREE.BufferGeometry();
  // 添加顶点数据 3个数据为一组 xyz 类型化数组
  const vertices = new Float32Array([
    0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
  ]);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  // 点材质
  const materilalPoint = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10,
  });
  // 设置集合体顶点位置的属性
  geometry.attributes.position = attribue;
  // 点模型对象
  const points = new THREE.Points(geometry, materilalPoint);
  return points;
}

export { point };
