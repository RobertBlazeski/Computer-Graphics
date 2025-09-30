import * as THREE from 'three';
import { color } from 'three/tsl';

const scene = new THREE.Scene(); //scene constructor
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight, 0.1, 1000
);

camera.position.z = 10;
camera.position.x=2
camera.rotation.y=Math.PI*0.1

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshStandardMaterial({color:0xFF0000});
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const geometry1 = new THREE.BoxGeometry(2,2,2);
const material1 = new THREE.MeshStandardMaterial({color:0x4169E1});
const cubeMesh1 = new THREE.Mesh(geometry1, material1);
scene.add(cubeMesh1);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,1,5);
scene.add(light);

//Moving objects x y z 

cubeMesh.position.x=-0.7
cubeMesh.position.y=-0.6
cubeMesh.position.z=1

console.log(cubeMesh.position.distanceTo[camera.position])


//axes Helper

const axesHelper=new THREE.AxesHelper(4)
scene.add(axesHelper)


//scaling Objects

// cubeMesh.scale.x=2
// cubeMesh.scale.y=0.25
// cubeMesh.scale.z=0.5

//rotation

// cubeMesh.rotation.x=Math.PI*0.5 //for 90 degree angle 



//Combinating Transformations

cubeMesh.position.x=1.4
cubeMesh.position.y=1
cubeMesh.scale.x=2
cubeMesh.scale.y=0.2
cubeMesh.scale.z=0.2

cubeMesh.rotation.x=Math.PI*0.8
cubeMesh.rotation.y=Math.PI*0.3


//Combinating trans for Blue
cubeMesh1.position.x=-0.1
cubeMesh1.position.y=-1
cubeMesh1.position.z=1
cubeMesh1.scale.x=2
cubeMesh1.scale.y=0.2
cubeMesh1.scale.z=0.2

cubeMesh1.rotation.x=Math.PI*0.8
cubeMesh1.rotation.y=Math.PI*0.7
cubeMesh1.rotation.z=Math.PI*0.4



//scene graph

const group=new THREE.Group();
group.scale.y=1
group.rotation.y=0.2
group.position.x=-4
scene.add(group);

const cube1=new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0xfff00})
)
cube1.position.x=1.5
cube1.position.y=-1.5
group.add(cube1,cubeMesh,cubeMesh1)


function animate(){
    requestAnimationFrame(animate);
    // cubeMesh.rotation.x -=0.03;
    // cubeMesh.rotation.y +=0.03;
    group.rotation.y+=0.02
    renderer.render(scene,camera);
}

animate();