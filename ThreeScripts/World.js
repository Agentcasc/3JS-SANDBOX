import * as THREE from './three.js';
import Creator from "./Creator.js";
import { EventEmitter } from "events";
import Controls from "./Controls.js";
import AssetManager from "./AssetManager.js";



export default class World extends EventEmitter{
    constructor() {
        super();
        this.creator = new Creator();
        this.sizes = this.creator.sizes;
        this.scene = this.creator.scene;
        this.canvas = this.creator.canvas;
        this.camera = this.creator.camera;
        this.assetManager = this.creator.assetManager;

        this.controls = new Controls();

        this.scene.background = new THREE.Color(0xffffff);


    }


    resize() {

    }

    update() {
        if (this.controls) {
            this.controls.update();
        }
    }



}