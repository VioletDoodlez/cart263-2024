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
        this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);

        this.key = this.physics.add.sprite(700, 530, 'key');
        this.physics.add.overlap(this.avatar, this.key, this.collectItem, null, this);

        this.box = this.physics.add.sprite(1000, 400, 'box');
        this.box.setImmovable(true);
        this.collider = this.physics.add.collider(this.avatar, this.box);
        this.box.play(`block`);

        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.height);

        this.createAnimations();

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

        let blockAnimationConfig = {
            key: 'block',
            frames: this.anims.generateFrameNumbers('box', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(blockAnimationConfig);

        let brokeAnimationConfig = {

            key: 'broke',
            frames: this.anims.generateFrameNumbers('box', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(brokeAnimationConfig);
    }

    collectItem(avatar, key) {
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
            this.avatar.setVelocityX(200);
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

        if (this.cursors.space.isDown) {
            this.box.play('broke', true);
            this.physics.world.removeCollider(this.collider);
        }
    }
}


