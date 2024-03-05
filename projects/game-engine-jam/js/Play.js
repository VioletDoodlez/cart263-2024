class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        this.wall = this.add.sprite(500, 500, 'wall');
    }

    update() {

    }
}


