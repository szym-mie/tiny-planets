import Matrix4 from './Matrix4';

class Camera {
  constructor(gl) {
    this.gl = gl;
    this.viewMatrix = new Matrix4([]);
    this.projectionMatrix = new Matrix4([]);
    this.vpMatrix = new Matrix4([]);
  }

  perspective(fov, aspect, near, far) {
    this.projectionMatrix.setPerspective(fov, aspect, near, far);
  }

  update() {
    this.vpMatrix = this.projectionMatrix.product(this.viewMatrix);
  }

  bind(target) {
    this.vpMatrix.withContext(this.gl).bind(target);
  }
}

export default Camera;
