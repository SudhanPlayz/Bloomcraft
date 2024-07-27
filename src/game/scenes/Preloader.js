import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background').setDepth(0);
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        // Environment
        this.load.image('Hills', 'environment/Hills.png');
        this.load.image('Grass', 'environment/Grass.png');

        // Map
        this.load.tilemapTiledJSON('tilemap', 'map.json')

        // Player
        this.load.spritesheet('player_up', 'player/up/up.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_down', 'player/down/down.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_left', 'player/left/left.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_right', 'player/right/right.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_up_idle', 'player/up_idle/up_idle.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_down_idle', 'player/down_idle/down_idle.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_left_idle', 'player/left_idle/left_idle.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('player_right_idle', 'player/right_idle/right_idle.png', {
            frameWidth: 172,
            frameHeight: 124
        })
    }

    create() {
        this.scene.start('Game');
    }
}
