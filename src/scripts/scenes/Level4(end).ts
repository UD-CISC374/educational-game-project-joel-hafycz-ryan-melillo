import baseScene from "./baseScene";
import Player from "../objects/player";


export default class Level4 extends baseScene{

    constructor() {
        super({ key: 'Level4' });
    }

    create() {
        this.createCommon();


        this.door = this.physics.add.staticImage(920,550,"door");
    }
}