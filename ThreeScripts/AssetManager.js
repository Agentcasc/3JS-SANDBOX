import * as THREE from 'three';
import Creator from "./Creator.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class AssetManager{

    constructor() {
        this.creator = new Creator();
        this.sizes = this.creator.sizes;
        this.scene = this.creator.scene;
        this.canvas = this.creator.canvas;
        this.camera = this.creator.camera;
        this.world = this.creator.world;
        this.GLTFLoader = new GLTFLoader();

        this.macBook();

        this.GLTFLoader.load(
            "/stickynote.glb",
            (gltf) => {
                this.sticky = gltf.scene;
                this.sticky.scale.set(0.65, 0.65, 0.65);
                this.sticky.position.set(-0.1, -0.192, 0.875);
                this.sticky.rotation.set(0.3225, 0, 0);
                this.scene.add(this.sticky);
            }
        );

        this.GLTFLoader.load(
            "/pictureframe.glb",
            (gltf) => {
                this.pictureFrame = gltf.scene;
                this.pictureFrame.scale.set(0.05, 0.05, 0.05);
                this.pictureFrame.position.set(-0.3, -0.125, 0.8);
                this.pictureFrame.rotation.set(0.3, -0.8, 0);
                this.scene.add(this.pictureFrame);
            });

        this.GLTFLoader.load(
            "/mug.glb",
            (gltf) => {
                this.mug = gltf.scene;
                this.mug.scale.set(0.15, 0.15, 0.15);
                this.mug.position.set(1, 1.815, 2.125);
                this.mug.rotation.set(0.3, -0.8, 0);
                this.scene.add(this.mug);

            });

        this.GLTFLoader.load(
            "/desk.glb",
            (gltf) => {
                this.desk = gltf.scene;
                this.desk.scale.set(0.75, 0.75, 0.75);
                this.desk.position.set(0.25, -0.68, 0.55);
                this.desk.rotation.set(0.3, 0, 0);
                this.scene.add(this.desk);
            });




    }



    macBook() {
        // load macbook
        this.GLTFLoader.load(
            "/macbook.glb",
            (gltf) => {
                this.macbook = gltf.scene;
                this.macbook.scale.set(1, 1, 1);
                this.macbook.position.set(0, -0.125, 0.85);
                this.macbook.rotation.set(0.3, 0, 0);
                this.scene.add(this.macbook);
            }
        );
    }




    // const earthLabel = new CSS2DObject( earthDiv );
    // earthLabel.position.set( 1.5 * EARTH_RADIUS, 0, 0 );
    // earthLabel.center.set( 0, 1 );
    // earth.add( earthLabel );
    // earthLabel.layers.set( 0 );


    update(){
            if (this.world) {
                this.world.update();
            }

    }



}

