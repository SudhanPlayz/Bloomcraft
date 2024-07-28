import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_down_idle', 0);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.body.setSize(45, 45);
        this.body.setOffset(63, 54);

        this.speed = 170;
        this.direction = 'down';
        this.tool = 'axe';
        this.isUsingTool = false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.wasd = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.toolKeys = this.scene.input.keyboard.addKeys({
            axe: Phaser.Input.Keyboard.KeyCodes.ONE,
            hoe: Phaser.Input.Keyboard.KeyCodes.TWO,
            water: Phaser.Input.Keyboard.KeyCodes.THREE
        });

        this.scene.input.on('pointerdown', this.startUsingTool, this);
        this.scene.input.on('pointerup', this.stopUsingTool, this);

        this.createAnimations();
    }

    createAnimations() {
        // Walking animations
        const directions = ['up', 'down', 'left', 'right'];
        directions.forEach(dir => {
            this.scene.anims.create({
                key: `walk_${dir}`,
                frames: this.scene.anims.generateFrameNumbers(`player_${dir}`, { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        });

        // Idle animations
        directions.forEach(dir => {
            this.scene.anims.create({
                key: `idle_${dir}`,
                frames: this.scene.anims.generateFrameNumbers(`player_${dir}_idle`, { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });
        });

        // Tool animations
        const tools = ['axe', 'hoe', 'water'];
        tools.forEach(tool => {
            directions.forEach(dir => {
                this.scene.anims.create({
                    key: `${dir}_${tool}`,
                    frames: this.scene.anims.generateFrameNumbers(`${dir}_${tool}`, { start: 0, end: 1 }),
                    frameRate: 5,
                    repeat: -1
                });
            });
        });
    }

    update() {
        if (this.isUsingTool) return;

        this.setVelocity(0);

        let moving = false;

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.setVelocityX(-this.speed);
            this.play('walk_left', true);
            this.direction = 'left';
            moving = true;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.setVelocityX(this.speed);
            this.play('walk_right', true);
            this.direction = 'right';
            moving = true;
        } else if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.setVelocityY(-this.speed);
            this.play('walk_up', true);
            this.direction = 'up';
            moving = true;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.setVelocityY(this.speed);
            this.play('walk_down', true);
            this.direction = 'down';
            moving = true;
        }

        if (!moving) {
            this.play(`idle_${this.direction}`, true);
        }

        this.body.velocity.normalize().scale(this.speed);

        this.checkToolSelection();
    }

    checkToolSelection() {
        if (Phaser.Input.Keyboard.JustDown(this.toolKeys.axe)) {
            this.selectTool('axe');
        } else if (Phaser.Input.Keyboard.JustDown(this.toolKeys.hoe)) {
            this.selectTool('hoe');
        } else if (Phaser.Input.Keyboard.JustDown(this.toolKeys.water)) {
            this.selectTool('water');
        }
    }

    selectTool(tool) {
        this.tool = tool;
        console.log(`Selected tool: ${this.tool}`);
    }

    startUsingTool() {
        if (!this.isUsingTool) {
            this.isUsingTool = true;
            this.setVelocity(0);

            this.play(`${this.direction}_${this.tool}`, true);

            console.log(`Started using ${this.tool} in ${this.direction} direction`);
        }
    }

    stopUsingTool() {
        if (this.isUsingTool) {
            this.isUsingTool = false;
            this.play(`idle_${this.direction}`, true);

            console.log(`Stopped using ${this.tool}`);
        }
    }
}

export default Player;