class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        this.wall = this.physics.add.sprite(400, 300, 'wall');

        this.avatar = this.physics.add.sprite(200, 350, 'avatar');

        this.createAnimations();

        this.avatar.play('moving');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createAnimations() {
        let movingAnimationConfig = {

            key: 'moving',
            frames: this.anims.generateFrameNumbers('avatar', {

                start: 0,
                end: 7

            }),
            frameRate: 30,
            repeat: -1
        };
        this.anims.create(movingAnimationConfig);

        let idleAnimationConfig = {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('avatar', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };

        this.anims.create(idleAnimationConfig);
    }

    update() {
        this.handleInput();
    }

    handleInput() {
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(200);
        }
        else {
            this.avatar.setVelocityX(0);
        }

        if (this.avatar.body.velocity.x !== 0) {
            this.avatar.play('moving', true);
        }
        else {
            this.avatar.play('idle', true);
        }
    }
}


