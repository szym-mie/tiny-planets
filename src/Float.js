class Float {
  constructor(gl, value) {
    this.gl = gl;
    this.value = value;
  }

  bind(target) {
    this.gl.uniform1f(target, this.value);
  }
}

export default Float;
