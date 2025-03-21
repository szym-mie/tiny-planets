class Mesh {
  constructor(time, shader, texture, vertexArray) {
    this.time = time;
    this.shader = shader;
    this.texture = texture;
    this.vertexArray = vertexArray;
  }

  draw(camera) {
    this.shader.active();
    camera.bind(this.shader.to('u_VPMatrix'));
    this.time.bind(this.shader.to('u_Time'));
    this.texture.bind(this.shader.to('u_Texture'), 0);
    this.vertexArray.bind(this.shader.to('a_Position'));
    this.vertexArray.draw();
  }
}

export default Mesh;
