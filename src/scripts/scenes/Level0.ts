import baseScene from "./baseScene";
import Player from "../objects/player";


export default class Level0 extends baseScene{

    constructor() {
        super({ key: 'Level0' });
    }

    create() {
        this.createCommon();


        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
        this.background.setOrigin(0, 0);

        this.player = new Player(this, 190,20);
        this.player.setCollideWorldBounds(true);


        this.door = this.physics.add.staticImage(920,550,"door");
    }
}