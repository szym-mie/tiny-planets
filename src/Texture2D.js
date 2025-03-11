class Texture2D {
  constructor(gl) {
    this.gl = gl;
    this.texture = this.createTexture();
    this.reset();
  }

  createTexture() {
    const texture = this.gl.createTexture();
    if (!texture) {
      throw new Error('Cannot create texture');
    }
    return texture;
  }

  set(bitmap) {
    this.bitmap = bitmap;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    console.log(bitmap);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      bitmap
    );

    this.gl.generateMipmap(this.gl.TEXTURE_2D);
  }

  reset() {
    this.bitmap = null;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      2,
      2,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      Texture2D.placeholder_bitmap
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.NEAREST
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.NEAREST
    );

    this.gl.generateMipmap(this.gl.TEXTURE_2D);
  }

  bind(target, unit) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.uniform1i(target, unit);
  }

  static placeholder_bitmap = new Uint8Array([
    192, 0, 240, 255, 40, 0, 48, 255, 40, 0, 48, 255, 192, 0, 240, 255,
  ]);
}

export default Texture2D;
