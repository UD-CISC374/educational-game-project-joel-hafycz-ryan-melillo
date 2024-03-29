import Box from "../objects/box";
import Machine from "../objects/machine";
import Player from "../objects/player";
import LevelChanger from "../objects/levelchanger";

export default class baseScene extends Phaser.Scene {
    //Backgrounds
    public background: Phaser.GameObjects.TileSprite;

    //Indiviual objects
    public player: Player;

    public drag = 250;

    public boxCount = 0;

    public box0: Phaser.Physics.Arcade.Sprite;
    public box1: Phaser.Physics.Arcade.Sprite;
    public box2: Phaser.Physics.Arcade.Sprite;
    public box3: Phaser.Physics.Arcade.Sprite;
    public box4: Phaser.Physics.Arcade.Sprite;
    public box5: Phaser.Physics.Arcade.Sprite;
    public box6: Phaser.Physics.Arcade.Sprite;
    public box7: Phaser.Physics.Arcade.Sprite;
    public box8: Phaser.Physics.Arcade.Sprite;

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
    public machine1: Phaser.Physics.Arcade.Sprite;
    public machine2: Phaser.Physics.Arcade.Sprite;
    public machine3: Phaser.Physics.Arcade.Sprite;
    public machine4: Phaser.Physics.Arcade.Sprite;
    public machine5: Phaser.Physics.Arcade.Sprite;

    public levelchanger0: Phaser.Physics.Arcade.Image;
    public levelchanger1: Phaser.Physics.Arcade.Image;
    public levelchanger2: Phaser.Physics.Arcade.Image;
    public levelchanger3: Phaser.Physics.Arcade.Image;

    //Sounds
    public music: Phaser.Sound.BaseSound;

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
    public boxEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    public levelchangers0: Phaser.Physics.Arcade.Group;
    public levelchangers1: Phaser.Physics.Arcade.Group;
    public levelchangers2: Phaser.Physics.Arcade.Group;
    public levelchangers3: Phaser.Physics.Arcade.Group;

    //Other
    public canJump; //set to 1 when jumps so cant again -- maybe a powerup for double jump, so canJump can be 0 then 1 THEN set to two to only allow 2 jumps
    public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    public spacebar;
    public uparrow;
    public enemyVelocity = 35;
    constructor(key) {
        super(key);
    }

