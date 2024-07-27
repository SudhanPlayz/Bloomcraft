import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../lib/Player';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);

        const map = this.make.tilemap({ key: 'tilemap' });

        const hillsTileset = map.addTilesetImage('Hills', 'Hills');
        const grassTileset = map.addTilesetImage('Grass', 'Grass');

        const backgroundLayer = map.createLayer("Background", [hillsTileset, grassTileset]);

        this.physics.world.bounds.width = backgroundLayer.width;
        this.physics.world.bounds.height = backgroundLayer.height;

        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2);
        this.add.existing(this.player);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.player.update();
    }
}