export default class Box extends Phaser.Physics.Arcade.Sprite {
  customValue: number
  valueChanged: boolean
  pickedUp: boolean

  constructor(scene: Phaser.Scene, x: number, y: number, value: number)  {
    

        super(scene, x, y, ("box" + value));

        this.customValue = value;
        this.valueChanged = false;
        this.pickedUp = false;

    
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.physics.world.enableBody(this);
    }
}
