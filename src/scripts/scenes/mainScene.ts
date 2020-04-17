
export default class MainScene extends Phaser.Scene {
  //Backgrounds
  private background: Phaser.GameObjects.TileSprite;

  //Individual Objects (you can def change these, theyre awful)
  private player: Phaser.Physics.Arcade.Sprite;
  
  private box: Phaser.Physics.Arcade.Sprite;
  private enemy: Phaser.Physics.Arcade.Sprite;
  private spike: Phaser.Physics.Arcade.Sprite;
  private door: Phaser.Physics.Arcade.Sprite;

  //Groups
  private pickups: Phaser.Physics.Arcade.Group;
  private enemies: Phaser.Physics.Arcade.Group;
  private spikes: Phaser.Physics.Arcade.Group;
  private boxes: Phaser.Physics.Arcade.Group;
  private platforms: Phaser.Physics.Arcade.Group;
  private coins: Phaser.Physics.Arcade.Group;
  private doors: Phaser.Physics.Arcade.Group;

  //Other
  private canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {

    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

    //Sprites / Images
    this.player = this.physics.add.sprite(80,20,"player");
    this.player.setCollideWorldBounds(true);

    /*this.spike = this.physics.add.sprite(200,200,"spike");
    this.enemy = this.physics.add.sprite(300,300,"enemy");*/

    //Movable objects
    


    //Spikes
    this.spikes = this.physics.add.group({
      immovable:true,
      allowGravity:false
    });

    //Enemies
    this.enemies = this.physics.add.group({
      immovable:true,
      allowGravity:true
    });

    //Pickups
    this.coins = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    //Platforms
    this.platforms=this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    //Boxes
    this.boxes = this.physics.add.group({
      immovable: false,
      allowGravity: true
    });

    //Doors
    this.doors = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    

    //Build Level
    this.createVerticalPlatforms(240,17,15);
    this.createHorizontalPlatforms(60,167,12);
  
    this.createHorizontalPlatforms(0,300,6);
    this.createSpike(90,270);
    this.add.text(90,205, "Avoid Spikes", {
      font: "10px Arial",
      fill: "white"
    });

    this.createHorizontalPlatforms(60, 437, 7);
    this.createEnemy(120,407);
    this.add.text(90,340, "And Enemies", {
      font: "10px Arial",
      fill: "white"
    });

    this.createHorizontalPlatforms(0, 560, 26);
    this.createCoin(120,515);
    this.add.text(90,475, "Collect Coins", {
      font: "10px Arial",
      fill: "white"
    });

    this.createHorizontalPlatforms(0, 590, 31);

    this.createHorizontalPlatforms(770, 467, 5);
    this.createPlatform(890, 560);
    this.createLongSpike(790,497,3);
    this.add.text(830, 460, "To Next Function", {
      font: "10px Arial",
      fill: "white"
    });

    this.add.text(720, 550, "Memory", {
      font: "10px Arial",
      fill: "white"
    });

    this.add.text(780, 580, "1", {
      font: "10px Arial",
      fill: "white"
    });
    this.add.text(815, 580, "2", {
      font: "10px Arial",
      fill: "white"
    });
    this.add.text(850, 580, "3", {
      font: "10px Arial",
      fill: "white"
    });

    this.createBox(340, 70, "box1");
    this.createBox(380, 70, "box2");
    this.createBox(300, 70, "box3");

    this.createDoor(790,527,"door1");
    this.createDoor(820,527,"door2");
    this.createDoor(850,527,"door3");

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    this.physics.add.collider(this.platforms,this.boxes);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes,this.player);
    this.physics.add.collider(this.platforms,this.player);
    this.physics.add.collider(this.boxes,this.doors,
      function(box,door){
        door.destroy();
        box.destroy();
      })

    /*this.physics.add.collider(this.coins, this.player,         //Crashes when you touch the coin
      function(coin, player){
        coin.destroy();
      })/*
    
    /*this.physics.add.collider(this.enemies, this.player,        //Crashes when you touch an enemy
      function(enemy, player){
        player.destroy();
      });*/


    //Add to group
    /*this.enemies.add(this.enemy);
    this.enemies.add(this.spike);*/

    //Other
    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;

    this.canJump = 0;//allow player to jump



  }

  update() {
    this.movePlayerManager();



    if(this.player.body.blocked.down){
      this.canJump = 0;
      //console.log("jump at 0");
    }

    //Functions
  }

  //Helper Functions (movement, collecting, you name it)


   //currently unused, supposed to be for double jumping on key activation
  handleJump(){
    if(this.canJump<2){
      this.player.setVelocityY(-320);
      this.canJump+=1;
    }
  }

  createPlatform(xpos, ypos){
    var platform = this.add.sprite(xpos, ypos, "platform");
    this.platforms.add(platform);
  }

  createHorizontalPlatforms(x,y,length){
    for (let i = 0; i < length; i++){
      var platform = this.add.sprite(x,y, "platform");
      this.platforms.add(platform);
      x += 30;
    }
  }

  createVerticalPlatforms(x,y,length){
    for (let i = 0; i < length; i++){
      var platform = this.add.sprite(x,y, "platform");
      this.platforms.add(platform);
      y += 30;
    }
  }

  createLongSpike(x,y,length){
    for (let i = 0; i < length; i++){
      var spike = this.add.sprite(x,y, "spike");
      this.spikes.add(spike);
      x += 30;
    }
  }

  createCoin(x,y){
    var coin = this.add.sprite(x,y, "coin");
    this.coins.add(coin);
  }

  createSpike(x,y){
    var spike = this.add.sprite(x,y, "spike");
    this.coins.add(spike);
  }

  createEnemy(x,y){
    var enemy = this.add.sprite(x,y, "enemy");
    this.coins.add(enemy);
  }

  createBox(x,y, num){
    var box = this.add.sprite(x,y, num);
    this.boxes.add(box);
  }

  createDoor(x,y, num){
    var door = this.add.sprite(x,y,num);
    this.doors.add(door);
  }

  movePlayerManager(){
    this.player.setVelocityX(0);

    if(this.cursorKeys.left?.isDown){
      this.player.setVelocityX(-170);
      this.player.flipX= false;
    }
    else if(this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(170);
      this.player.flipX = true;
    }

    //else{
     // this.player.setDragX(200);//cool sliding stuff
    //}

    if((this.cursorKeys.up?.isDown ||  this.cursorKeys.space?.isDown) && this.canJump<1000) {
      this.player.setVelocityY(-320);
      this.canJump+=1;
      console.log(this.canJump);
    }
  }
}
