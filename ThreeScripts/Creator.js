import * as THREE from './three.js';
import Time from './Time.js';
import Sizes from './Sizes.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World.js';
import AssetManager from './AssetManager.js';
import Lighting from './Lighting.js';
import Controls from "./Controls.js";
import ElementManager from "./ElementManager.js";

export default class Creator{
    static instance;
    constructor(canvas){
        if(Creator.instance) {
            return Creator.instance;
        }
        Creator.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.assetManager = new AssetManager();
        this.elementManager = new ElementManager();
        this.lighting = new Lighting();




        this.time.on("update", () => {
            this.update()
        });
    }

    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();
        this.assetManager.update();
        this.elementManager.update();

        if (this.world.controls) {
            this.world.controls.update();
        }

    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
        this.elementManager.resize();

    }

}