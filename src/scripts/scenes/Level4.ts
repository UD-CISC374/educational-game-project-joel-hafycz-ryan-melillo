import baseScene from "./baseScene";
import Player from "../objects/player";

export default class Level4 extends baseScene{

  constructor() {
    super({ key: 'Level4' });
  }

  create() {
    this.createCommon();


    //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);
    
    //Sprites / Images
    this.player = new Player(this, 190,20);
    this.player.setCollideWorldBounds(true);

    
    this.physics.add.collider(this.boxes, this.platforms);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes, this.walls);
    this.physics.add.collider(this.player, this.slots);
    //this.physics.add.collider(this.player, this.door);
    this.physics.add.collider(this.boxes, this.slots, this.handleSlot.bind(this));
    this.physics.add.collider(this.platforms,this.player);
    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.levelchangers1, this.player, this.handleLevelchange1.bind(this));
    
    this.physics.add.overlap(this.player, this.boxes,  this.handlePickup.bind(this));
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin.bind(this));
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer.bind(this));
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer.bind(this)); 

    this.canJump = 0;//allow player to jump
  }
}