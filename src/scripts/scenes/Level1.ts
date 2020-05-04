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
  
    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

    //Sprites / Images
    this.player = new Player(this, 190,20);
    this.player.setCollideWorldBounds(true);

    this.createDoor(90, 470, 0);
    this.createDoor(790, 575, 1);
    this.createDoor(820, 575, 2);
    this.createDoor(850, 575, 3);

    this.createBox(this,180,470,0);
    this.createBox(this,300, 70,3);
    this.createBox(this,850,270,2);
    this.createBox(this,300,470,1);
    


    /*
    this.box0 = this.physics.add.sprite(180,470,"box0");
    this.box1 = this.physics.add.sprite(300, 70,"box1");
    this.box2 = this.physics.add.sprite(850,270,"box2");
    this.box3 = this.physics.add.sprite(300,470,"box3");

    this.box1complete;
    this.box2complete;
    this.box3complete;
    
    this.door0 = this.physics.add.staticImage(90,470,"door0");
    this.door1 = this.physics.add.staticImage(790,575,"door1");
    this.door2 = this.physics.add.staticImage(820,575,"door2");
    this.door3 = this.physics.add.staticImage(850,575,"door3");

      this.physics.add.collider(this.box0,this.door0,
      function(box,door){
          door.destroy();
          box.destroy();
      });
    this.physics.add.collider(this.box1,this.door1,
      function(box,door){
          (door.body as Phaser.Physics.Arcade.StaticBody).reset(790, 609);
          box.destroy();
      });
    this.physics.add.collider(this.box2,this.door2,
      function(box,door){
          (door.body as Phaser.Physics.Arcade.StaticBody).reset(820, 609);
          box.destroy();
      });
    this.physics.add.collider(this.box3,this.door3,
      function(box,door){
          (door.body as Phaser.Physics.Arcade.StaticBody).reset(850, 609);
          box.destroy();
      });

this.physics.add.collider(this.platforms,this.box0);
    this.physics.add.collider(this.platforms,this.box1);
    this.physics.add.collider(this.platforms,this.box2);
    this.physics.add.collider(this.platforms,this.box3);

    this.physics.add.collider(this.walls,this.box0);
    this.physics.add.collider(this.walls,this.box1);
    this.physics.add.collider(this.walls,this.box2);
    this.physics.add.collider(this.walls,this.box3);

    this.physics.add.collider(this.player,this.box0);
    this.physics.add.collider(this.player,this.box1);
    this.physics.add.collider(this.player,this.box2);
    this.physics.add.collider(this.player,this.box3);

    this.physics.add.collider(this.platforms,this.door0);
    this.physics.add.collider(this.platforms,this.door0);
    this.physics.add.collider(this.platforms,this.door0);
    this.physics.add.collider(this.platforms,this.door0);

    this.physics.add.collider(this.player,this.door0);
    this.physics.add.collider(this.player,this.door1);
    this.physics.add.collider(this.player,this.door2);
    this.physics.add.collider(this.player,this.door3);

    this.physics.add.collider(this.box3,this.door1);
    this.physics.add.collider(this.box3,this.door2);
    this.physics.add.collider(this.box2,this.door1);


**/
    this.nextlevel = this.physics.add.staticImage(900, 575, "nextlevel");
    
    //Movable objects

    //Build Level
    this.createLongPlatforms(0,8,20);
    this.createWalls(6,14,25);
    this.createWalls(240,14,18);
    this.createLongPlatforms(0,693,20);
    this.createLongPlatforms(130,100,6);
    this.createLongPlatforms(780,100,4);
    this.createWalls(936,0,26);
    this.createCoin(850,60);

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
    this.add.text(40,420, "Push boxes into doors to open them", {
      font: "10px Arial",
      fill: "white"
    });

    this.createEnemy(340,400);

    this.createLongPlatforms(780, 500, 8);

    this.createLongPlatforms(0, 600, 16);
    this.add.text(40,545, "Complete the program at the bottom to reach the next level", {
      font: "10px Arial",
      fill: "white"
    });

    this.add.text(380, 630, "Array = [1,2,3]", {
      font: "30px Arial",
      fill: "white"
    });

    this.createLongSpike(770,480,4);
    this.createCoin(890,450);
    this.createLongSpike(780,530,3);
    this.add.text(820, 493, "To Next Function", {
      font: "10px Arial",
      fill: "white"
    });

    this.createLongPlatforms(890,600,2);


    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    
    //attempt at changing the level
    /*this.physics.add.collider(this.player, this.nextlevel,
      function(){
        level1complete = true;
      });
      */
    
  
     this.physics.add.collider(this.boxes, this.platforms);
     this.physics.add.collider(this.boxes,this.boxes);
     //this.physics.add.collider(this.boxes,this.player);
     this.physics.add.overlap(this.boxes, this.player, this.handlePickup);
     this.physics.add.collider(this.boxes, this.walls);
 
     this.physics.add.collider(this.boxes, this.doors, this.handleDoor);

    this.physics.add.collider(this.platforms,this.player);
    //this.physics.add.collider(this.walls, this.player);

    this.physics.add.overlap(this.player, this.coins, this.pickupCoin);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer); 

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump
  }
}