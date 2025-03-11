class VertexArray {
  constructor(gl, array) {
    this.gl = gl;
    this.buffer = gl.createBuffer();
    this.set(array);
  }

  active() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  }

  set(array) {
    this.array = array;
    this.count = array.length;
    this.flatArray = this.getFlatArray();
    this.perVertex = this.getPerVertex();
    this.active();
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.flatArray,
      this.gl.STATIC_DRAW
    );
  }

  getFlatArray() {
    return new Float32Array(this.array.flatMap(v => v.toArray()));
  }

  getPerVertex() {
    const allComponents = new Set(this.array.map(v => v.toArray().length));
    if (allComponents.size > 1) {
      throw new Error('Elements of array have different types');
    }
    return [...allComponents.values()][0];
  }

  bind(target) {
    this.active();
    this.gl.vertexAttribPointer(
      target,
      this.perVertex,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.enableVertexAttribArray(target);
  }

  draw() {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.count);
  }
}

export default VertexArray;
