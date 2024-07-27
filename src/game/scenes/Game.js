import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../lib/Player';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);

        const map = this.make.tilemap({ key: 'tilemap' })

        const hillsTileset = map.addTilesetImage('Hills', 'Hills')
        const grassTileset = map.addTilesetImage('Grass', 'Grass')

        map.createLayer("Background", [hillsTileset, grassTileset])

        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
        this.add.existing(this.player);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    update() {
        // Update the player
        this.player.update();
    }
}
