import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Creator from './Creator.js';


export default class ElementManager{
    constructor() {
        this.creator = new Creator();
        this.scene = this.creator.scene;
        this.camera = this.creator.camera;
        this.container = document.querySelector(".experience");
        this.loadedElements = false;
        this.accessed = false;
        this.viewingDesktop = true;
        this.lastOpened = null;

        this.creator.world.controls.on("near", () => {
            if (!this.loadedElements) {
                if (!this.accessed) {
                    this.loginElements();
                } else if (this.accessed && this.viewingDesktop) {
                    this.createIcons();
                    this.createMacOS();
                } else if (this.accessed && !this.viewingDesktop) {
                    if (this.lastOpened === "project") {
                        console.log("Project Opened")
                        this.createMacOS();
                    }else{
                        this.createAboutMe()
                        this.createMacOS();
                    }
                }
                this.loadedElements = true;
            }
        });

        this.creator.world.controls.on("far", () => {

            if (this.loadedElements) {

                if (!this.accessed) {
                    this.scene.remove(this.passWordContainerObject);
                    this.scene.remove(this.nameContainerObject);
                    this.scene.remove(this.pictureContainerObject);
                }else if(this.accessed && this.viewingDesktop){
                    this.scene.remove(this.iconContainerObject);
                    this.scene.remove(this.iconContainerObject2);
                    this.scene.remove(this.macOSObject);
                } else if (this.accessed && !this.viewingDesktop) {
                    if (this.lastOpened === "project") {
                        // this.scene.remove(this.projectObject);
                        this.scene.remove(this.macOSObject);
                    }else{
                        this.scene.remove(this.aboutMeContainerObject);
                        this.scene.remove(this.closeButtonObject);
                        this.scene.remove(this.macOSObject);

                    }
                }
                this.loadedElements = false;
            }
        });

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = 0;
        this.container.appendChild(this.labelRenderer.domElement);

        this.creator.world.controls.on("CREATE DIRECTIONS", () => {
            this.createDirections();
        });

        this.creator.world.controls.on("REMOVE DIRECTIONS", () => {
            this.removeDirections();
        });





    }

    removeIcons(){
        this.scene.remove(this.iconContainerObject);
        this.scene.remove(this.iconContainerObject2);
    }

    createIcons(){
        this.projectIcon = document.querySelector("#projects")
        this.projectIconClone = this.projectIcon.cloneNode(true);
        //this.projectIcon add event listener click

        this.projectIconClone.addEventListener("click", () => {
            this.removeIcons();

            this.viewingDesktop = false;
            this.lastOpened = "project";
        });





//Berkeley
        console.log(document.querySelector("#aboutMe"));
        this.abtmIcon = document.querySelector("#aboutMe");

        this.abtmIconClone = this.abtmIcon.cloneNode(true);
        console.log(this.abtmIconClone);

        this.abtmIconClone.addEventListener("click", () => {
            console.log("about me clicked")
            this.removeIcons();
            this.createAboutMe();
            this.viewingDesktop = false;
            this.lastOpened = "aboutme";
        });

        this.iconContainerObject = new CSS2DObject(this.projectIconClone);
        this.scene.add(this.iconContainerObject);
        this.iconContainerObject.position.set(0, 0.55, -0.5);

        this.iconContainerObject2 = new CSS2DObject(this.abtmIconClone);
        this.scene.add(this.iconContainerObject2);
        this.iconContainerObject2.position.set(0.4, 0.3, 0.1);


    }

    loginElements(){
        this.createName();
        this.createPasswordEnter();
        this.createPicture();
    }

    createMacOS(){
        this.macOS = document.querySelector(".title-container");
        this.macOSClone = this.macOS.cloneNode(true);
        this.macOSObject = new CSS2DObject(this.macOSClone);
        this.scene.add(this.macOSObject);
        this.macOSObject.position.set(0, 0.95, -0.5);
    }

    createPasswordEnter() {
        const password="Berkeley"
        this.passWordContainer = document.createElement('div');
        this.passWordContainer.className = 'CSS2DLabel-PasswordEnter';
        this.passWordContainer.contentEditable = 'true';
        this.passWordContainer.textContent = 'Enter Password';
        this.passWordContainerObject = new CSS2DObject(this.passWordContainer);
        this.scene.add(this.passWordContainerObject);
        this.passWordContainerObject.position.set(0, 0, -0.5);

        //on click
this.passWordContainer.addEventListener("click", (event) => {
    event.target.innerText = "";
});

        this.passWordContainer.addEventListener("input", (event) => {
            console.log(event.target.innerText); // log the text content of the div whenever it changes
            if (event.target.innerText === password) {
                this.accessed = true;
                this.scene.remove(this.passWordContainerObject);
                this.scene.remove(this.nameContainerObject);
                this.scene.remove(this.pictureContainerObject);
                //0.155
                this.creator.world.controls.lerp.target += 0.01;
                this.creator.world.controls.lerpLimit = 0.86;
                this.removeDirections();
                this.creator.world.controls.createdDirections = false;
                this.createIcons();
                this.createMacOS();
            }
        });
    }

    createAboutMe(){
        this.containerBefore = document.querySelector(".aboutmeContainer");
        this.containerBeforeClone = this.containerBefore.cloneNode(true);
        this.aboutMeContainerObject = new CSS2DObject(this.containerBeforeClone);
        this.scene.add(this.aboutMeContainerObject);
        this.aboutMeContainerObject.position.set(0, 0, -0.5);

        //create an x button to close the about me
        this.closeButton = document.createElement('div');
        this.closeButton.className = 'x';
        this.closeButton.textContent = 'X';
        this.closeButtonObject = new CSS2DObject(this.closeButton);
        this.scene.add(this.closeButtonObject);
        this.closeButtonObject.position.set(0, 0.5, 0.1);

        this.closeButton.addEventListener("click", () => {
            this.scene.remove(this.aboutMeContainerObject);
            this.scene.remove(this.closeButtonObject);
            this.createIcons();
            this.viewingDesktop = true;
        });


    }


    createDirections() {
            this.directions = document.createElement('img');
            this.directions.src = '/Directions.svg';
            //make it smaller
            this.directions.style.width = '110px';
            this.directions.style.height = '100px';

            this.directionsObject = new CSS2DObject(this.directions);
            this.scene.add(this.directionsObject);
            this.directionsObject.position.set(0, 1, -0.5);
    }

    removeDirections(){
        this.scene.remove(this.directionsObject);
    }


    createPicture() {
        this.pictureContainer = document.createElement('div');
        this.pictureContainer.className = 'CSS2D-Picture';
        this.pictureContainerObject = new CSS2DObject(this.pictureContainer);
        this.scene.add(this.pictureContainerObject);
        this.pictureContainerObject.position.set(0, 0.25, -0.5);
    }

    createName(){
        this.nameContainer = document.createElement('div');
        this.nameContainer.className = 'name';
        this.nameContainer.textContent = 'Yanjie Zheng';
        this.nameContainerObject = new CSS2DObject(this.nameContainer);
        this.scene.add(this.nameContainerObject);
        this.nameContainerObject.position.set(-0.025, 0.1, -0.5);
    }

    update(){
        this.labelRenderer.render(this.scene, this.camera.orthographicCamera);

    }
    resize(){
        this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

