import * as THREE from './three.js';
import Creator from "./Creator.js";

export default class Renderer {
    constructor() {
        this.creator = new Creator();
        this.scene = this.creator.scene;
        this.camera = this.creator.camera;
        this.canvas = this.creator.canvas;
        this.sizes = this.creator.sizes;

        //background color
        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }



    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene, this.camera.orthographicCamera);

    }


}