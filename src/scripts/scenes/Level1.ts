import baseScene from "./baseScene";
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
    this.player = new Player(this, 50,50);
    this.player.setCollideWorldBounds(true);

    this.createSlot(490, 575, 1);
    this.createSlot(520, 575, 2);
    this.createSlot(550, 575, 3);

    this.createSpike(700,580);

    this.createBox(this,100,250,3);
    this.createBox(this,600,165,2);
    this.createSpike(640,180);
    this.createBox(this,300,470,1);
    this.createLevelChanger0(this,225,165,0);
    this.createLevelChanger0(this,385,165,0);
    this.createEnemy(335,165);
    this.createLevelChanger0(this,200,465,0);
    this.createCoin(35,470);
    this.createEnemy(100,450);
    this.createEnemy(850,260);
    this.createLevelChanger0(this,725,260,0);

    this.createLevelChanger1(this,950,575,1);
  
    this.door = this.physics.add.staticImage(920,550,"door");
    
    //Movable objects

    //Build Level
    this.createLongPlatforms(0,8,20);
    this.createWalls(6,14,25);
    this.createLongPlatforms(0,693,20);
    this.createLongPlatforms(3,100,4);
    this.createLongPlatforms(780,100,4);
    this.createWalls(936,14,16);
    this.createCoin(900,260);
    this.createWalls(936,610,4);
    this.createSpike(280,380);  

    this.createLongPlatforms(580,200,2);
    this.createLongPlatforms(280,200,2);
    this.createLongPlatforms(780,300,4);

    this.createLongPlatforms(0,300,4);
    this.createLongPlatforms(435,300,2);
    this.createLongPlatforms(585,400,2);
    this.createLongPlatforms(280,400,2);
    this.createLongPlatforms(3,500,4);
    this.createLongPlatforms(435,500,2);
    this.createLongSpike(585,380,1);
    this.createLongPlatforms(780, 500, 8);

    this.createLongPlatforms(-10, 600, 10);
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

    //this.physics.add.collider(this.player, this.door);

    this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));

    this.physics.add.collider(this.player, this.slots, this.handleJump.bind(this));
    this.physics.add.collider(this.player, this.platforms, this.handleJump.bind(this));

    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.levelchangers1, this.player, this.handleLevelchange1.bind(this));
    
    this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 


    this.canJump = 0;//allow player to jump


  }
}