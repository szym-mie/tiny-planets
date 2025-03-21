class Vector4 {
  constructor(x, y, z, w) {
    this.gl = null;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  plus(v) {
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }

  minus(v) {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }

  product(v) {
    return new Vector4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
  }

  scale(k) {
    return new Vector4(this.x * k, this.y * k, this.z * k, this.w * k);
  }

  invert() {
    return this.scale(-1.0);
  }

  lengthSquared() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;
    return x * x + y * y + z * z + w * w;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  normal() {
    const k = this.lengthSquared();
    if (k === 0.0) return Vector4.zero;
    return this.scale(1.0 / k);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  toArray() {
    return [this.x, this.y, this.z, this.w];
  }

  withContext(gl) {
    this.gl = gl;
  }

  bind(target) {
    this.gl.uniform4f(target, this.x, this.y, this.z, this.w);
  }

  static zero = new Vector4(0.0, 0.0, 0.0, 0.0);
}

export default Vector4;
