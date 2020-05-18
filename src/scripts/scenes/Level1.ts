import Level2 from "./Level2";
import baseScene from "./baseScene";
import Box from "../objects/box";
import Player from "../objects/player";

export default class Level1 extends baseScene{


  constructor() {
    super({ key: 'Level1' });
  }


  create() {
    this.createCommon();

    this.music = this.sound.add("backgroundmusic");
    var musicConfig = {
    mute: false,
    volume: .5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
    }

    this.music.play(musicConfig);
    
    
  
    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);
    
    //moved it here so slots go over top
    this.add.text(355, 602, "Array = [ 1, 2, 3 ]", {
      font: "30px Arial",
      fill: "white"
    });
    
    //Sprites / Images
    this.player = new Player(this, 190,20);
    this.player.setCollideWorldBounds(true);

    this.createSlot(125, 477, 0);
    this.createSlot(490, 575, 1);
    this.createSlot(520, 575, 2);
    this.createSlot(550, 575, 3);

    this.createBox(this,180,470,0);
    //this.createBox(this,750, 550, 0);
    this.createBox(this,300, 70,3);
    this.createBox(this,850,270,2);
    this.createBox(this,300,470,1);

    this.createLevelChanger1(this,950,575,1);
  
    this.door = this.physics.add.staticImage(920,550,"door");
    
    //Movable objects

    //Build Level
    this.createLongPlatforms(0,8,20);
    this.createWalls(6,14,25);
    this.createWalls(240,14,16);
    this.createLongPlatforms(0,693,20);
    this.createLongPlatforms(130,100,6);
    this.createLongPlatforms(780,100,4);
    this.createWalls(936,14,16);
    this.createCoin(850,60);
    this.createWalls(936,610,4);

    this.createLongPlatforms(0,200,4);
    this.createSpike(160,180);
    this.add.text(90,130, "Avoid Spikes", {
      font: "10px Arial",
      fill: "white"
    });
  

    this.createLongPlatforms(525,200,3);
    this.createEnemy(580,170);

    this.createLongPlatforms(130, 300, 6);
    this.createEnemy(120,270);
    this.add.text(90,220, "And Workers", {
      font: "10px Arial",
      fill: "white"
    });
    this.createLongSpike(380,280,2);

    
    this.createLongPlatforms(780,300,4);

    this.createLongPlatforms(0,400,4);
    this.createCoin(120,360);
    this.add.text(90,330, "Collect Coins", {
      font: "10px Arial",
      fill: "white"
    });

    this.createLongPlatforms(525,400,3);
    this.createLongSpike(585,380,1);

    this.createLongPlatforms(130, 500, 6);
    this.add.text(20,420, "Press SPACEBAR to pickup or drop boxes,\n and put them in the correct spots", {
      font: "10px Arial",
      fill: "white"
    });

    this.createEnemy(340,400);

    this.createLongPlatforms(780, 500, 8);

    this.createLongPlatforms(-10, 600, 10);
    this.add.text(20,545, "You are a robot completing the functions at the bottom, \ncomplete them to progress to the next level", {
      font: "10px Arial",
      fill: "white"
    });

    this.add.text(20, 620, "def create_array():\n    Array = [1,2,3]", {
      font: "20px Arial",
      fill: "white"
    });

    this.createLongPlatforms(598,600,10);

    this.createLongSpike(770,480,4);
    this.createCoin(890,450);
    this.add.text(770, 490, "To Next Function", {
      font: "20px Arial",
      fill: "white"
    });

    this.add.text(600, 630, "This function creates an array in the order [1,2,3]", {
      font: "15px Arial",
      fill: "white"
    });

    //this.createLongPlatforms(880,600,2);

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
  
    this.physics.add.collider(this.boxes, this.platforms);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes, this.walls);
    this.physics.add.collider(this.player, this.slots);
    //this.physics.add.collider(this.player, this.door);
    this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));
    this.physics.add.collider(this.platforms,this.player);
    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.levelchangers1, this.player, this.handleLevelchange1.bind(this));
    
    this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump


  }
}