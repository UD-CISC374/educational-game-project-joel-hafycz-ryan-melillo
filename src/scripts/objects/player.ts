import Box from "./box";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    holding?: Box | undefined
    isHurt: boolean

    constructor(scene: Phaser.Scene, x: number, y: number) {


        super(scene, x, y, "player");

        //this. holding = new Box(scene, 0, 0, 1);
        this.isHurt = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.physics.world.enableBody(this);
    }

    setHolding(hold) {
        this.holding = hold;
    }
}