class Float {
  constructor(value) {
    this.gl = null;
    this.value = value;
  }

  withContext(gl) {
    this.gl = gl;
  }

  bind(target) {
    this.gl.uniform1f(target, this.value);
  }
}

export default Float;
