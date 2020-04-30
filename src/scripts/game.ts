import 'phaser';
import Level1 from './scenes/Level1';
import Level2 from './scenes/Level2';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 940;
const DEFAULT_HEIGHT = 700;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH, 
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, Level1],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 600 }
        
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
