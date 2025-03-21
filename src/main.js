import './css/style.css';

import Renderer from './Renderer';
import Camera from './Camera';

import Texture2D from './Texture2D';
import Vector3 from './Vector3';
import Float from './Float';

import VertexArray from './VertexArray';
import Shader from './Shader';
import Mesh from './Mesh';
import Resource from './Resource';

import planetVertex from './shader/planet.vert?raw';
import planetFragment from './shader/planet.frag?raw';

import planetBitmapUrl from './texture/planet256.png';
const planetBitmapRes = new Resource(planetBitmapUrl);

const canvas = document.getElementById('viewport');
const renderer = new Renderer(canvas);
const gl = renderer.gl;

const camera = new Camera(gl);
camera.viewMatrix.setIdentity();
camera.projectionMatrix.setPerspective(0.5, 1.0, 0.1, 1000.0);
camera.update();

renderer.blend();

const timer = new Float(0.0);
timer.withContext(gl);

const rectArray = [
  new Vector3(0.5, 0.5, 0.0),
  new Vector3(-0.5, 0.5, 0.0),
  new Vector3(-0.5, -0.5, 0.0),
  new Vector3(-0.5, -0.5, 0.0),
  new Vector3(0.5, -0.5, 0.0),
  new Vector3(0.5, 0.5, 0.0),
];
const rectVertexArray = new VertexArray(gl, rectArray);

const planetShader = new Shader(gl, planetVertex, planetFragment);
const planetTexture = new Texture2D(gl);

Promise.all([planetBitmapRes.value]).then(([planetBitmap]) => {
  planetTexture.set(planetBitmap);
});

const mesh = new Mesh(timer, planetShader, planetTexture, rectVertexArray);

const onFrame = time => {
  timer.value = time / 1000.0;
  renderer.clear();
  const distance = time / 10000.0 + 0.1;
  camera.viewMatrix.setPosition(new Vector3(0.0, 0.0, -distance));
  camera.update();
  mesh.draw(camera);
  requestAnimationFrame(onFrame);
};

requestAnimationFrame(onFrame);
