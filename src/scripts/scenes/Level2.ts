import baseScene from "./baseScene";
import Player from "../objects/player";

export default class Level2 extends baseScene {

    
    constructor() {
        super({ key: 'Level2' });
    }

    create() {
    this.createCommon();

      //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

      //Sprites / Images
    this.player = new Player(this, 35, 30);
    this.player.setCollideWorldBounds(true);

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump   
    
    this.door = this.physics.add.staticImage(850,550,"door");
    this.createLevelChanger0(this, 850, 550, 0);
    
    this.createWalls(4,0,25);
    this.createWalls(935,0,16);
    this.createWalls(935,490,1);
    this.createLongPlatforms(0,694,20);
    this.createWalls(935,608,4);
    this.createLongPlatforms(0,8,20);
    this.createLongPlatforms(0, 600, 9);
    this.createLongPlatforms(541, 600, 9);

    this.createLevelChanger2(this,900,575,2);

    this.createSlot(440,575,4);
    this.createSlot(470,575,5);
    this.createSlot(500,575,6);
    this.createLongPlatforms(0, 100, 3);
    this.add.text(35, 230, "Boxes from last level", {
        font: "10px Arial",
        fill: "white"
    });
    this.createLongPlatforms(0,300,3);
    this.createEnemy(400,270);
    this.createLevelChanger0(this, 296, 270, 0);
    this.createLevelChanger0(this, 436, 270, 0);

    this.createCoin(900, 450);

    this.createLongPlatforms(0,500,3);
    this.createLongPlatforms(200, 400, 2);
    this.createLongPlatforms(340, 300, 2);
    this.createLongSpike(220,383,2);
    this.createCoin(30,170);

    this.createEnemy(40,470);
    this.createLevelChanger0(this, 142, 470, 0);
    this.createEnemy(300,550);
  
    
    this.createWalls(473,0,8);
    this.createSpike(460,30);
    this.createSpike(460,60);
    this.createSpike(460,90);
    this.createSpike(460,120);
    this.createSpike(460,150);

    this.createCoin(460,200);


    this.createLongPlatforms(492,240,7);
    this.createPlatform(910,320);
    this.createEnemy(650, 200);
    this.createLevelChanger0(this, 836, 210, 0);
        
    this.createLongPlatforms(840, 400, 3);
    this.createCoin(625,300);
    this.createLongPlatforms(200, 200, 2);

    this.createLongPlatforms(750, 500, 6);

    this.createLongPlatforms(600,400,2);
    this.createEnemy(550, 550);

    this.createBox(this,20, 200, 1);
    this.createBox(this,60, 200, 2);
    this.createBox(this,100, 200, 3);
    this.createMachine(this,530, 200, 1);

    this.add.text(310, 600, "Array = [           ]", {
      font: "30px Arial",
      fill: "white"
  });

    this.add.text(20, 610, "def add_three(array):\n    for x in array:\n        x+3", {
      font: "20px Arial",
      fill: "white"
    });

    this.add.text(570, 630, "This function adds 3 to each element of the array", {
      font: "15px Arial",
      fill: "white"
    });


    //colliders
    this.physics.add.collider(this.boxes, this.platforms);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes, this.walls);

    //this.physics.add.collider(this.player, this.door);
    this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));

    this.physics.add.collider(this.player, this.slots, this.handleJump.bind(this));
    this.physics.add.collider(this.player, this.platforms, this.handleJump.bind(this));

    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.player, this.machines);
    this.physics.add.collider(this.machines, this.boxes, this.handleMachine.bind(this));
    this.physics.add.collider(this.levelchangers2, this.player, this.handleLevelchange2.bind(this));

    this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 
    }
}
