import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = 
new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1, 10000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/textures/Stylized_Wood_Floor_001_basecolor.png');

const material = new THREE.MeshBasicMaterial({map:texture});
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    material
);



const textureLoader1 = new THREE.TextureLoader();
const texture1= textureLoader1.load('textures/textures/Stylized_Stone_Floor_010_height.png');

const material1 = new THREE.MeshBasicMaterial({map:texture1});
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    material1
);

sphere.position.x=2
sphere.position.y=0

texture.wrapS = THREE.RepeatWrapping; // enable repeat horizontally
texture.wrapT = THREE.RepeatWrapping; //enable repeat vertically
texture.repeat.set(4,4);

texture1.wrapS = THREE.RepeatWrapping; // enable repeat horizontally
texture1.wrapT = THREE.RepeatWrapping; //enable repeat vertically
texture1.repeat.set(4,4);

scene.add(cube,sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x +=0.01;
    sphere.rotation.x +=0.01;
    renderer.render(scene,camera);
}

animate();