// Set up the scene, camera, and renderer as global variables.
let scene,
    camera,
    renderer;

init();
animate();

// Sets up the scene.
function init() {
    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight,
        light,
        loader,
        axis;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.id = "experiment";
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(scene.position);

    // Create a light, set its position, and add it to the scene.
    // light = new THREE.PointLight(0xffffff);
    // light.position.set(-100, 200, 100);
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.castShadow = true;
    spotLight.position.set(8,3,1);


    let planeGeometry = new THREE.PlaneGeometry(10,10,10);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xDDDDDD});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -.5*Math.PI;
    plane.receiveShadow = true;

    // Add object
    loader = new THREE.JSONLoader();
    loader.load('test.json', function(geometry) {
        // var material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
        var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        test = new THREE.Mesh(geometry, material);
        test.castShadow = true;
        scene.add(test);
    });

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //add axis
    axis = new THREE.AxisHelper(10);

    //add grid
    let grid = new THREE.GridHelper(50,5);
    let gridColor = new THREE.Color("rgb(255,0,0)");
    grid.setColors(gridColor, 0x000000); 

    addToScene(scene, [camera, light, axis, plane, spotLight]);
}

// Renders the scene and updates the render as needed.
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

function addToScene(scene, objects) {
    for (let i in objects) {
        scene.add(objects[i]);
    }
}