import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background= new THREE.Color(0x202020)

const sizes = {
  width:800,
  height:600
}
const aspect = sizes.width/sizes.height

const orthographicCamera =new THREE.OrthographicCamera(
  -1*aspect, 1*aspect, 1,-1,0.1,100)
orthographicCamera.position.set(5,5,5)
orthographicCamera.lookAt(0,0,0)
scene.add(orthographicCamera)


// const perspectiveCamera= new THREE.perspectiveCamera(
//   75, sizes.width/sizes/height,0.1,100
// )

// scene.add(perspectiveCamera)



const ambientLight= new THREE.AmbientLight(0xffeecc,0.7)
scene.add(ambientLight)

const dirLighting= new THREE.DirectionalLight(0xffeecc, 0.7)
dirLighting.position.set(2,5,5)
dirLighting.castShadow=true
dirLighting.shadow.mapSize.width=2080
dirLighting.shadow.mapSize.height=2080
scene.add(dirLighting)

const cubeGeometry= new THREE.BoxGeometry(1,1,1)
const cubeMaterial= new THREE.MeshLambertMaterial({color:0xff0000})
const cubeMesh=new THREE.Mesh(cubeGeometry,cubeMaterial)

cubeMesh.position.set(0,1,0)

scene.add(cubeMesh)
cubeMesh.castShadow=true


const planeGeometry=new THREE.PlaneGeometry(5,5)
const planeMaterial= new THREE.MeshStandardMaterial({color: 0x00ff00, roughness:0.7})
const planeMesh=new THREE.Mesh(planeGeometry,planeMaterial)

planeMesh.position.y=-0
planeMesh.rotation.x = - Math.PI * 0.5;
planeMesh.receiveShadow=true
scene.add(planeMesh)
 


const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled=true

const controls= new OrbitControls(orthographicCamera,renderer.domElement)
controls.enableDamping=true



const animate = ()=>{
  renderer.render(scene,orthographicCamera)
  requestAnimationFrame(animate)
  cubeMesh.rotation.x += 0.01
  cubeMesh.rotation.y += 0.01
  controls.update()

}
animate ();

