// main.js
import * as THREE from 'three';
import { OrbitControls, Wireframe } from 'three/examples/jsm/Addons.js';

const sizes ={
    width:800,
    height:600
}

const cursor = {x:0, y:0}
window.addEventListener('mousemove',(event)=>{
    cursor.x=event.clientX/sizes/width-0.5
    cursor.y= - (event.client/sizes.height-0.5)
})
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // black background


// mesh
const mesh=  new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,5,5,5),
    new THREE.MeshBasicMaterial({color:0xff0000, wireframe:true})
)
scene.add(mesh)


// Perspective
// const camera = new THREE.PerspectiveCamera(
//   75,                                      // Field of view
//   sizes.width / sizes.height,              // Aspect ratio
//   0.1,                                     // Near clipping plane
//   100                                     // Far clipping plane
// );
// camera.position.z=3
// scene.add (camera)


// Orthographic Camera
const aspect = sizes.width / sizes.height;

const camera = new THREE.OrthographicCamera(
  -1* aspect, // left
  1* aspect,  // right
  1,          // top
  -1,         // bottom
  0.1,        // near
  100         // far
);
scene.add(camera)

camera.position.z = 3;


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping=true


//animation loop 
const animate =() =>{
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', ()=>{
    sizes.width=window.innerWidth,
    sizes.height=window.innerHeight,
    camera.aspect=sizes.width/sizes.height,
    renderer.setSize(sizes.width, sizes.height)
})
