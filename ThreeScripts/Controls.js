import * as THREE from './three.js';
import Creator from './Creator.js';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import {EventEmitter} from "events";
import GSAP from 'gsap';


export default class Controls extends EventEmitter{
    constructor() {
        super();
        this.creator = new Creator();
        this.scene = this.creator.scene;
        this.camera = this.creator.camera;

        this.progress = 0;
        this.position = new THREE.Vector3(0,0,0);
        this.lookAtPosition = new THREE.Vector3(0, 0.2, -5);
        this.directonalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,1,0);
        this.crossVector = new THREE.Vector3(0,0,0);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.025,
        }
        // this.lerpLimit = 0.155;
        this.lerpLimit = 0.85;
        this.lerpMin = 0.5;
        this.INCREMENT = 0.025;//0.005
        this.currentPosition = 1;

        this.createdDirections = false;

        this.positionList = [
            [-0.3, -0.1, 0.8],
            [0, 0.2, -5],
            [0.3, 0, 0.8]
        ];


        this.setPath();
        this.onWheel();
        this.autoMover();


        //if D key is pressed, change lookAtPosition to (5, 0.2, -1)
        window.addEventListener('keydown', (event) => {
            //if event.key === Left arrow
            if (event.key === 'ArrowRight' && this.currentPosition != 2 && this.lerp.target >= 0.8) {
                this.currentPosition += 1;
                GSAP.to(this.lookAtPosition, {
                    duration: 0.5,
                    x:this.positionList[this.currentPosition][0],
                    y: this.positionList[this.currentPosition][1],
                    z: this.positionList[this.currentPosition][2],
                    ease: 'power2.out',
                });

            }else if (event.key === 'ArrowLeft' && this.currentPosition != 0 && this.lerp.target >= 0.8){
                this.currentPosition -= 1;
                GSAP.to(this.lookAtPosition, {
                    duration: 0.5,
                    x:this.positionList[this.currentPosition][0],
                    y: this.positionList[this.currentPosition][1],
                    z: this.positionList[this.currentPosition][2],
                    ease: 'power2.out',
                });
            }//if key is 'd' and currentPosition is 2, make currentPosition 0
            else if (event.key === 'ArrowRight' && this.currentPosition === 2 && this.lerp.target >= 0.8){
                this.currentPosition = 0;
                GSAP.to(this.lookAtPosition, {
                    duration: 0.5,
                    x:this.positionList[this.currentPosition][0],
                    y: this.positionList[this.currentPosition][1],
                    z: this.positionList[this.currentPosition][2],
                    ease: 'power2.out',
                });
            }//if key is 'a' and currentPosition is 0, make currentPosition 2
                else if (event.key === 'ArrowLeft' && this.currentPosition === 0 && this.lerp.target >= 0.8){
                this.currentPosition = 2;
                GSAP.to(this.lookAtPosition, {
                    duration: 0.5,
                    x:this.positionList[this.currentPosition][0],
                    y: this.positionList[this.currentPosition][1],
                    z: this.positionList[this.currentPosition][2],
                    ease: 'power2.out',
                });
            }
        });

        //this.pictureFrame.position.set(-0.3, -0.180, 0.8);
        //this.mug.position.set(0.9, 1.33, 0.8);
        //this.macbook.position.set(0, 0.1, 1);


    }

    //move macbook with mouse movement
    onMove(){
        window.addEventListener('mousemove', (event) => {
            this.lerp.target = event.clientX / window.innerWidth;
        });
    }



    onWheel(){
        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                if (this.lerp.target < this.lerpLimit) {
                    this.lerp.target += this.INCREMENT;

                    if (this.lerp.target >= this.lerpLimit){

                        this.emit('near');
                    }
                }

                if (this.lerp.target >= 0.8 && this.createdDirections === false){
                    this.emit("CREATE DIRECTIONS")
                    this.createdDirections = true;
                }

                //if target is more than 0.835, && createdDirections is false, emit REMOVE DIRECTIONS
                if (this.lerp.target >= 0.86 && this.createdDirections === true){
                    this.emit("REMOVE DIRECTIONS")
                    this.createdDirections = false;
                }
            } else if (event.deltaY < 0) {
                if (this.lerp.target > this.lerpMin) {
                    this.lerp.target -= this.INCREMENT;

                    if (this.lerp.target <= this.lerpLimit){
                        this.emit('far');
                    }
                    if (this.lerp.target <= 0.8){
                        this.currentPosition = 1;
                        GSAP.to(this.lookAtPosition, {
                            duration: 2,
                            x:this.positionList[this.currentPosition][0],
                            y: this.positionList[this.currentPosition][1],
                            z: this.positionList[this.currentPosition][2],
                            ease: 'power0.out',
                        });
                        this.emit("REMOVE DIRECTIONS")
                        this.createdDirections = false;
                    }

                    //if lerp.target is <= 0.835, && createdDirections is false, emit CREATE DIRECTIONS
                    if (this.lerp.target >= 0.85 && this.createdDirections === false){
                        this.emit("CREATE DIRECTIONS")
                        this.createdDirections = true;
                    }
                }
            }
        });
    }

    autoMover(){
        //on load
        window.addEventListener('load', () => {
            //keep adding to this.lerp.target until position:(0, 0, 1)
            this.lerp.target += 0.5;

        });
    }

    setPath(){
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 5, 3),
            new THREE.Vector3(0, 0.1, 1),
            new THREE.Vector3(0, 0, 0),



        ],false);

        // //add curve to world
        // this.curveMesh = new THREE.Mesh(
        //     new THREE.TubeGeometry(this.curve, 100, 0.01, 8, false),
        //     new THREE.MeshBasicMaterial({color: 0x000000})
        // );
        // this.scene.add(this.curveMesh);

    }
    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.curve.getPointAt(this.lerp.current%1, this.position);
        this.camera.orthographicCamera.position.copy(this.position);

        this.directonalVector.subVectors(
            this.curve.getPointAt(((this.lerp.current % 1)+0.000001)),
                this.lookAtPosition
        );
        this.directonalVector.normalize();

        this.crossVector.crossVectors(
            this.directonalVector,
            this.staticVector
        );

        this.crossVector.multiplyScalar(100000);
        this.camera.orthographicCamera.lookAt(this.lookAtPosition);




    }


}