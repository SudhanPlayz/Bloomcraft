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
        this.load.image('House', 'environment/House.png');
        this.load.image('House Decoration', 'environment/House Decoration.png');
        this.load.image('bush', 'objects/bush.png');

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

        // Player Idle
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

        // Player Axe
        this.load.spritesheet('up_axe', 'player/up_axe/up_axe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('down_axe', 'player/down_axe/down_axe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('left_axe', 'player/left_axe/left_axe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('right_axe', 'player/right_axe/right_axe.png', {
            frameWidth: 172,
            frameHeight: 124
        })

        // Player Hoe
        this.load.spritesheet('up_hoe', 'player/up_hoe/up_hoe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('down_hoe', 'player/down_hoe/down_hoe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('left_hoe', 'player/left_hoe/left_hoe.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('right_hoe', 'player/right_hoe/right_hoe.png', {
            frameWidth: 172,
            frameHeight: 124
        })

        // Player Water
        this.load.spritesheet('up_water', 'player/up_water/up_water.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('down_water', 'player/down_water/down_water.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('left_water', 'player/left_water/left_water.png', {
            frameWidth: 172,
            frameHeight: 124
        })
        this.load.spritesheet('right_water', 'player/right_water/right_water.png', {
            frameWidth: 172,
            frameHeight: 124
        })
    }

    create() {
        this.scene.start('Game');
    }
}
