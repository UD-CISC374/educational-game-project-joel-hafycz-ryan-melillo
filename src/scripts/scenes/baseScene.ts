
export default class baseScene extends Phaser.Scene  {
    //Backgrounds
    public background: Phaser.GameObjects.TileSprite;

    //Indiviual objects
    public player: Phaser.Physics.Arcade.Sprite;

    public drag = 250;
    
    public box: Phaser.Physics.Arcade.Sprite;
    public enemy: Phaser.Physics.Arcade.Sprite;
    public spike: Phaser.Physics.Arcade.Sprite;
    public door: Phaser.Physics.Arcade.Sprite;
    public wall: Phaser.Physics.Arcade.Sprite;
    public machine_increase: Phaser.Physics.Arcade.Sprite

    //Groups
    public pickups: Phaser.Physics.Arcade.Group;
    public enemies: Phaser.Physics.Arcade.Group;
    public spikes: Phaser.Physics.Arcade.Group;
    public boxes;
    public platforms: Phaser.Physics.Arcade.Group;
    public walls: Phaser.Physics.Arcade.Group;
    public coins: Phaser.Physics.Arcade.Group;
    public doors: Phaser.Physics.Arcade.Group;
    public machines: Phaser.Physics.Arcade.Group;

    //Flags
    public level1complete: boolean = false;

    //Other
    public canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps
    public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    public spacebar;

    constructor(key) {
        super(key);
    }

    create() {

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
    x += 50;
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
    x += 18;
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