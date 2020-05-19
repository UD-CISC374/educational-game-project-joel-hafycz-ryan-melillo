
import baseScene from "./baseScene";
import Player from "../objects/player";

export default class Level0 extends baseScene {

  constructor() {
    super({ key: 'Level0' });
  }

  create() {
    this.createCommon();

    this.music = this.sound.add("backgroundmusic");
    var musicConfig = {
      mute: false,
      volume: .5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.music.play(musicConfig);
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

    this.player = new Player(this, 35, 550);
    this.player.setCollideWorldBounds(true);

    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl0.png");
    this.background.setOrigin(0, 0);

    //Sprites / Images
    this.player = new Player(this, 50, 50);
    this.player.setCollideWorldBounds(true);

    this.createLongPlatforms(0, 8, 20);
    this.createWalls(5, 0, 24);
    this.createWalls(935, -15, 25);
    this.createLongPlatforms(30, 150, 16);
    this.add.text(170, 60, "Use the arrow keys to move arround", {
      font: "15px Arial",
      fill: "white"
    });
    this.add.text(550, 60, "Avoid Spikes and Workers", {
      font: "15px Arial",
      fill: "white"
    });
    this.createEnemy(565, 120);
    this.createLevelChanger3(this, 822, 120, 3);
    this.createSpike(725, 133);
    this.add.text(530, 200, "Press space to pick up/drop boxes", {
      font: "15px Arial",
      fill: "white"
    });
    this.createBox(this, 650, 250, 0);
    this.createSlot(302, 280, 0);
    this.add.text(200, 200, "Place the boxes in their slot", {
      font: "15px Arial",
      fill: "white"
    });
    this.createBox(this, 302, 400, 0);
    this.add.text(200, 350, "Place boxes on the Green pads to increase by 1 or the Red pads to decrease by 1", {
      font: "15px Arial",
      fill: "white"
    });
    this.createMachine(this, 400, 435, 4);
    this.createMachine(this, 600, 435, 3);
    this.add.text(450, 500, "Try to figure out what these machines do", {
      font: "15px Arial",
      fill: "white"
    });
    this.createMachine(this, 600, 565, 1);
    this.createBox(this, 700, 565, 0);
    this.createMachine(this, 350, 565, 2);
    this.createBox(this, 450, 565, 0);
    this.add.text(20, 500, "Follow the functions on the bottom to complete the levels", {
      font: "15px Arial",
      fill: "white"
    });
    this.createLongPlatforms(140, 300, 18);
    this.createLongPlatforms(30, 450, 16);
    this.createLongPlatforms(140, 600, 19);

    this.createLevelChanger0(this, 100, 550, 0);
    this.createLevelChanger0(this, 100, 500, 0);

    this.physics.add.collider(this.boxes, this.platforms);
    this.physics.add.collider(this.boxes, this.boxes);
    this.physics.add.collider(this.boxes, this.walls);

    //this.physics.add.collider(this.player, this.door);
    this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));

    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.levelchangers1, this.player, this.handleLevelchange1.bind(this));
    this.physics.add.collider(this.enemies, this.levelchangers3, this.bounceEnemy.bind(this));
    //resets jumps
    this.physics.add.collider(this.player, this.slots, this.handleJump.bind(this));
    this.physics.add.collider(this.player, this.platforms, this.handleJump.bind(this));
    this.physics.add.collider(this.player, this.machines, this.handleJump.bind(this));

    this.physics.add.overlap(this.player, this.boxes, this.handlePickup.bind(this));
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this));
    this.physics.add.collider(this.machines, this.boxes, this.handleMachine.bind(this));

    this.physics.add.collider(this.levelchangers0, this.player, this.handleLevelchange0.bind(this));


    this.canJump = 0;//allow player to jump
  }
}
