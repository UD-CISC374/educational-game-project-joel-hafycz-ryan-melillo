import baseScene from "./baseScene";
import Box from "../objects/box";
import Player from "../objects/player";

export default class Level2 extends baseScene {

    
    constructor(key) {
        super('Level2');
    }

    create() {
      this.createCommon();

      //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

      //Sprites / Images
      this.player = new Player(this, 35, 550);
    this.player.setCollideWorldBounds(true);

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    this.physics.add.collider(this.platforms,this.boxes);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes,this.player);
    this.physics.add.collider(this.boxes, this.walls);
    this.physics.add.collider(this.platforms,this.player);
    this.physics.add.collider(this.walls, this.player);
    
    //this.physics.add.collider(this.walls, this.player);

    this.physics.add.collider(this.boxes, this.machines, this.addOne);
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer); 

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump    

    this.createLongPlatforms(0, 600, 32);
    this.createLongPlatforms(0, 100, 5);
    this.add.text(20,80, "Moves left and right + 3 boxes on top", {
        font: "10px Arial",
        fill: "white"
    });
    this.createWalls(480,0,9);
    this.createSpike(460,30);
    this.createSpike(460,60);
    this.createSpike(460,90);
    this.createSpike(460,120);
    this.createSpike(460,150);

    this.createCoin(450,190);

    this.createMachine(530, 200, "machine_increase");

    this.createLongPlatforms(492,240,8);
    this.createEnemy(650, 200);

    this.createLongPlatforms(800, 300, 2);
    this.add.text(790,280, "Moves up and down", {
        font: "10px Arial",
        fill: "white"
    });
    
    this.createLongPlatforms(170, 200, 2);
    this.add.text(150,180, "Moves up and down", {
        font: "10px Arial",
        fill: "white"
    });

    this.createLongPlatforms(830, 500, 5);
    this.add.text(800,550, "3 doors here [2,3,4] (800, 550)", {
        font: "10px Arial",
        fill: "white"
    });

    this.createEnemy(700, 550);
    this.createLongSpike(830, 520, 4);

    this.createBox(this,20, 20, 1);
    this.createBox(this,500, 20, 2);
}
}
