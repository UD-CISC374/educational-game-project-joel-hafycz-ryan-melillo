import baseScene from "./baseScene";
import Player from "../objects/player";

export default class Level3 extends baseScene {


    constructor() {
        super({ key: 'Level3' });
    }

    create() {
        this.createCommon();
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
        this.background.setOrigin(0, 0);

        this.player = new Player(this, 35, 130);
        this.player.setCollideWorldBounds(true);

        this.createSlot(490, 575, 2);
        this.createSlot(520, 575, 8);
        this.createSlot(550, 575, 5);

        this.door = this.physics.add.staticImage(850, 550, "door");


        this.createLongPlatforms(0, 8, 20);
        this.createWalls(5, 0, 24);
        this.createWalls(935, -15, 17);

        this.createLongPlatforms(210, 200, 2);
        this.createEnemy(240, 173);
        this.createLevelChanger0(this, 166, 173, 0);
        this.createLevelChanger0(this, 304, 173, 0);

        this.createLongPlatforms(850, 200, 3);
        this.createMachine(this, 897, 165, 2);

        this.createLongPlatforms(30, 200, 2);
        this.createMachine(this, 55, 185, 5);
        this.add.text(20, 100, "Press space on the platform", {
            font: "12px Arial",
            fill: "white"
        });

        this.createLongPlatforms(390, 200, 7);
        this.createMachine(this, 425, 185, 3);
        this.createMachine(this, 652, 185, 4);

        this.createLevelChanger3(this,900,550,3);
        this.createLongPlatforms(300, 300, 2);
        this.createLongPlatforms(0, 300, 4);
        this.createLongPlatforms(120, 400, 3);
        this.createCoin(140, 350);
        this.createSpike(160, 315);
        this.createLongPlatforms(600, 400, 2);
        this.createLongPlatforms(770, 300, 4);
        this.createCoin(900, 270);
        this.createEnemy(650, 350);
        this.createLevelChanger0(this, 550, 370, 0);
        this.createLevelChanger0(this, 700, 370, 0);

        this.createLongPlatforms(400, 500, 3);
        this.createLongPlatforms(220, 500, 2);
        this.createSpike(400, 480);
        this.createEnemy(270, 550);
        this.createLevelChanger0(this, 200, 550, 0);
        this.createLevelChanger0(this, 300, 550, 0);

        this.createLevelChanger3(this, 900, 550, 3);




        this.createLongPlatforms(750, 500, 6);

        this.createLongPlatforms(-10, 600, 10);
        this.createLongPlatforms(598, 600, 10);

        this.createLongPlatforms(0, 693, 20);

        this.physics.add.collider(this.boxes, this.platforms);
        this.physics.add.collider(this.boxes, this.boxes);
        this.physics.add.collider(this.boxes, this.walls);
        this.physics.add.collider(this.player, this.slots, this.handleJump.bind(this));
        this.physics.add.collider(this.player, this.platforms, this.handleJump.bind(this));
        this.physics.add.collider(this.player, this.door);
        this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));

        this.physics.add.collider(this.walls, this.player);
        this.physics.add.collider(this.machines, this.boxes, this.handleMachine.bind(this));
        this.physics.add.collider(this.player, this.levelchangers3, this.handleLevelchange3.bind(this));
        this.physics.add.collider(this.player, this.machines, this.handleButton.bind(this));

        this.physics.add.overlap(this.player, this.boxes, this.handlePickup.bind(this));
        this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
        this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this));
    }
}