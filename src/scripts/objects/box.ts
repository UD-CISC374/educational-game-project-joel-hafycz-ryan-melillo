export default class Box extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number, value: number)  {

        super(scene, x, y, ("box" + value));
        this.setZ(value);
        this.state = value;
        console.log("from box, " + this.state);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        

        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);

    }

}
