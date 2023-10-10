let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;


window.onload = function(){
    let canv = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({canvas: canv});
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    document.body.appendChild(renderer.domElement);
    console.log(renderer.domElement);
    let cubeGeometry = new THREE.BoxGeometry(2,2,2);
    let cubeMaterial = new THREE.MeshBasicMaterial({color:0x000000, wireframe: true});
    cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    let background = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    scene.background = new THREE.Color(background);
    console.log(background);
    scene.add(cube);
    cube.rotation.x = Math.random(-1,1);
    cube.rotation.y = Math.random(-1,1);
    cube.rotation.z = Math.random(-1,1);
    camera.position.z = 5;
    animate();
}

function animate(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

