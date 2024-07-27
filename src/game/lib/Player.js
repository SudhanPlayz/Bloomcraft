import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_down', 0);

        this.scene = scene;
        this.scene.add.existing(this);
        console.log(this.scene.physics)
        this.scene.physics.add.existing(this);

        // Set up physics properties
        this.setCollideWorldBounds(true);

        // Player properties
        this.speed = 160;

        // Input
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Animations
        this.createAnimations();
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNumbers('player_up', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNumbers('player_down', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNumbers('player_left', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNumbers('player_right', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        // Reset velocity
        this.setVelocity(0);

        // Handle input and movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.play('walk_left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.play('walk_right', true);
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            this.play('walk_up', true);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            this.play('walk_down', true);
        }

        // If no movement, stop animations
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.stop();
        }
    }
}

export default Player;