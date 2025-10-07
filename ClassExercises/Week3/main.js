import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y=3

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// light
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

// house group
const house = new THREE.Group(); 

// walls
const wallGeo = new THREE.BoxGeometry(3,2,3);
const wallMat = new THREE.MeshStandardMaterial({color:0xffaa00});
const walls = new THREE.Mesh(wallGeo, wallMat);
walls.position.y = 1; 
house.add(walls); 

// roof
const roofGeo = new THREE.ConeGeometry(2, 1.5, 3);
const roofMat = new THREE.MeshStandardMaterial({color:0xff0000});
const roof = new THREE.Mesh(roofGeo, roofMat);
roof.position.y = 2.65; 
roof.position.z=1
 
roof.position.x=-0.2
roof.rotation.y = Math.PI / 2.4;
house.add(roof); 

// windows
const windowGeo = new THREE.CircleGeometry(0.3, 32);
const windowMat = new THREE.MeshStandardMaterial({color:0x00ffff, metalness:0.7, roughness:0.1});
const window1 = new THREE.Mesh(windowGeo, windowMat);
window1.position.set(-0.8, 1.5, 1.51);
house.add(window1);

const window2 = new THREE.Mesh(windowGeo, windowMat);
window2.position.set(0.8, 1.5, 1.51);
house.add(window2); 

// add hosue to scene
scene.add(house);

// Axes hlper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// Animation
function animate(){
    requestAnimationFrame(animate);

   
    // house.rotation.y += 0.001;
    

    renderer.render(scene, camera);
}

animate();
