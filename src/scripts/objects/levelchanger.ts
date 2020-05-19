export default class LevelChanger extends Phaser.Physics.Arcade.Sprite {
    customValue: number

    constructor(scene: Phaser.Scene, x: number, y: number, value: number) {


        super(scene, x, y, ("levelchanger" + value));

        this.customValue = value;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.physics.world.enableBody(this);
        this.setVisible(false);
    }
}
