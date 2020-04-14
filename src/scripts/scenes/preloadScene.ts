export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    //Load Images
    this.load.image("backgroundlvl1", "assets/images/backgroundlvl1.png");
  
    //Load Sprites
    

    //Load SpriteSheets
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 16
    });

  }

  create() {

    //Create Animations



    //Other Stuff







    this.scene.start('MainScene');
  }
}
