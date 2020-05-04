import baseScene from "./baseScene";
import Box from "../objects/box";
import Player from "../objects/player";

export default class Level3 extends baseScene {

    
    constructor() {
        super({ key: 'Level3' });
    }

    create() {
        this.createCommon();
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "backgroundlvl1.png");
        this.background.setOrigin(0, 0);

        this.add.text(90,220, "The End of the Beta", {
            font: "50px Arial",
            fill: "black"
        });
    }
}