export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    //Load Images
    this.load.image("backgroundlvl1", "assets/images/backgroundlvl1.png");
    this.load.image("player", "assets/images/player.png");
    
    //Load SpriteSheets
    this.load.spritesheet("death", "assets/spritesheets/death.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("restart", "assets/spritesheets/death.png",{
      frameWidth: 16,
      frameHeight: 16
    });


  }

  create() {

    //Create Animations
    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNames("death",{
        start: 0,
        end: 4
      }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "restart",
      frames: this.anims.generateFrameNames("restart",{
        start: 0,
        end: 4
      }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });


    //Other Stuff


    this.scene.start('MainScene');
  }
}
