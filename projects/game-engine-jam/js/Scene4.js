class Scene4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene4'
        });
    }

    create() {
        //visuals fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //displays background image, makes it longer
        this.width = this.game.canvas.width * 3;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        //this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

        //displays door at the beginning of the hallway
        //this.door = this.physics.add.sprite(200, 262, 'door');

        //displays avatar sprite in idle animation
        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);
        this.avatar.hasFire = false;

        //display cat at the end of hallway
        this.cat = this.physics.add.sprite(2300, 500, `cat`);
        this.cat.setImmovable(true);
        this.collider = this.physics.add.collider(this.avatar, this.cat);
        this.cat.play(`sleep`);

        // //display box that blocks path
        // this.box = this.physics.add.sprite(1900, 400, 'box');
        // this.box.setImmovable(true);
        // this.collider = this.physics.add.collider(this.avatar, this.box);
        // this.box.play(`block`);

        // //display table
        // this.table = this.physics.add.sprite(1000, 500, 'table');
        // this.table.setImmovable(true);
        // this.table.play(`closed`);

        //creates camera that follows avatar as they move
        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.height);

        //calls arrow keys, A key and Z key
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        //calls creatAnimations() function
        this.createAnimations();
    }

    createAnimations() {
        //calls certain frames to makes them move
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

        //freeze the first frame
        let idleAnimationConfig = {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('avatar', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(idleAnimationConfig);

        //plays waking up animation
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

        //plays sleep animation
        let sleepAnimationConfig = {
            key: 'sleep',
            frames: this.anims.generateFrameNumbers('cat', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(sleepAnimationConfig);

        // //drawer is closed
        // let closedAnimationConfig = {
        //     key: 'closed',
        //     frames: this.anims.generateFrameNumbers('table', {
        //         start: 0,
        //         end: 0
        //     }),
        //     repeat: 0
        // };
        // this.anims.create(closedAnimationConfig);

        // //drawer is open
        // let openAnimationConfig = {

        //     key: 'open',
        //     frames: this.anims.generateFrameNumbers('table', {

        //         start: 1,
        //         end: 2

        //     }),
        //     frameRate: 2,
        //     repeat: -1
        // };
        // this.anims.create(openAnimationConfig);

        // //box is whole
        // let blockAnimationConfig = {
        //     key: 'block',
        //     frames: this.anims.generateFrameNumbers('box', {
        //         start: 0,
        //         end: 0
        //     }),
        //     repeat: 0
        // };
        // this.anims.create(blockAnimationConfig);

        // //box is broken
        // let brokeAnimationConfig = {

        //     key: 'broke',
        //     frames: this.anims.generateFrameNumbers('box', {

        //         start: 1,
        //         end: 2

        //     }),
        //     frameRate: 2,
        //     repeat: -1
        // };
        // this.anims.create(brokeAnimationConfig);
    }

    //collect fire spell page
    // collectSpell(avatar, fire) {
    //     avatar.hasFire = true;
    //     fire.destroy();
    // }

    update() {
        this.handleInput();
    }

    handleInput() {
        //move avatar to the left, flip sprite
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-400);
            this.avatar.flipX = true;
        }
        //move avatar to the right
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(400);
            this.avatar.flipX = false;
        }
        else {
            this.avatar.setVelocityX(0);
        }

        //plays 'moving' animation
        if (this.avatar.body.velocity.x !== 0) {
            this.avatar.play('moving', true);
        }
        //plays 'idle' animation
        else {
            this.avatar.play('idle', true);
        }

        //fire spell used when player is near box AND has collected spell page, removes collider to pass through
        // if (this.keyA.isDown && this.avatar.x > 1200 && this.avatar.hasFire === true) {
        //     this.box.play('broke', true);
        //     this.physics.world.removeCollider(this.collider);
        // }

        //when table is interracted with, plays 'open' animation and spawns fire spell
        if (this.keyZ.isDown && this.avatar.x > 800 && this.avatar.x < 1000) {
            this.table.play('open', true);
            this.fire = this.physics.add.sprite(1000, 400, 'fire');
            this.physics.add.overlap(this.avatar, this.fire, this.collectSpell, null, this);
        }
        //cat wakes up when interracted with and fades out to end screen
        else if (this.keyZ.isDown && this.avatar.x > 2000) {
            this.tweens.add({
                targets: this.cat,
                alpha: 0,
                duration: 2000,
                repeat: 0,
                onComplete: () => {

                }
            })

            // this.cat.play('wake', true);
            // this.time.delayedCall(1000);
            // this.cameras.main.fadeOut(1000, 0, 0, 0);
            // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            //     this.time.delayedCall(1000, () => {
            //         this.scene.start('end');
            //     })
            // })
        }

    }
}