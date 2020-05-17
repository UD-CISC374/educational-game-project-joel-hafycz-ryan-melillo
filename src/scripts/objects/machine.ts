export default class Machine extends Phaser.Physics.Arcade.Sprite {
    customValue: number

    constructor(scene: Phaser.Scene, x: number, y: number, type: number)  {


        super(scene, x, y, ("machine" + type));

        this.customValue = type;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.physics.world.enableBody(this);
    }
}