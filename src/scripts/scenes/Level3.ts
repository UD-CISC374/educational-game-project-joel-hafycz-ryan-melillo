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

        this.createSlot(490, 575, 4);
        this.createSlot(520, 575, 5);
        this.createSlot(550, 575, 6);

        this.door = this.physics.add.staticImage(850,550,"door");

        /*
        this.createBox(this,300, 70,3);
        this.createBox(this,850,270,2);*/
        this.createBox(this,300,470,1);

        this.createLongPlatforms(0,8,20);
        this.createWalls(5,0,24);
        this.createWalls(935,-15,17);

        this.createLongPlatforms(850,200,3);
        this.createMachine(this,897,165,2);

        this.createLongPlatforms(30,200,2);
        this.createMachine(this,55,185,5);

        this.createLongPlatforms(390,200,7);
        this.createMachine(this,425,185,3);
        this.createMachine(this,652,185,4);




        this.createLongPlatforms(750, 500, 6);

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
        //this.physics.add.collider(this.player, this.levelchangers, this.handleLevelchange.bind(this));
        //this.physics.add.collider(this.player,this.machines, this.handleButton.bind(this));

        this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
        this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
        this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 
    }
}