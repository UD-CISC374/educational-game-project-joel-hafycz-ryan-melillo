
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
    this.player = this.physics.add.sprite(80,20,"player");
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

     //Build Level
     this.createWalls(240,14,18);
     this.createLongPlatforms(75,100,12);
     this.createLongPlatforms(780,100,8);
     this.createWalls(936,0,26);
     this.createCoin(850,60);
 
     this.createBox(300, 70, 1);
 
     this.createLongPlatforms(0,200,6);
     this.createSpike(90,190);
     this.add.text(90,130, "Avoid Spikes", {
       font: "10px Arial",
       fill: "white"
     });
 
     this.createLongPlatforms(525,200,5);
     this.createEnemy(580,170);
 
     this.createLongPlatforms(75, 300, 12);
     this.createEnemy(120,280);
     this.add.text(90,220, "And Enemies", {
       font: "10px Arial",
       fill: "white"
     });
     this.createLongSpike(380,280,2);
 
     this.createBox(850, 270, 2);
     this.createLongPlatforms(780,300,8);
 
     this.createLongPlatforms(0,400,6);
     this.createCoin(120,380);
     this.add.text(90,330, "Collect Coins", {
       font: "10px Arial",
       fill: "white"
     });
 
     this.createLongPlatforms(525,400,5);
     this.createLongSpike(585,380,1);
 
     this.createLongPlatforms(75, 500, 12);
     this.add.text(40,420, "Push boxes into doors to open them", {
       font: "10px Arial",
       fill: "white"
     });
     this.createBox(180, 470, "1");
     this.createDoor(90, 470, "1", 1);
     this.createBox(300, 470, 3);
     this.createEnemy(340,400);
 
     this.createLongPlatforms(780, 500, 8);
 
     this.createLongPlatforms(0, 600, 26);
     this.add.text(40,545, "Complete the program at the bottom to reach the next level", {
       font: "10px Arial",
       fill: "white"
     });
 
     this.createPlatform(756,600);
 
     this.add.text(380, 630, "Array = [1,2,3]", {
       font: "30px Arial",
       fill: "white"
     });
 
     this.createLongSpike(790,480,4);
     this.createCoin(870,450);
     this.createLongSpike(790,530,3);
     this.add.text(820, 493, "To Next Function", {
       font: "10px Arial",
       fill: "white"
     });
 
     this.createLongPlatforms(885,600,3);
 
     this.createDoor(790,575,"door1", 1);
     this.createDoor(820,575,"door2", 2);
     this.createDoor(850,575,"door3", 3);


    
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