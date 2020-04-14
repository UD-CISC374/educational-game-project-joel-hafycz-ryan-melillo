
export default class MainScene extends Phaser.Scene {

  //Backgrounds
  background: Phaser.GameObjects.TileSprite;

  //Individual Objects (you can def change these, theyre awful)
  private player: Phaser.GameObjects.Sprite;

  //Groups
  private pickups: Phaser.Physics.Arcade.Group;

  //Other
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {

    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0, 0);

    //Sprites / Images
    this.player = this.physics.add.sprite(0,0,"player");

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    this.player.setInteractive();


    //Add to group
  

  }

  update() {

    //Functions


  }

  //Helper Functions (movement, collecting, you name it)


  //When dead, resets player position to the beginning of the level
  resetPlayerPos(player) {
    player.x = 0;
    player.y = 0;
  }

  movePlayer(player){
  }
}
