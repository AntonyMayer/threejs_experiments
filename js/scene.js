var scene,
    camera,
    renderer,
    controls,
    datGUI = new dat.GUI(),
    guiControls = {
        positionX: 1,
        // positionY: 1,
        positionZ: 1,
        // rotationX: .01,
        rotationY: .01,
        // rotationZ: .01
    };

init();
animate();
createGUI(guiControls);

function init() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    /**
     * SCENE
     */
    scene = new THREE.Scene();

    /**
     * RENDERER
     */
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.id = "experiment";
    document.body.appendChild(renderer.domElement);

    /**
     * CAMERA
     */
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(29, 21, 26);
    camera.lookAt(scene.position);

    /**
     * ORBIT CONTROLS
     */
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    /**
     * LIGHT
     */
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.castShadow = true;
    spotLight.position.set(15, 30, 50);

    /**
     * PLANE
     */
    let planeGeometry = new THREE.PlaneGeometry(30, 30, 30),
        planeMaterial = new THREE.MeshLambertMaterial({ color: 0xDDDDDD }),
        plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -.5 * Math.PI;
    plane.receiveShadow = true;

    /**
     * OBJECT from JSON
     */
    let loader = new THREE.JSONLoader();
    loader.load('test.json', loadCallback);

    /**
     * D.
     */
    // TODO: add "d." string object to scene, research on json based fonts
    //  let logoTextGeometry = new THREE.TextGeometry('d.', {size: 10, height: 5}),
    //      logoTextMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 }),
    //      logoText = new THREE.Mesh(logoTextGeometry, logoTextMaterial);

    /**
     * UPDATE SCENE
     */
    addToScene([camera, plane, spotLight]);
}

class Figure {
    constructor() {

    }
}

// Renders the scene and update orbit mouse controls
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

function loadCallback(geometry) {
    var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
    test = new THREE.Mesh(geometry, material);
    test.castShadow = true;
    scene.add(test);
    animateObject();
}

function animateObject() {
    test.position.x = guiControls.positionX;
    // test.position.y = guiControls.positionY;
    test.position.z = guiControls.positionZ;

    // test.rotation.x += guiControls.rotationX;
    test.rotation.y += guiControls.rotationY;
    // test.rotation.z += guiControls.rotationZ;
    requestAnimationFrame(animateObject);
    renderer.render(scene, camera);
}

function createGUI(controls) {
    for (let prop in controls) {
        datGUI.add(controls, prop, -controls[prop] * 12.5, controls[prop] * 12.5);
    }
}

function addToScene(objects) {
    for (let item of objects) {
        scene.add(item);
    }
}