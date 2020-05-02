import baseScene from "./baseScene";

export default class Level2 extends baseScene {
    //Backgrounds

    constructor(key) {
        super('Level2');
    }

    create() {
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      //Background Scenes
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
    this.background.setOrigin(0, 0);

      //Sprites / Images
    this.player = this.physics.add.sprite(35,550,"player");
    this.player.state = "nobox"
    this.player.setCollideWorldBounds(true);

    /*this.spike = this.physics.add.sprite(200,200,"spike");
    this.enemy = this.physics.add.sprite(300,300,"enemy");*/

      //Movable objects

      //Spikes
    this.spikes = this.physics.add.group({
        immovable:true,
        allowGravity:false
    });

      //Enemies
    this.enemies = this.physics.add.group({
        immovable:true,
        allowGravity:false
    });

    this.coins = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });

      //Platforms
    this.platforms=this.physics.add.group({
        immovable: true,
        allowGravity: false
    });

      //Boxes
    this.boxes = this.physics.add.group({
        immovable: false,
        allowGravity: true,
        collideWorldBounds: true,
        dragX: 150,
        bounceX: 1
    });

      //this.boxes.class= Box;

      //Doors
    this.doors = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });

    this.walls = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });

    this.machines = this.physics.add.group({
        immovable:true,
        allowGravity:false
    });

    
    //Keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    //Set interactive
    this.physics.add.collider(this.platforms,this.boxes);
    this.physics.add.collider(this.boxes,this.boxes);
    this.physics.add.collider(this.boxes,this.player);
    this.physics.add.collider(this.boxes, this.walls);
    this.physics.add.collider(this.platforms,this.player);
    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.boxes,this.doors,
    function(box,door){
        door.destroy();
        box.destroy();
    });

    //this.physics.add.collider(this.walls, this.player);

    this.physics.add.overlap(this.boxes,this.doors, this.doorBox);
    this.physics.add.collider(this.boxes, this.machines, this.addOne);
    this.physics.add.overlap(this.player, this.coins, this.pickupCoin);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);
    this.physics.add.overlap(this.player, this.spikes, this.hurtPlayer); 

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump    

    this.createLongPlatforms(0, 600, 32);
    this.createLongPlatforms(0, 100, 5);
    this.add.text(20,80, "Moves left and right + 3 boxes on top", {
        font: "10px Arial",
        fill: "white"
    });
    this.createWalls(480,0,9);
    this.createSpike(460,30);
    this.createSpike(460,60);
    this.createSpike(460,90);
    this.createSpike(460,120);
    this.createSpike(460,150);

    this.createCoin(450,190);

    this.createMachine(530, 200, "machine_increase");

    this.createLongPlatforms(492,240,8);
    this.createEnemy(650, 200);

    this.createLongPlatforms(800, 300, 2);
    this.add.text(790,280, "Moves up and down", {
        font: "10px Arial",
        fill: "white"
    });
    
    this.createLongPlatforms(170, 200, 2);
    this.add.text(150,180, "Moves up and down", {
        font: "10px Arial",
        fill: "white"
    });

    this.createLongPlatforms(830, 500, 5);
    this.add.text(800,550, "3 doors here [2,3,4] (800, 550)", {
        font: "10px Arial",
        fill: "white"
    });

    this.createEnemy(700, 550);
    this.createLongSpike(830, 520, 4);
}
}
