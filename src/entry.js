/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(0, 0, 30);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// controls & helpers
const controls = new OrbitControls(camera);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp, camera.quaternion);

  camera.position.copy(seedScene.cameraParams.position  || null);
  camera.matrix.lookAt(camera.position, seedScene.cameraParams.lookAt, seedScene.cameraParams.normal);
  camera.rotation.setFromRotationMatrix(camera.matrix, camera.rotation.order)

  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  controls.update();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

