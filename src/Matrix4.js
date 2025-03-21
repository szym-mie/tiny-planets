class Matrix4 {
  constructor(ma) {
    this.gl = null;
    const count = 16;
    this.ma = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      this.ma[i] = ma[i] || 0.0;
    }
  }

  product(m) {
    let a00 = this.ma[0], a01 = this.ma[1], a02 = this.ma[2], a03 = this.ma[3];
    let a10 = this.ma[4], a11 = this.ma[5], a12 = this.ma[6], a13 = this.ma[7];
    let a20 = this.ma[8], a21 = this.ma[9], a22 = this.ma[10], a23 = this.ma[11];
    let a30 = this.ma[12], a31 = this.ma[13], a32 = this.ma[14], a33 = this.ma[15];
    let b0, b1, b2, b3;
    const o = new Matrix4([]);

    b0 = m.ma[0];
    b1 = m.ma[1];
    b2 = m.ma[2];
    b3 = m.ma[3];
    o.ma[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    o.ma[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    o.ma[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    o.ma[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = m.ma[4];
    b1 = m.ma[5];
    b2 = m.ma[6];
    b3 = m.ma[7];
    o.ma[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    o.ma[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    o.ma[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    o.ma[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = m.ma[8];
    b1 = m.ma[9];
    b2 = m.ma[10];
    b3 = m.ma[11];
    o.ma[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    o.ma[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    o.ma[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    o.ma[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = m.ma[12];
    b1 = m.ma[13];
    b2 = m.ma[14];
    b3 = m.ma[15];
    o.ma[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    o.ma[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    o.ma[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    o.ma[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return o;
  }

  setPosition(v) {
    this.ma[12] = v.x;
    this.ma[13] = v.y;
    this.ma[14] = v.z;
  }

  setPerspective(fov, aspect, near, far) {
    const f = Math.tan((Math.PI - fov) / 2);

    this.ma[0] = f / aspect;
    this.ma[1] = 0;
    this.ma[2] = 0;
    this.ma[3] = 0;
    this.ma[4] = 0;
    this.ma[5] = f;
    this.ma[6] = 0;
    this.ma[7] = 0;
    this.ma[8] = 0;
    this.ma[9] = 0;
    this.ma[10] = (near + far) / (near - far);
    this.ma[11] = -1;
    this.ma[12] = 0;
    this.ma[13] = 0;
    this.ma[14] = 2 * far * near / (near - far);
    this.ma[15] = 0;
  }

  setIdentity() {
    this.ma[0] = 1;
    this.ma[1] = 0;
    this.ma[2] = 0;
    this.ma[3] = 0;
    this.ma[4] = 0;
    this.ma[5] = 1;
    this.ma[6] = 0;
    this.ma[7] = 0;
    this.ma[8] = 0;
    this.ma[9] = 0;
    this.ma[10] = 1;
    this.ma[11] = 0;
    this.ma[12] = 0;
    this.ma[13] = 0;
    this.ma[14] = 0
    this.ma[15] = 1;
  }

  toArray() {
    return this.ma;
  }

  withContext(gl) {
    this.gl = gl;
    return this;
  }

  bind(target) {
    this.gl.uniformMatrix4fv(target, false, this.ma);
  }

  static zero = new Matrix4([
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ]);

  static identity = new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
}

export default Matrix4;