import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class SceneInit {
    constructor({ rootEl, autoRotate }) {
        this.canvas = document.createElement('canvas');

        this.root = rootEl;
        this.width = rootEl.clientWidth;
        this.height = rootEl.clientHeight;

        this.background = 0xEEEEEE;

        this.autoRotate = autoRotate;

        this.init();
        this.update();
        this.bindEvents();
    }

    init() {
        this.initScene();
        this.initLights();
        this.initCamera();
        this.initRenderer();
        this.initControls();

        this.root.appendChild(this.canvas);
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initLights() {
        const ambient = new THREE.AmbientLight(0xFFFFFF, 0.9);
        const point = new THREE.PointLight(0xCCCCCC, 0.1, 10);
        const directional = new THREE.DirectionalLight(0xFFFFFF, 0.5);

        this.scene.add(ambient);
        this.scene.add(point);
        this.scene.add(directional);
    }

    initCamera() {
        const aspect = this.width / this.height;

        this.camera = new THREE.PerspectiveCamera(
            45,
            aspect,
            1,
            1000
        );

        this.camera.position.z = 15;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(this.background, 1);

        this.canvas = this.renderer.domElement;
    }

    initControls() {
        this.controls = new OrbitControls(
            this.camera,
            this.canvas
        );

        this.controls.minPolarAngle = (Math.PI * 1) / 6;
        this.controls.maxPolarAngle = (Math.PI * 3) / 4;

        this.controls.smooth = true;
        this.controls.smoothspeed = 0.95;
        this.controls.autoRotateSpeed = 2;
        this.controls.maxDistance = 20;
        this.controls.minDistance = 12;

        this.controls.update();
    }

    render() {
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    update() {
        requestAnimationFrame(() => this.update());

        this.controls.autoRotate = this.autoRotate;

        this.controls.update();

        this.render();
    }

    loadModel(model, callback) {
        this.loader = new GLTFLoader();

        this.loader.load(model, (gltf) => {
            if (typeof callback === 'function') {
                callback(gltf.scene);
            }

            this.scene.add(gltf.scene);
        });
    }

    add(model) {
        this.scene.add(model);
    }

    remove(objName) {
        const object = this.scene.getObjectByName(objName);

        if (object) {
            this.scene.remove(object);
        }
    }

    onResize() {
        this.width = this.root.clientWidth;
        this.height = this.root.clientHeight;

        this.renderer.setSize(this.width, this.height);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.onResize());
    }
}

// To call our class as a function
const sceneInit = args => new SceneInit(args);

export default sceneInit;
