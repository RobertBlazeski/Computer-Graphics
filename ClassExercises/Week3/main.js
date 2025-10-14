import * as THREE from 'three';




// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(1, 6, 6);
camera.rotation.x=-0.6


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// plane floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Shapes

const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-1, 0.5, 0);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(0.7, 12, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0.8, 0.75, 2);
scene.add(sphere);

const coneGeometry = new THREE.ConeGeometry(1, 2, 12);
const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x4488ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(2, 0.75, 0);

scene.add(cone);

// LIghts
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

// Animation
function animate() {
  requestAnimationFrame(animate);

  box.rotation.y += 0.01;
  sphere.rotation.y += 0.01;
  cone.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
