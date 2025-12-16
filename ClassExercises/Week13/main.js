import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    800 / 600,
    0.1,
    100
);
camera.position.set(2, 2, 6);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// UI
const infoPanel = document.getElementById("info");

// Cubes
const cubes = [];
let lastSelectedCube = null;
let lastSelectedColor = null;

for (let i = 0; i < 20; i++) {
    const width = randBetween(0.3, 1);
    const height = randBetween(0.3, 1);
    const depth = randBetween(0.3, 1);

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        randBetween(-4, 4),
        randBetween(-4, 4),
        randBetween(-5, 0)
    );

    // Store size for later display
    cube.userData.size = { width, height, depth };

    scene.add(cube);
    cubes.push(cube);
}

// Mouse click
window.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Reset previous selection
    if (lastSelectedCube) {
        lastSelectedCube.material.color.set(lastSelectedColor);
        lastSelectedCube = null;
    }

    if (intersects.length === 0) {
        infoPanel.textContent = "No object selected.";
        return;
    }

    const cube = intersects[0].object;

    lastSelectedCube = cube;
    lastSelectedColor = cube.material.color.getHex();

    // Highlight cube
    cube.material.color.set(0xffffff);

    const { x, y, z } = cube.position;
    const { width, height, depth } = cube.userData.size;

    infoPanel.innerHTML = `
        <strong>Cube Selected</strong><br/>
        Position:<br/>
        x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, z: ${z.toFixed(2)}<br/><br/>
        Size:<br/>
        width: ${width.toFixed(2)}, 
        height: ${height.toFixed(2)}, 
        depth: ${depth.toFixed(2)}
    `;
});

// Resize
window.addEventListener("resize", () => {
    const width = 800;
    const height = 600;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Animation loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Helpers
function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    return Math.random() * 0xffffff;
}
