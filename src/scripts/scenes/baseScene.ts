import Box from "../objects/box";
import Player from "../objects/player";

export default class baseScene extends Phaser.Scene  {
//Backgrounds
public background: Phaser.GameObjects.TileSprite;

  //Indiviual objects
public player: Player;

public drag = 250;

public box0: Phaser.Physics.Arcade.Sprite;
public box1: Phaser.Physics.Arcade.Sprite;
public box2: Phaser.Physics.Arcade.Sprite;
public box3: Phaser.Physics.Arcade.Sprite;
public box4: Phaser.Physics.Arcade.Sprite;
public box5: Phaser.Physics.Arcade.Sprite;
public box6: Phaser.Physics.Arcade.Sprite;

public slot0: Phaser.Physics.Arcade.Image;
public slot1: Phaser.Physics.Arcade.Image;
public slot2: Phaser.Physics.Arcade.Image;
public slot3: Phaser.Physics.Arcade.Image;
public slot4: Phaser.Physics.Arcade.Image;
public slot5: Phaser.Physics.Arcade.Image;
public slot6: Phaser.Physics.Arcade.Image;

public enemy: Phaser.Physics.Arcade.Sprite;
public spike: Phaser.Physics.Arcade.Sprite;
public door: Phaser.Physics.Arcade.Image;
public wall: Phaser.Physics.Arcade.Sprite;
public machine_increase: Phaser.Physics.Arcade.Sprite;
public levelchanger: Phaser.Physics.Arcade.Image;

  //Sounds
public music: Phaser.Sound.BaseSound;
public coinpickup: Phaser.Sound.BaseSound;
public deathsound: Phaser.Sound.BaseSound;
public boxcorrectsound: Phaser.Sound.BaseSound;
  //Groups
public pickups: Phaser.Physics.Arcade.Group;
public enemies: Phaser.Physics.Arcade.Group;
public spikes: Phaser.Physics.Arcade.Group;
public boxes: Phaser.Physics.Arcade.Group;
public platforms: Phaser.Physics.Arcade.Group;
public walls: Phaser.Physics.Arcade.Group;
public coins: Phaser.Physics.Arcade.Group;
public machines: Phaser.Physics.Arcade.Group;
public slots: Phaser.Physics.Arcade.StaticGroup;
public levelchangers:Phaser.Physics.Arcade.StaticGroup;

  //Other
public canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps
public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
public spacebar; 
    constructor(key) {
        super(key);
    }

createCommon(){
    

    this.music = this.sound.add("backgroundmusic");
    var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
    }

    this.music.play(musicConfig);

    
/*this.coinpickup = this.sound.add("coinpickup");
    this.deathsound = this.sound.add("deathsound");
    this.boxcorrectsound = this.sound.add("boxcorrectsound");
*/

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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
    
    this.walls = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });

    this.machines = this.physics.add.group({
        immovable:true,
        allowGravity:false
    });
    
    this.slots=this.physics.add.staticGroup();
    this.levelchangers=this.physics.add.staticGroup();


    this.cursorKeys = this.input.keyboard.createCursorKeys();

    let PlayerSpawnX = 50;
    let PlayerSpawnY = 50;
    this.canJump = 0;//allow player to jump
    }

update() {
    this.movePlayerManager();

    if(this.player.body.blocked.down){
    this.canJump = 0;
    }
    if(this.player.holding){
        //console.log("in holding");
        const holding = this.player.holding as Box;
        //holding.setGravity(0);
        holding.x = this.player.x;
        holding.y=this.player.y;
        //console.log(holding);
    }
}

  //Helper Functions (movement, collecting, you name it)

pickupCoin(player, coin){
    coin.disableBody(true, true);
    //this.coinpickup.play();
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
    y += 31;
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

//used with custom class now
createBox(scene, x,y, num){
    var box = new Box (scene, x, y, num);
    this.boxes.add(box);
    box.setCollideWorldBounds(true);
    box.setDragX(this.drag);
    box.setBounceX(1);
} 

createLevelChanger(x,y,num){
    var levelchanger = this.physics.add.staticImage(x,y,"levelchanger"+num);
    levelchanger.state = num;
    this.levelchangers.add(levelchanger);
}

createSlot(x,y, num){
    var slot = this.physics.add.staticImage(x,y,"slot"+num);
    slot.state = num;
    this.slots.add(slot);
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

    handleSlot(box, slot){
        let counter = 0;
        if (box.customValue == slot.state){
            if (box.customValue == 0){
                box.destroy();
                slot.destroy();
            }
            if (box.customValue == 1){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(490, 607);
            }
            if (box.customValue == 2){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(520, 607);
            }
            if (box.customValue == 3){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(550, 607);
            }
            if (box.customValue == 4){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(440, 607);
            }
            if (box.customValue == 5){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(470, 607);
            }
            if (box.customValue == 6){
                box.destroy();
                (slot.body as Phaser.Physics.Arcade.StaticBody).reset(500, 607);
            }
        }
    }

    handleDoor(door,box){
        if (box.customValue==0){
            box.destroy();
            door.destroy();
        }
    }
    
    handlePickup(player, box){
        //if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            player.holding = box;
       // }
    }
       //currently unused, supposed to be for double jumping on key activation
    handleJump(){
        if(this.canJump<2){
        this.player.setVelocityY(-320);
        this.canJump+=1;
        }
    }
    
    hurtPlayer(player, enemy){
        player.x = 80;
        player.y = 20;
    }
    
    handleMachine(box, machine){
        if (!box.valueChanged){
            box.valueChanged = true;
            box.customValue+=3;
            box.setTexture("box" + box.customValue);
        }   
    }

    handleLevelchange(){
        let counter = 1;
        if (counter == 1){
            this.scene.start('Level2');
            counter++;
        }
        else if (counter == 2){
            this.scene.start('Level3');
            counter++;
        } 
        //else if (counter == 3){
        //}
    
    }
}