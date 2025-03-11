class Resource {
  constructor(url, init = {}) {
    this.url = url;
    this.init = init;
    this.value = this.retrieve(url, init);
  }

  async retrieve(url, init) {
    const data = await this.fetch(url, init);
    return await this.load(data);
  }

  async load(data) {
    console.log(data);
    return await createImageBitmap(data);
  }

  async fetch(url, init) {
    const response = await fetch(url, init);
    return await response.blob();
  }
}

export default Resource;
