import './css/style.css';

import Renderer from './Renderer';
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

renderer.blend();

const timer = new Float(gl, 0.0);

const rectArray = [
  new Vector3(0.5, 0.5, 0.1),
  new Vector3(-0.5, 0.5, 0.1),
  new Vector3(-0.5, -0.5, 0.1),
  new Vector3(-0.5, -0.5, 0.1),
  new Vector3(0.5, -0.5, 0.1),
  new Vector3(0.5, 0.5, 0.1),
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
  mesh.draw();
  requestAnimationFrame(onFrame);
};

requestAnimationFrame(onFrame);