    createCommon() {




        /*this.coinpickup = this.sound.add("coinpickup");
            this.deathsound = this.sound.add("deathsound");
            this.boxcorrectsound = this.sound.add("boxcorrectsound");
        */

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.uparrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Spikes
        this.spikes = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        //Enemies
        this.enemies = this.physics.add.group({
            immovable: false,
            allowGravity: true
        });

        this.coins = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        //Platforms
        this.platforms = this.physics.add.group({
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
            immovable: true,
            allowGravity: false
        });

        this.levelchangers0 = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.levelchangers1 = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.levelchangers2 = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.levelchangers3 = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.slots = this.physics.add.staticGroup();

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.canJump = 0;//allow player to jump

        this.boxEmitter = this.add.particles("box0").createEmitter({
            on: true,
            speed: { min: 50, max: 200 },
            scale: .25,
            lifespan: 1000,
            alpha: { start: 1, end: 0 },
            gravityY: 400,
            blendMode: Phaser.BlendModes.SCREEN
        });

        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.walls, this.bounceEnemy.bind(this));
        this.physics.add.collider(this.enemies, this.levelchangers0, this.bounceEnemy.bind(this));
        this.physics.add.collider(this.enemies, this.slots, this.bounceEnemy.bind(this));


    }

    handleJump(player, object) {
        this.canJump = 0;
    }

    bounceEnemy(enemy, object) {
        if (enemy.state == -1) {
            enemy.setVelocity(this.enemyVelocity);
            enemy.state = 1;
        }
        else {
            enemy.setVelocity(-this.enemyVelocity);
            enemy.state = (-1);
        }
    }

    update() {
        this.movePlayerManager();

        if (this.player.body.blocked.down) {
            this.canJump = 0;
        }
        if (this.player.holding) {
            //console.log("in holding");
            const holding = this.player.holding as Box;
            //holding.setGravity(0);
            holding.x = this.player.x;
            holding.y = this.player.y;
            //console.log(holding);
        }
    }

    //Helper Functions (movement, collecting, you name it)

    pickupCoin(player, coin) {
        coin.disableBody(true, true);
        this.sound.play("coinpickup");
        //this.coinpickup.play();
    }

    createPlatform(xpos, ypos) {
        var platform = this.physics.add.sprite(xpos, ypos, "platform");
        this.platforms.add(platform);
    }

    createLongPlatforms(x, y, length) {
        for (let i = 0; i < length; i++) {
            var platform = this.physics.add.sprite(x, y, "platform");
            this.platforms.add(platform);
            x += 50;
        }
    }

    createWalls(x, y, length) {
        for (let i = 0; i < length; i++) {
            var wall = this.physics.add.sprite(x, y, "wall");
            this.walls.add(wall);
            y += 31;
        }
    }

    createLongSpike(x, y, length) {
        for (let i = 0; i < length; i++) {
            var spike = this.physics.add.sprite(x, y, "spike");
            this.spikes.add(spike);
            x += 18;
        }
    }

    createCoin(x, y) {
        var coin = this.physics.add.sprite(x, y, "coin");
        this.coins.add(coin);
    }

    createSpike(x, y) {
        var spike = this.physics.add.sprite(x, y, "spike");
        this.spikes.add(spike);
    }

    createEnemy(x, y) {
        var enemy = this.physics.add.sprite(x, y, "enemy");
        this.enemies.add(enemy);
        enemy.setVelocityX(-this.enemyVelocity);
        //enemy.body.velocity.x = -50;
        enemy.setCollideWorldBounds(true);
        enemy.setState(-1);
        //enemy.setDragX(this.drag);
    }

    //used with custom class now
    createBox(scene, x, y, num) {
        var box = new Box(scene, x, y, num);
        this.boxes.add(box);
        box.setCollideWorldBounds(true);
        box.setDragX(this.drag);
        box.setBounce(.5);
    }

    createLevelChanger0(scene, x, y, num) {
        var levelchanger = new LevelChanger(scene, x, y, num);
        this.levelchangers0.add(levelchanger);
    }

    createLevelChanger1(scene, x, y, num) {
        var levelchanger = new LevelChanger(scene, x, y, num);
        this.levelchangers1.add(levelchanger);
    }

    createLevelChanger2(scene, x, y, num) {
        var levelchanger = new LevelChanger(scene, x, y, num);
        this.levelchangers2.add(levelchanger);
    }

    createLevelChanger3(scene, x, y, num) {
        var levelchanger = new LevelChanger(scene, x, y, num);
        this.levelchangers3.add(levelchanger);
    }

    createSlot(x, y, num) {
        var slot = this.physics.add.staticImage(x, y, "slot" + num);
        slot.state = num;
        this.slots.add(slot);
    }

    createMachine(scene, x, y, type) {
        var machine = new Machine(scene, x, y, type);
        this.machines.add(machine);
    }




    movePlayerManager() {
        if (this.cursorKeys.left?.isDown) {
            this.player.setVelocityX(-175);
            this.player.flipX = false;
        }

        else if (this.cursorKeys.right?.isDown) {
            this.player.setVelocityX(175);
            this.player.flipX = true;
        }

        else {
            //this.player.setVelocityX(0);
            this.player.setDragX(this.drag);//cool sliding stuff
        }
        /** for infinite jump
                if(this.cursorKeys.up?.isDown){
                    this.player.setVelocityY(-280);
                }
        */
        if (Phaser.Input.Keyboard.JustDown(this.uparrow) && this.canJump < 2) {
            this.player.setVelocityY(-280);
            this.canJump++;
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.holding) {
            this.player.holding.body.enable = true;
            this.player.holding = undefined;
            this.sound.play("drop");
        }
    }

    handleSlot(box, slot) {
        if (box.customValue == slot.state) {
            box.disableBody();
            this.sound.play("boop");
            if (box.customValue == 0) {
                box.destroy();
                slot.destroy();
            }
            if (box.customValue != 0) {
                //reset messes up the animation depending on the value, not sure why
                //   
                this.boxCount += 1;
                this.tweens.add({
                    targets: slot,
                    ease: 'Linear',
                    duration: 700,
                    repeat: 0,
                    x: slot.x,
                    y: 620,
                    onComplete: () => {
                        (slot.body as Phaser.Physics.Arcade.StaticBody).reset(slot.body.x + 15, 620);
                    }
                });
                this.tweens.add({
                    targets: box,
                    ease: 'Linear',
                    duration: 750,
                    repeat: 0,
                    x: box.x,
                    y: 595,
                    onComplete: () => {
                        //doesnt emit particles for whatever reason
                        this.boxEmitter.setPosition(490, 595);
                        this.boxEmitter.emitParticle(50);
                        box.destroy();
                    }

                });

            }
        }
        if (this.boxCount == 3) {
            this.door.destroy();
        }

    }

    handleDoor(door, box) {
        if (box.customValue == 0) {
            box.destroy();
            door.destroy();
        }
    }

    handlePass(player, door) {
        console.log("in pass: " + this.boxCount);
        if (this.boxCount == 3) {
            console.log("in if");
            this.boxCount = 0;
            door.destroy();
        }
    }

    handlePickup(player, box) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (player.holding) {
                this.sound.play("deny");
                let warningMsg = this.add.text(box.x - 120, box.y - 50, "Drop the box\nyou're holding first!",
                    {
                        color: "brightred"
                    });
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: warningMsg,
                        duration: 2500,
                        alpha: 0,
                        onComplete: () => warningMsg.destroy()
                    });
                })
            }
            else {
                this.sound.play("pickup");
                player.holding = box;
                box.disableBody();
            }
        }
    }


    hurtPlayer(player, enemy) {
        this.tweens.add({
            targets: player,
            ease: 'Circular',
            alpha: 0,
            duration: 500,
            repeat: 0,
            onComplete: () => {
                this.time.delayedCall(500, () => {
                    (this.tweens.add({
                        targets: player,
                        ease: 'Linear',
                        alpha: 1,
                        duration: 1000,
                        repeat: 0,
                    }));
                })
            }
        });
        if (!player.isHurt) {
            this.sound.play("deathsound");
            player.isHurt = true;
            let ouchMsg = this.add.text(player.x, player.y - 50, "Owch!!!", { color: "orange" });
            this.time.delayedCall(1000, () => {
                this.tweens.add({
                    targets: ouchMsg,
                    duration: 1500,
                    alpha: 1,
                    onComplete: () => ouchMsg.destroy()
                });
            })
        }
        this.time.delayedCall(5000, () => {
            player.isHurt = false;
        })
    }

    handleMachine(machine, box) {
        console.log(machine.customValue);
        if (machine.customValue == 1) {
            if (!box.valueChanged) {
                box.setVelocityY(750);
                box.setVelocityX(340);
                //again doesnt work idk why
                this.boxEmitter.setPosition(box.x, box.y);
                this.boxEmitter.emitParticle(50);
                this.sound.play("boop");
                box.valueChanged = true;
                box.customValue += 3;
                box.setTexture("box" + box.customValue);
            }
        }
        else if (machine.customValue == 2) {
            if (!box.valueChanged) {
                this.sound.play("boop");
                box.destroy();
            }
        }
        else if (machine.customValue == 3) {
            box.setVelocityY(-200);
            box.setVelocityX(200);
            this.sound.play("boop");
            if (box.customValue !== 0) {
                box.customValue -= 1;
                box.setTexture("box" + box.customValue);
            }
        }
        else if (machine.customValue == 4) {
            box.setVelocityY(-200);
            box.setVelocityX(-200);
            this.sound.play("boop");
            if (box.customValue !== 8) {
                box.customValue += 1;
                box.setTexture("box" + box.customValue);
            }
        }
        else if (machine.customValue == 5) {
            this.sound.play("boop");
            box.setVelocityX(-200);
            box.setVelocityY(-200);
        }
    }


    handleButton(player, machine) {
        this.canJump = 0;
        if (machine.customValue == 5) {
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.createBox(this, 50, 50, 0);
            }
        }
    }

    handleLevelchange0() {
        this.scene.start('Level1');
    }

    handleLevelchange1() {
        this.scene.start('Level2');
    }

    handleLevelchange2() {
        this.scene.start('Level3');
    }

    handleLevelchange3() {
        this.scene.start('Level4');
    }
}