class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'Texture', 'Frame'); // The frame is optional 

        this.scene.add.existing(this);
    }
}
