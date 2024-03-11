import './style.css'
//import threejs library
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// creating a scene, camera, renderer:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//Field Of View, Aspect Ratio, View frustrum
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

//renderer.render( scene, camera);
// create a object 

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xff1046, wireframe: true } ); 
//const material = new THREE.MeshStandardMaterial( { color: 0xdd3347} ); 
//standard allows for light balance

// gemoetry / vecors to define objects
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pointLight = new THREE.PointLight (0xaa430, 1) // hexidecimal literal
pointLight.position.set(5, 5 ,10)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfff666, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

directionalLight.castShadow = true;
torus.castShadow = true

//renderer.shadowMap.enabled = true;

const lighthelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lighthelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); 

function animate() {
  requestAnimationFrame (animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render (scene, camera);
}

animate ();