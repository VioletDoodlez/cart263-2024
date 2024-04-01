class Scene2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene2'
        });
    }

    create() {
        //visuals fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //displays background image, makes it longer
        this.width = this.game.canvas.width * 3;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'bg');

        //displays door at the beginning of the hallway
        this.door1 = this.physics.add.sprite(200, 262, 'door');

        //display door at the end of hallway
        this.door2 = this.physics.add.sprite(2100, 262, `door`);

        //display shelf that hides item
        this.shelf = this.physics.add.sprite(1500, 262, 'shelf');
        this.shelf.setImmovable(true);
        this.shelf.play(`still`);

        //displays avatar sprite in idle animation
        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);
        this.avatar.hasKey = false;
        this.avatar.hasEarth = false;


        //display table
        this.table = this.physics.add.sprite(1000, 500, 'table');
        this.table.setImmovable(true);
        this.table.play(`closed`);

        //creates camera that follows avatar as they move
        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.height);

        //calls arrow keys, A key and Z key
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
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

        //drawer is closed
        let closedAnimationConfig = {
            key: 'closed',
            frames: this.anims.generateFrameNumbers('table', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(closedAnimationConfig);

        //drawer is open
        let openAnimationConfig = {

            key: 'open',
            frames: this.anims.generateFrameNumbers('table', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(openAnimationConfig);

        //shelf is still
        let stillAnimationConfig = {
            key: 'still',
            frames: this.anims.generateFrameNumbers('shelf', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(stillAnimationConfig);

        //shelf is moved
        let shiftAnimationConfig = {

            key: 'shift',
            frames: this.anims.generateFrameNumbers('shelf', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(shiftAnimationConfig);
    }

    //collect key
    collectItem(avatar, key) {
        avatar.hasKey = true;
        key.destroy();
    }

    //collect earth spell page
    collectSpell(avatar, earth) {
        avatar.hasEarth = true;
        earth.destroy();
    }

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

        //earth spell used when player is near shelf AND has collected spell page, moves shelf to reveal key
        if (this.keyS.isDown && this.avatar.x > 1500 && this.avatar.x < 1700 && this.avatar.hasEarth === true) {
            this.shelf.play('shift', true);
            this.key = this.physics.add.sprite(1400, 530, 'key');
            this.physics.add.overlap(this.avatar, this.key, this.collectItem, null, this);
        }

        //when table is interracted with, plays 'open' animation and spawns earth spell
        if (this.keyZ.isDown && this.avatar.x > 800 && this.avatar.x < 1000) {
            this.table.play('open', true);
            this.earth = this.physics.add.sprite(1000, 400, 'earth');
            this.physics.add.overlap(this.avatar, this.earth, this.collectSpell, null, this);
        }
        //Goes to scene 3
        else if (this.keyZ.isDown && this.avatar.x > 2000 && this.avatar.hasKey === true) {
            this.time.delayedCall(1000);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scene3');
                })
            })
        }

    }
}