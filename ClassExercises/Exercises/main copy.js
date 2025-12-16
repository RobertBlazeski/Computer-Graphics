import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const sizes = { width: 800, height: 600 };
const aspect = sizes.width / sizes.height;

// Orthographic camera (left, right, top, bottom, near, far)
const frustumSize = 2;
const orthographicCamera = new THREE.OrthographicCamera(
  -frustumSize * aspect, frustumSize * aspect,
   frustumSize, -frustumSize, 0.1, 100
);

// position the camera so we can see the scene
orthographicCamera.position.set(5, 5, 5);
orthographicCamera.lookAt(0, 0, 0);
scene.add(orthographicCamera);

// Lights
const ambientLight = new THREE.AmbientLight(0xffeecc, 0.4); // color, intensity
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffeecc, 0.7);
dirLight.position.set(2, 5, 5);
dirLight.castShadow = true;
// optional: tune shadow map size for quality
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);

// Cube
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x88cc88, wireframe: false });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.castShadow = true;
cubeMesh.position.set(0, 1, 0); // lift it so it sits above the plane
scene.add(cubeMesh);

// Plane (ground)
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x303030, roughness: 0.7 });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2; // make it horizontal
planeMesh.position.y = 0;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // nicer soft shadows
document.body.appendChild(renderer.domElement);

// Controls (use the actual camera variable you created)
const controls = new OrbitControls(orthographicCamera, renderer.domElement);
controls.enableDamping = true;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cubeMesh.rotation.x += 0.01;
  cubeMesh.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, orthographicCamera);
}
animate();
