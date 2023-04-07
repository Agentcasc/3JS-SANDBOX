import * as THREE from './three.js';
import Creator from "./Creator.js";


export default class Lighting{
    constructor(){
        this.creator = new Creator();
        this.sizes = this.creator.sizes;
        this.scene = this.creator.scene;
        this.canvas = this.creator.canvas;
        this.camera = this.creator.camera;
        this.world = this.creator.world;
        this.assetManager = this.creator.assetManager;

        // //new light
        this.light = new THREE.DirectionalLight(0xffffff, 2);
        this.light.position.set(0, 1, 0);
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.scene.add(this.light);

        // //new light
        this.light1 = new THREE.AmbientLight(0xffffff, 2);
        this.light1.position.set(0.9, 1.33, 0.8);
        this.scene.add(this.light1);




    }




}