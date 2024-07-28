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
        const houseTileset = map.addTilesetImage('House', 'House');
        const bushTileset = map.addTilesetImage('bush', 'bush');
        const houseDecorationTileset = map.addTilesetImage('House Decoration', 'House Decoration');

        const backgroundLayer = map.createLayer("Background", [hillsTileset, grassTileset]);
        map.createLayer("Decoration", [hillsTileset, grassTileset, bushTileset]);

        // House layers
        const houseBackgroundLayer = map.createLayer("House/Background", houseTileset);
        const wallsLayer = map.createLayer("House/Walls", houseTileset);
        map.createLayer("House/Decoration", houseDecorationTileset);
        const houseDecorationLayer = map.createLayer("House/DecorationCollision", houseDecorationTileset);

        this.player = new Player(this, (this.cameras.main.width / 2) + 100, (this.cameras.main.height / 2) + 100);
        this.add.existing(this.player);

        this.roofLayer = map.createLayer("House/Roof", houseTileset);
        this.roofTopLayer = map.createLayer("House/RoofTop", houseTileset);

        wallsLayer.setCollisionByExclusion([-1]);
        houseDecorationLayer.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = backgroundLayer.width;
        this.physics.world.bounds.height = backgroundLayer.height;

        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, houseDecorationLayer);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.defineHouseArea(houseBackgroundLayer);
        this.isPlayerInHouse = false;
        this.updateRoofVisibility();

        EventBus.emit('current-scene-ready', this);
    }

    defineHouseArea(houseBackgroundLayer) {
        const houseTiles = houseBackgroundLayer.getTilesWithin();
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        houseTiles.forEach(tile => {
            if (tile.index !== -1) {
                minX = Math.min(minX, tile.pixelX);
                minY = Math.min(minY, tile.pixelY);
                maxX = Math.max(maxX, tile.pixelX + tile.width);
                maxY = Math.max(maxY, tile.pixelY + tile.height);
            }
        });

        this.houseArea = new Phaser.Geom.Rectangle(minX, minY, maxX - minX, maxY - minY);
    }

    updateRoofVisibility() {
        if (this.isPlayerInHouse) {
            this.roofLayer.setAlpha(0);
            this.roofTopLayer.setAlpha(0);
        } else {
            this.roofLayer.setAlpha(1);
            this.roofTopLayer.setAlpha(1);
        }
    }

    update() {
        this.player.update();

        const wasInHouse = this.isPlayerInHouse;
        this.isPlayerInHouse = Phaser.Geom.Rectangle.Contains(
            this.houseArea,
            this.player.x,
            this.player.y
        );

        if (wasInHouse !== this.isPlayerInHouse) {
            this.updateRoofVisibility();
        }
    }
}