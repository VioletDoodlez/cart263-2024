class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        this.width = this.game.canvas.width * 3;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

        this.door = this.physics.add.sprite(2100, 262, 'door');

        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);
        this.avatar.hasKey = false;

        this.frames = this.physics.add.sprite(1000, 200, 'frames');
        this.frames.setImmovable(true);
        this.frames.play(`crook`);

        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.height);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.createAnimations();
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

        let crookAnimationConfig = {
            key: 'crook',
            frames: this.anims.generateFrameNumbers('frames', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(crookAnimationConfig);

        let fixAnimationConfig = {

            key: 'fix',
            frames: this.anims.generateFrameNumbers('frames', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(fixAnimationConfig);
    }

    collectItem(avatar, key) {
        avatar.hasKey = true;
        key.destroy();
    }

    update() {
        this.handleInput();
    }

    handleInput() {
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-200);
            this.avatar.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(400);
            this.avatar.flipX = false;
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

        if (this.keyZ.isDown && this.avatar.x > 900 && this.avatar.x < 1100) {
            this.frames.play('fix', true);
            this.key = this.physics.add.sprite(700, 530, 'key');
            this.physics.add.overlap(this.avatar, this.key, this.collectItem, null, this);
        }
        else if (this.keyZ.isDown && this.avatar.x > 1800 && this.avatar.hasKey === true) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scene2');
                })
            })
        }

    }
}


