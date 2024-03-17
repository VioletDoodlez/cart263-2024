class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        this.width = this.game.canvas.width * 3;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

        this.door = this.physics.add.sprite(200, 262, 'door');

        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);

        this.cat = this.physics.add.sprite(2300, 500, `cat`);
        this.cat.setImmovable(true);
        this.collider = this.physics.add.collider(this.avatar, this.cat);
        this.cat.play(`sleep`);

        this.box = this.physics.add.sprite(1900, 400, 'box');
        this.box.setImmovable(true);
        this.collider = this.physics.add.collider(this.avatar, this.box);
        this.box.play(`block`);

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

        let wakeAnimationConfig = {

            key: 'wake',
            frames: this.anims.generateFrameNumbers('cat', {

                start: 1,
                end: 8

            }),
            frameRate: 15,
            repeat: -1
        };
        this.anims.create(wakeAnimationConfig);

        let sleepAnimationConfig = {
            key: 'sleep',
            frames: this.anims.generateFrameNumbers('cat', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(sleepAnimationConfig);

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

        if (this.keyA.isDown && this.avatar.x > 1200) {
            this.box.play('broke', true);
            this.physics.world.removeCollider(this.collider);
        }

        // if (this.keyZ.isDown && this.avatar.x > 1800 && this.key.destroy) {
        //     this.cameras.main.fadeOut(1000, 0, 0, 0);
        //     this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        //         this.time.delayedCall(1000, () => {
        //             this.scene.start('scene2');
        //         })
        //     })
        // }
        if (this.keyZ.isDown && this.avatar.x > 2000) {
            this.cat.play('wake', true);
        }
    }

}