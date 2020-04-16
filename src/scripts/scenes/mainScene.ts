
export default class MainScene extends Phaser.Scene {
  //Backgrounds
  private background: Phaser.GameObjects.TileSprite;

  //Individual Objects (you can def change these, theyre awful)
  private player: Phaser.Physics.Arcade.Sprite;
  private canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps

  //Groups
  private pickups: Phaser.Physics.Arcade.Group;

  //plaftorms
  private platforms: Phaser.Physics.Arcade.Group;

  //Other
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

    //Platforms
    this.platforms=this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.createPlatform(250, 320);
    


    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();


    //Set interactive
 
    this.physics.add.collider(this.platforms,this.player);



    //Add to group
    
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
      var platform = this.add.sprite(xpos, ypos, "player");
      this.platforms.add(platform);
  }

  //When dead, resets player position to the beginning of the level
  resetPlayerPos(player) {
    player.play("death");
    player.play("restart");
    player.x = 50;
    player.y = 50;
  }

  movePlayerManager(){
    if(this.cursorKeys.left?.isDown){
      this.player.setVelocityX(-170);
      this.player.flipX= false;
    }
    else if(this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(170);
      this.player.flipX = true;
    }

    else{
      this.player.setDragX(200);//cool sliding stuff
    }

     if((this.cursorKeys.up?.isDown || this.cursorKeys.space?.isDown) && this.canJump<7) {
      this.player.setVelocityY(-320);
      this.canJump+=1;
      console.log(this.canJump);
    }
    
  }
}
