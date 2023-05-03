import * as THREE from './three.js/build/three.module.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from "./three.js/examples/jsm/geometries/TextGeometry.js"
import {FontLoader} from "./three.js/examples/jsm/loaders/FontLoader.js"
import {GLTFLoader} from "./three.js/examples/jsm/loaders/GLTFLoader.js"

var scene, renderer, camera;

renderer = new THREE.WebGLRenderer({
    antialias: true
});
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera();


var camera2, currentCamera

var FOV = 45;
var ratio = window.innerWidth / window.innerHeight;
var near = 1;
var far = 1000;

camera = new THREE.PerspectiveCamera(FOV, ratio, near, far);
currentCamera = camera

var viewSize = 10
var left = viewSize * ratio / -2
var right = viewSize * ratio / 2
var top = viewSize / 2
var bottom = viewSize / -2

camera2 = new THREE.OrthographicCamera(
    left, 
    right,
    top,
    bottom,
    near,
    far
); 

camera.position.set(10, 10, 10) // x, y, z
camera.lookAt(0, 0, 0 )

// camera.rotate()

renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0xff0000)
// let boxGeo = new THREE.BoxGeometry()
// let boxMaterial = new THREE.MeshNormalMaterial({
//     wireframe : true
// })

// let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
// scene.add(boxMesh)

renderer.render(scene, camera)

window.onresize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
}


// pert3
// 2D object [point, line, plane]
let vertex = [
    new THREE.Vector2(3, 3),
    new THREE.Vector2(3, -3),
    new THREE.Vector2(-3, -3),
    new THREE.Vector2(-3, 3)
]

var createPoints = (vertex) => {
    let bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertex);
    let pointMaterial = new THREE.PointsMaterial()
    let points = new THREE.Points(bufferGeometry, pointMaterial)
    return points
}

var createLines = (vertex) => {
    let bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertex);
    let lineMaterial = new THREE.LineBasicMaterial();
    let line = new THREE.LineLoop(bufferGeometry, lineMaterial)
    return line;
}

var createPlane = (vertex) => {
    let planeGeometry = new THREE.PlaneGeometry(5, 5)
    let planeMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0xaaaa00
    })
    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    planeMesh.position.y = -1
    planeMesh.rotation.x = Math.PI/2
    planeMesh.receiveShadow = true;
    planeMesh.name = 'Hans';
    return planeMesh
}

scene.add(createPlane(vertex))
scene.add(createLines(vertex))
scene.add(createPoints(vertex))

// Pertemuan 4
var createBox = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1)
    let boxMaterial = new THREE.MeshNormalMaterial()
    let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
    return boxMesh
} 

var createCone = () => {
    let coneGeo = new THREE.ConeGeometry(1, 1, 64, 1)
    let coneMaterial = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let coneMesh = new THREE.Mesh(coneGeo, coneMaterial)
    return coneMesh
}

var createSphere = ()=>{
    let sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    let sphereMaterial = new THREE.MeshNormalMaterial()
    let sphereMesh = new THREE.Mesh(sphereGeo, sphereMaterial)
    return sphereMesh
}

var createCylinder = () => {
    let cylinderGeo = new THREE.CylinderGeometry()
    let cylinderMaterial = new THREE.MeshNormalMaterial()
    let cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMaterial)

    let wireFramGeo = new THREE.WireframeGeometry(cylinderGeo)
    let wireLine = new THREE.LineSegments(wireFramGeo);
    wireLine.material.color = new THREE.Color(0,125,0)
    wireLine.position.z += 2
    // scene.add(wireLine)
    return cylinderMesh
}

var cylinderMesh = createCylinder()
// scene.add(cylinderMesh)
var sphereMesh = createSphere()
// scene.add(sphereMesh)
var meshCone = createCone()
// scene.add(meshCone)
// scene.add(createBox())


// Material
// Pertemuan 4
var createBoxTextured = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1)
    let boxMaterial = new THREE.MeshBasicMaterial()
    let loader = new THREE.TextureLoader().load('./Assets/assets.jpeg')
    let loader1 = new THREE.TextureLoader().load('./Assets/nmap.jpeg')
    
    boxMaterial = new THREE.MeshLambertMaterial({
        // color: 0xFF0505,
        map: loader,
        normalMap: loader1
    })
    
    
    // boxMaterial.color = new THREE.Color(125, 125, 0)
    let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
    return boxMesh
} 
// scene.add(createBoxBasic())

var createBoxLambert = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1)
    let boxMaterial = new THREE.MeshLambertMaterial()
    boxMaterial.color = new THREE.Color(125, 125, 0)
    let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
    return boxMesh
} 

