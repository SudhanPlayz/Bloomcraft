import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

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

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
