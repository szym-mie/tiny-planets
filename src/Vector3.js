class Vector3 {
  constructor(x, y, z) {
    this.gl = null;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  plus(v) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  minus(v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  product(v) {
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  scale(k) {
    return new Vector3(this.x * k, this.y * k, this.z * k);
  }

  invert() {
    return this.scale(-1.0);
  }

  lengthSquared() {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    return x * x + y * y + z * z;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  normal() {
    const k = this.lengthSquared();
    if (k === 0.0) return Vector3.zero;
    return this.scale(1.0 / k);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  withContext(gl) {
    this.gl = gl;
  }

  bind(target) {
    this.gl.uniform3f(target, this.x, this.y, this.z);
  }

  static zero = new Vector3(0.0, 0.0, 0.0);
}

export default Vector3;
