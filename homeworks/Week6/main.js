import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//---Canvas 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//---Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d0ff); // light sky-blue background

// ---- GROUND and ROADS ---

// Grass 
const grassGeometry = new THREE.PlaneGeometry(20, 20);
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x3a8b3a });
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = -Math.PI / 2;
scene.add(grass);

//-----Roads 
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const road1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 1.3), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.set(-5, 0.01, 0.7);
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 18), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.rotation.z = -Math.PI / -10;
road2.position.set(-0.8, 0.01, -1.6);
scene.add(road2);

const road3 = new THREE.Mesh(new THREE.PlaneGeometry(6, 1), roadMaterial);
road3.rotation.x = -Math.PI / 2;
road3.position.set(3, 0.01, 0.2);
scene.add(road3);

const road4 = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.8), roadMaterial);
road4.rotation.x = -Math.PI / 2;
road4.rotation.z = -Math.PI / -3;
road4.position.set(1.4, 0.01,-2);
scene.add(road4);

const road5 = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.8), roadMaterial);
road5.rotation.x = -Math.PI / 2;
road5.rotation.z = -Math.PI / -1;
road5.position.set(4, 0.01,-3.5);
scene.add(road5);

const road6 = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.8), roadMaterial);
road6.rotation.x = -Math.PI / 2;
road6.rotation.z = -Math.PI / 1.06;
road6.position.set(-6, 0.01,-5);
scene.add(road6);

//---Roundabout 
const circleGeometry = new THREE.CircleGeometry(2, 32);
const circleMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
const roundabout = new THREE.Mesh(circleGeometry, circleMaterial);
roundabout.rotation.x = -Math.PI / 2;
roundabout.position.set(0, 0.02, 0);
scene.add(roundabout);

//--roundabout grass in middle
const circleGeometry1 = new THREE.CircleGeometry(1, 32);
const circleMaterial1 = new THREE.MeshPhongMaterial({ color: 0x2d662d });
const roundabout1 = new THREE.Mesh(circleGeometry1, circleMaterial1);
roundabout1.rotation.x = -Math.PI / 2;
roundabout1.position.set(0, 0.04, 0);
scene.add(roundabout1);



// ---- BUILDINGS ----
const buildingMaterial1 = new THREE.MeshStandardMaterial({ color: 0xb0b0b0 });
const buildingMaterial2 = new THREE.MeshPhongMaterial({ color: 0xd0a060 });
const buildingMaterial3 = new THREE.MeshLambertMaterial({ color: 0x8888ff });


//----LH ----------------------------------
const LHGeometry = new THREE.BoxGeometry(4, 1.9, 3);
const LH = new THREE.Mesh(LHGeometry, buildingMaterial1);
LH.position.set(-6, 1, -2.5);
LH.rotation.z=0.2
LH.rotation.y=0.15
scene.add(LH);

const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // grey
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(-4.3, 0.5, -2);
scene.add(cylinder);

const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder2.position.set(-4.3, 0.5, -3.5);
scene.add(cylinder2);


//---Other Buildings----------
const boxGeometry = new THREE.BoxGeometry(3.5, 1, 1.7);
const boxGeometry2 = new THREE.BoxGeometry(7, 1, 2.3);

const building2 = new THREE.Mesh(boxGeometry, buildingMaterial2);
building2.position.set(4.4, 0.5, -1.5);
building2.rotation.y = Math.PI / -1.01;
scene.add(building2);

const building3 = new THREE.Mesh(boxGeometry2, buildingMaterial3);
building3.position.set(-5, 0.5, 3);
building3.rotation.y = -Math.PI / 1;
scene.add(building3);

const building4 = new THREE.Mesh(boxGeometry, buildingMaterial2);
building4.position.set(3.1, 0.5, 2.7);
building4.rotation.y = Math.PI / 1.65
scene.add(building4);

const building5 = new THREE.Mesh(boxGeometry, buildingMaterial1);
building5.position.set(0.3, 0.5, -5);
building5.rotation.y=-1.3
scene.add(building5);

// --- LIGHTS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffcc88, 0.8);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// ---CAMERA ---
const aspect = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
scene.add(camera);

// --- Controls----
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// ---Animtion-----
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();

// ---EventListener----------
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});
