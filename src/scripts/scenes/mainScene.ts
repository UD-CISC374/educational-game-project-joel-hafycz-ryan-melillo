import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {

  //Backgrounds
  background: Phaser.GameObjects.TileSprite;

  //Individual Objects (you can def change these, theyre awful)
  private player_ONE_level_ONE: Phaser.GameObjects.Sprite;
  private player_TWO_level_ONE: Phaser.GameObjects.Sprite;
  private player_ONE_level_TWO: Phaser.GameObjects.Sprite;

  //Groups
  private players: Phaser.Physics.Arcade.Group;

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

    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    this.player_ONE_level_ONE.setInteractive();
    this.player_TWO_level_ONE.setInteractive();
    this.player_ONE_level_TWO.setInteractive();

    //Add to group
    this.players.add(this.player_ONE_level_ONE);
    this.players.add(this.player_TWO_level_ONE);
    this.players.add(this.player_ONE_level_TWO);
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
    //
  }
}
