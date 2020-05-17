import baseScene from "./baseScene";
import Box from "../objects/box";
import Player from "../objects/player";

export default class Level3 extends baseScene {

    
    constructor() {
        super({ key: 'Level3' });
    }

    create() {
        this.createCommon();
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
        this.background.setOrigin(0, 0);

        this.player = new Player(this, 35, 550);
        this.player.setCollideWorldBounds(true);

        /*this.createSlot(490, 575, 1);
        this.createSlot(520, 575, 2);
        this.createSlot(550, 575, 3);

        this.createBox(this,300, 70,3);
        this.createBox(this,850,270,2);
        this.createBox(this,300,470,1);*/

        this.createLongPlatforms(0,8,20);
        this.createWalls(5,0,24);
        this.createWalls(935,0,24);

        this.createLongPlatforms(-10, 600, 10);
        this.createLongPlatforms(598,600,10);

        this.createLongPlatforms(0,693,20);

        this.physics.add.collider(this.boxes, this.platforms);
        this.physics.add.collider(this.boxes,this.boxes);
        this.physics.add.collider(this.boxes, this.walls);
        this.physics.add.collider(this.player, this.slots);
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));
        this.physics.add.collider(this.platforms,this.player);
        this.physics.add.collider(this.walls, this.player);
        this.physics.add.collider(this.player, this.machines);
        this.physics.add.collider(this.machines, this.boxes, this.handleMachine.bind(this));
        this.physics.add.collider(this.player, this.levelchangers, this.handleLevelchange.bind(this));

        this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
        this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
        this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 
    }
}