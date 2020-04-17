
export default class MainScene extends Phaser.Scene {
  //Backgrounds
  private background: Phaser.GameObjects.TileSprite;

  //Individual Objects (you can def change these, theyre awful)
  private player: Phaser.Physics.Arcade.Sprite;
  private coin: Phaser.Physics.Arcade.Sprite;
  private box: Phaser.Physics.Arcade.Sprite;
  private enemy: Phaser.Physics.Arcade.Sprite;
  private spike: Phaser.Physics.Arcade.Sprite;

  //Groups
  private pickups: Phaser.Physics.Arcade.Group;
  private enemies: Phaser.Physics.Arcade.Group;

  //plaftorms
  private platforms: Phaser.Physics.Arcade.Group;


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

  

    //Pickups
    this.coin = this.physics.add.sprite(35,250,"coin");

    //Platforms
    this.platforms=this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.createPlatform(240, 17);
    this.createPlatform(240, 47);
    this.createPlatform(240, 77);
    this.createPlatform(240, 107);
    this.createPlatform(240, 137);
    this.createPlatform(240, 167);
    this.createPlatform(240, 197);
    this.createPlatform(210, 197);
    this.createPlatform(180, 197);
    this.createPlatform(150, 197);
    this.createPlatform(120, 197);
    this.createPlatform(90, 197);
    this.createPlatform(60, 197);

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive

    this.physics.add.collider(this.platforms,this.player);

    this.physics.add.collider(this.coin, this.player,
      function(coin, player){
        coin.destroy();
      })
    
    /*this.physics.add.collider(this.enemies, this.player,
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
    this.coin.setVelocityY(-10);
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
      var platform = this.add.sprite(xpos, ypos, "player");
      this.platforms.add(platform);
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

    if((this.cursorKeys.up?.isDown ||  this.cursorKeys.space?.isDown) && this.canJump<100) {
      this.player.setVelocityY(-320);
      this.canJump+=1;
      console.log(this.canJump);
    }
  }
}
