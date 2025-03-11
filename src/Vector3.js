class Vector3 {
  constructor(x, y, z) {
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

  normal() {
    const k = this.x * this.x + this.y * this.y + this.z * this.z;
    if (k === 0.0) return Vector3.zero;
    return this.scale(1.0 / k);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  static zero = new Vector3(0.0, 0.0, 0.0);
}

export default Vector3;