var createBoxGlossy = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1)
    let boxMaterial = new THREE.MeshBasicMaterial()
    let loader = new THREE.TextureLoader().load('./Assets/assets.jpeg')
    let loader1 = new THREE.TextureLoader().load('./Assets/nmap.jpeg')

    boxMaterial = new THREE.MeshPhongMaterial({
        // color: 0xFF0505,
        shininess: 10,
        specular: 0xffffff,
        map: loader,
        normalMap: loader1
    })


    // boxMaterial.color = new THREE.Color(125, 125, 0)
    let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
    boxMesh.castShadow = true;
    return boxMesh
} 
// let box = createBoxGlossy()

var createBoxStandard = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1)
    let boxMaterial = new THREE.MeshBasicMaterial()
    let loader = new THREE.TextureLoader().load('./Assets/assets.jpeg')
    let loader1 = new THREE.TextureLoader().load('./Assets/nmap.jpeg')

    boxMaterial = new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 1,
        map: loader,
        normalMap: loader1
    })

    // boxMaterial.color = new THREE.Color(125, 125, 0)
    let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
    boxMesh.castShadow = true;
    return boxMesh
} 
let box = createBoxStandard()

scene.add(box)


let ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

let pointLight = new THREE.PointLight(0xffffff, 1, 100)
let pointLightHelper = new THREE.PointLightHelper(pointLight)
pointLight.position.y += 3
pointLight.position.x += 1

let spotLight = new THREE.SpotLight(0xffffff, 1000, 1, Math.PI/6)
let spotLightHelper = new THREE.SpotLightHelper(spotLight)
// spotLight.rotation.x = Math.PI/4 // lupakan sajah

let directionalLight = new THREE.DirectionalLight(0xffffff, 10000)
let directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
directionalLight.target = box
directionalLight.position.x += 3
directionalLight.castShadow = true;
scene.add(directionalLight)
scene.add(directionalHelper)
let velocity = 0.01


// scene.add(spotLight)
// scene.add(spotLightHelper)

// scene.add(pointLight)
// scene.add(pointLightHelper)

var control = new OrbitControls(camera, renderer.domElement)
control.update()

var createFont = () => {
    let font= new FontLoader().load("./three.js/examples/fonts/gentilis_bold.typeface.json", function(font) {
        let fontGeo = new TextGeometry('Hello', {
            font: font,
            size: 1,
            height: 1
        })
        fontGeo.center()
        let fontMaterial = new THREE.MeshNormalMaterial()
        let fontMesh = new THREE.Mesh(fontGeo, fontMaterial)
        scene.add(fontMesh)
    })
}
createFont()

window.addEventListener('keydown', (e)=>{
    if(e.key == ' '){
        if(currentCamera == camera){
            currentCamera = camera2
        } else {
            currentCamera = camera
        }
    }
})

var rayCast = new THREE.Raycaster()
var pointer = new THREE.Vector2()

window.addEventListener("pointerdown", (e)=>{
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1
    rayCast.setFromCamera(pointer, currentCamera)

    let intersects = rayCast.intersectObjects(scene.children)

    for(let i = 0; i<intersects.length; i++){
        console.log(intersects[i])
        if(intersects[i].name == 'Hans'){
            intersects[i].object.position.y += 1
        } else {
            intersects[i].object.position.x += 1
        }
    }
})

var clock = new THREE.Clock()
var gltfloader = new GLTFLoader().load('./Assets/phoenix_bird/scene.gltf', (object)=>{
    let model = object.scene
    model.scale.set(0.01, 0.01, 0.01)

    let animation = object.animations[0]
    let mixer = new THREE.AnimationMixer(model)
    let action = mixer.clipAction(animation)

    action.play()
    
    function animate(){
        let delta = clock.getDelta()
        requestAnimationFrame(animate)
        mixer.update(delta)
    }
    animate()
    
    scene.add(model)
})

let textureLoader = new THREE.TextureLoader()
let boxMaterialArr = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_right.jpg'),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_left.jpg'),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_top.jpg'),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_bottom.jpg'),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_front.jpg'),
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./Assets/skybox/daylight_box_back.jpg'),
        side: THREE.DoubleSide
    })]

let skyGeo = new THREE.BoxGeometry(1000, 1000, 1000)
let skyBox = new THREE.Mesh(skyGeo, boxMaterialArr)
scene.add(skyBox)

let renderFunction = () => {
    renderer.render(scene, currentCamera)
    meshCone.rotation.x += 0.01
    meshCone.rotation.y += 0.01
    meshCone.rotation.z += 0.01

    sphereMesh.position.y += 0.01
    requestAnimationFrame(renderFunction)
    box.position.z += velocity
    if(box.position.z > 2){
        velocity = -0.01
    } else if (box.position.z < -2){
        velocity = 0.01
    }
}

renderFunction()