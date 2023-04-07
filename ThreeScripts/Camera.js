import * as THREE from './three.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Creator from "./Creator.js";
import GSAP from "gsap";


export default class Camera{
    constructor() {
        this.creator = new Creator();
        this.sizes = this.creator.sizes;

        this.scene = this.creator.scene;
        this.canvas = this.creator.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        // this.setOrbitControls()

        this.xRotation = 0;
        this.yRotation = 0;

        this.yLerp = {
            target: 0,
            current: 0,
            ease: 0.1,
        }

        this.xLerp = {
            target: 0,
            current: 0,
            ease: 0.1,
        }

        this.lerp = {
            target: 0,
            current: 0,
            ease: 0.1,
        }

        // this.onMouseMove();



    }

    onMouseMove() {

        window.addEventListener("mousemove", (e) => {
            this.xRotation = e.clientX / this.sizes.width - 0.05;
            this.yRotation = e.clientY / this.sizes.height - 0.05;
            this.xLerp.current = this.xRotation * 0.05;
            this.yLerp.current = -this.yRotation * 0.05;
        });
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            75,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.perspectiveCamera);


        this.perspectiveCamera.position.x = 0;
        this.perspectiveCamera.position.z = 2;
        this.perspectiveCamera.position.y = 0;

    }


    createOrthographicCamera(){

        this.orthographicCamera = new THREE.PerspectiveCamera(
            75,
            this.sizes.aspect,
            0.1,
            1000);

        this.orthographicCamera.position.x = -2;
        this.orthographicCamera.position.z = 8;
        this.orthographicCamera.position.y = 2;

        this.scene.add(this.orthographicCamera);

        this.helper = new THREE.CameraHelper( this.orthographicCamera );
        this.scene.add(this.helper );
        this.helper.visible = false;


        // const size = 20;
        // const divisions = 20;
        //
        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );
        //
        // const axesHelper = new THREE.AxesHelper( 50 );
        // this.scene.add( axesHelper );


    }

    setOrbitControls(){
        this.setSwitch = true;

        if (this.setSwitch == false){
            this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
        }else{
            this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        }
        this.controls.enableDamping = false;
        this.controls.enablePan = true;
        this.controls.enableZoom = false;


    }

    resize(){
        //updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();


        //updating Perspective Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.top = (this.sizes.frustrum/2);
        this.orthographicCamera.bottom = (-this.sizes.frustrum/2);


    }
    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.orthographicCamera.position.x = this.xLerp.current;
        this.orthographicCamera.position.y = this.yLerp.current;
        // this.controls.update();
        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();

        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);

    }
}