export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    //Load Images
    this.load.image("backgroundlvl1.png", "assets/images/backgroundlvl1.png");
    this.load.image("backgroundlvl2.png", "assets/images/backgroundlvl2.png");
    this.load.image("backgroundlvl3.png", "assets/images/backgroundlvl3.png");

    this.load.image("player", "assets/images/robotstanding.png");
    this.load.image("coin", "assets/images/coin.png");
    this.load.image("enemy", "assets/images/enemy.png");
    this.load.image("spike", "assets/images/spike.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("wall", "assets/images/wall.png");
    this.load.image("emptybox","assets/images/emptybox.png");
    
    //this.load.image("levelchanger1", "assets/images/levelchanger1.png");
    //this.load.image("levelchanger2", "assets/images/levelchanger2.png");
    
    this.load.image("box0", "assets/images/emptybox.png");
    this.load.image("box1", "assets/images/box1.png");
    this.load.image("box2", "assets/images/box2.png");
    this.load.image("box3", "assets/images/box3.png");
    this.load.image("box4", "assets/images/box4.png");
    this.load.image("box5", "assets/images/box5.png");
    this.load.image("box6", "assets/images/box6.png");

    this.load.image("door", "assets/images/door.png");

    this.load.image("slot0", "assets/images/emptyslot.png");
    this.load.image("slot1", "assets/images/slot1.png");
    this.load.image("slot2", "assets/images/slot2.png");
    this.load.image("slot3", "assets/images/slot3.png");
    this.load.image("slot4", "assets/images/slot4.png");
    this.load.image("slot5", "assets/images/slot5.png");
    this.load.image("slot6", "assets/images/slot6.png");

    this.load.image("machine1", "assets/images/machine_increase.png");
    this.load.image("machine2", "assets/images/machine_destroy.png");
    this.load.image("machine3", "assets/images/machine-1.png");
    this.load.image("machine4", "assets/images/machine+1.png");
    this.load.image("machine5", "assets/images/button.png");

    //Load SpriteSheets
    this.load.spritesheet("death", "assets/spritesheets/death.png",{
      frameWidth: 16,
      frameHeight: 16
    });





    this.load.audio("backgroundmusic", "assets/sounds/backgroundmusic.mp3");
    this.load.audio("coinpickup", "assets/sounds/coinpickup.mp3");
    this.load.audio("deathsound", "assets/sounds/deathsound.mp3");
    this.load.audio("boxcorrectspot", "assets/sounds/boxcorrectspot.mp3");
    this.load.audio("boop", "assets/sounds/boop.wav");
    this.load.audio("deny", "assets/sounds/deny.wav");
    this.load.audio("pickup", "assets/sounds/pickup.wav");
    this.load.audio("drop", "assets/sounds/drop.mp3");
  }

  create() {

    //Create Animations
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


    this.scene.start('Level1');
  }
}
