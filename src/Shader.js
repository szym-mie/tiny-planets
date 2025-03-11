class Shader {
  constructor(gl, vertexSource, fragmentSource) {
    this.gl = gl;
    this.vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
    this.compileShader(this.vertexShader);

    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
    this.compileShader(this.fragmentShader);

    this.program = this.linkProgram(this.vertexShader, this.fragmentShader);
    this.linkProgram(this.vertexShader, this.fragmentShader);

    this.locationMap = this.getLocationMap(
      vertexSource + fragmentSource,
      this.program
    );
  }

  active() {
    this.gl.useProgram(this.program);
  }

  to(key) {
    const target = this.locationMap.get(key);
    if (target == null) {
      throw new Error('No such location ' + key);
    }
    if (target.location == null) {
      throw new Error('Unused location ' + target.name);
    }
    return target.location;
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error('Could not create shader');
    }
    this.gl.shaderSource(shader, source);
    return shader;
  }

  getLocationMap(source, program) {
    const primitiveAtRegex = /attribute ([a-zA-Z0-9_]+) ([a-zA-Z0-9_]+);/g;
    const structAtRegex = /attribute struct ([a-zA-Z0-9_]+) ([a-zA-Z0-9_]+);/g;
    const primitiveUnRegex = /uniform ([a-zA-Z0-9_]+) ([a-zA-Z0-9_]+);/g;
    const structUnRegex = /uniform struct ([a-zA-Z0-9_]+) ([a-zA-Z0-9_]+);/g;

    const map = new Map();

    for (const [_, type, name] of source.matchAll(primitiveAtRegex)) {
      const target = {
        type: type,
        name: name + '::' + type,
        location: this.gl.getAttribLocation(program, name),
      };
      map.set(name, target);
    }

    for (const [_, type, name] of source.matchAll(primitiveUnRegex)) {
      const target = {
        type: type,
        name: name + '::' + type,
        location: this.gl.getUniformLocation(program, name),
      };
      map.set(name, target);
    }

    return map;
  }

  compileShader(shader) {
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!success) {
      throw new Error(
        'Could not compile shader:' + this.gl.getShaderInfoLog(shader)
      );
    }
  }

  linkProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      throw new Error(
        'Could not link program:' + this.gl.getProgramInfoLog(program)
      );
    }

    return program;
  }
}

export default Shader;
