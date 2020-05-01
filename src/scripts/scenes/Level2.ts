
export default class Level2 extends Phaser.Scene {
    //Backgrounds
    private background: Phaser.GameObjects.TileSprite;

    //Indiviual objects
    private player: Phaser.Physics.Arcade.Sprite;

    private drag = 250;
    
    private box: Phaser.Physics.Arcade.Sprite;
    private enemy: Phaser.Physics.Arcade.Sprite;
    private spike: Phaser.Physics.Arcade.Sprite;
    private door: Phaser.Physics.Arcade.Sprite;
    private wall: Phaser.Physics.Arcade.Sprite;
    private machine_increase: Phaser.Physics.Arcade.Sprite

    //Groups
    private pickups: Phaser.Physics.Arcade.Group;
    private enemies: Phaser.Physics.Arcade.Group;
    private spikes: Phaser.Physics.Arcade.Group;
    private boxes;
    private platforms: Phaser.Physics.Arcade.Group;
    private walls: Phaser.Physics.Arcade.Group;
    private coins: Phaser.Physics.Arcade.Group;
    private doors: Phaser.Physics.Arcade.Group;
    private machines: Phaser.Physics.Arcade.Group;

    //Other
    private canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private spacebar;

    constructor() {
        super({ key: 'Level2' });
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
}

update() {
    this.movePlayerManager();

    if(this.player.body.blocked.down){
    this.canJump = 0;
    }
    //Functions
}

  //Helper Functions (movement, collecting, you name it)

   //currently unused, supposed to be for double jumping on key activation
handlePickup(box, player){
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
    this.player.state = "yesbox" + box.z;
    }

}

handleJump(){
    if(this.canJump<2){
    this.player.setVelocityY(-320);
    this.canJump+=1;
    }
}

doorBox(door, box){
    if (door.z == box.z){
    door.destroy();
    box.destroy();
    }
}

hurtPlayer(player, enemy){
    player.x = 80;
    player.y = 20;
}

addOne(box, machine){
    if(box.z ==1){

    var temp = box.z +1;
    //var newbox = this.physics.add.sprite(820, 320, "box" +temp);
   //newbox.state = temp;
    //var newBox = new Box(this, 820, 320, temp);
    //box.destroy();
    box.state = 0;//cant change again
    box.setZ(temp);
    box.setTexture("box" + box.z);
    }

}

pickupCoin(player, coin){
    coin.disableBody(true, true);
}

createPlatform(xpos, ypos){
    var platform = this.physics.add.sprite(xpos, ypos, "platform");
    this.platforms.add(platform);
}

createLongPlatforms(x,y,length){
    for (let i = 0; i < length; i++){
    var platform = this.physics.add.sprite(x,y, "platform");
    this.platforms.add(platform);
    x += 30;
    }
}

createWalls(x,y,length){
    for (let i = 0; i < length; i++){
    var wall = this.physics.add.sprite(x,y, "wall");
    this.walls.add(wall);
    y += 28;
    }
}

createLongSpike(x,y,length){
    for (let i = 0; i < length; i++){
    var spike = this.physics.add.sprite(x,y, "spike");
    this.spikes.add(spike);
    x += 30;
    }
}

createCoin(x,y){
    var coin = this.physics.add.sprite(x,y, "coin");
    this.coins.add(coin);
}

createSpike(x,y){
    var spike = this.physics.add.sprite(x,y, "spike");
    this.spikes.add(spike);
}

createEnemy(x,y){
    var enemy = this.physics.add.sprite(x,y, "enemy");
    this.enemies.add(enemy);
    //enemy.setCollideWorldBounds(true);
    //enemy.setDragX(this.drag);
}

   //Unused now with custom class
createBox(x,y, num){
    var box = this.physics.add.sprite(x,y, 'box' +num);
    box.state = 1;
    box.setZ(num);
    this.boxes.add(box);
    box.setCollideWorldBounds(true);
    box.setDragX(this.drag);
    box.setBounceX(1);

}

createDoor(x,y, num, val){
    var door = this.physics.add.sprite(x,y,num);
    door.setZ(val);
    this.doors.add(door);
}

createMachine(x,y,type){
    var machine_increase = this.physics.add.sprite(x,y,type);
    this.machines.add(machine_increase);
}

movePlayerManager(){
    if(this.cursorKeys.left?.isDown){
        this.player.setVelocityX(-175);
        this.player.flipX= false;
    }

    else if(this.cursorKeys.right?.isDown) {
        this.player.setVelocityX(175);
        this.player.flipX = true;
    }

    else{
       //this.player.setVelocityX(0);
        this.player.setDragX(this.drag);//cool sliding stuff
    }

    if((this.cursorKeys.up?.isDown) && this.canJump<1000) {
        this.player.setVelocityY(-320);
        this.canJump+=1;
      //console.log(this.canJump);
        }
    }
}