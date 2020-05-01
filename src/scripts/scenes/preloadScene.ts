export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    //Load Images
    this.load.image("backgroundlvl1.png", "assets/images/backgroundlvl1.png");
    this.load.image("player", "assets/images/player.png");
    this.load.image("coin", "assets/images/coin.png");
    this.load.image("enemy", "assets/images/enemy.png");
    this.load.image("spike", "assets/images/spike.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("wall", "assets/images/wall.png");
    this.load.image("emptybox","assets/images/emptybox.png");
    this.load.image("box0", "assets/images/box0.png");
    this.load.image("box1", "assets/images/box1.png");
    this.load.image("box2", "assets/images/box2.png");
    this.load.image("box3", "assets/images/box3.png");
    this.load.image("door1", "assets/images/door.png");
    this.load.image("door2", "assets/images/door.png");
    this.load.image("door3", "assets/images/door.png");
    this.load.image("machine_increase", "assets/images/machine_increase.png");

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


    this.scene.start('Level2');
  }
}
