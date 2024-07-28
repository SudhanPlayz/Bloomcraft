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

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.wasd = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

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
    }

    update() {
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
    }
}

export default Player;