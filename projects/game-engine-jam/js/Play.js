class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        this.width = this.game.canvas.width * 2;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.background = this.add.tileSprite(this.width / 2, this.height / 2 + 50, this.width, this.height, 'bg');

        this.avatar = this.physics.add.sprite(200, 350, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.createAnimations();
        this.avatar.play(`idle`);

        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.width);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createAnimations() {
        let movingAnimationConfig = {

            key: 'moving',
            frames: this.anims.generateFrameNumbers('avatar', {

                start: 0,
                end: 7

            }),
            frameRate: 15,
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


