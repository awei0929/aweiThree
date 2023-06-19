export class Circle {
  constructor() {
    this.相机 = new THREE.PerspectiveCamera();
    this.场景 = new THREE.Scene();
    this.物理 = new THREE.CircleGeometry();
    this.模型 = new THREE.Mesh(this.相机, this.物理);
  }
}
