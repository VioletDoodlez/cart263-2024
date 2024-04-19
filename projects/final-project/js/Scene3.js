class Scene3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene3'
        });
    }

    init(data) {
        this.doorUsed = data.door;
    }


    create() {
        //visuals fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //displays background image, makes it longer
        this.width = this.game.canvas.width * 3;
        this.height = this.game.canvas.height;
        this.physics.world.setBounds(0, 0, this.width, this.height);
        this.background = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'kitchen');

        //displays door at the beginning of the hallway
        this.door1 = this.physics.add.sprite(200, 262, 'door');
        this.door2 = this.physics.add.sprite(2100, 262, `door`);
        this.door3 = this.physics.add.sprite(2900, 262, 'door');

        //display cupboard
        this.cupboard = this.physics.add.sprite(1000, 292, 'cupboard');
        this.cupboard.setImmovable(true);
        this.cupboard.play('shut');

        //displays avatar sprite in idle animation
        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);
        this.avatar.hasFire = false;

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
        this.cameras.main.setBounds(0, 0, this.width * 4, this.height);

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

        //cupboard is shut
        let shutAnimationConfig = {
            key: 'shut',
            frames: this.anims.generateFrameNumbers('cupboard', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(shutAnimationConfig);

        //cupboard is open (right)
        let openrightAnimationConfig = {

            key: 'openright',
            frames: this.anims.generateFrameNumbers('cupboard', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(openrightAnimationConfig);

        //cupboard is open (left)
        let openleftAnimationConfig = {

            key: 'openleft',
            frames: this.anims.generateFrameNumbers('cupboard', {

                start: 3,
                end: 4

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(openleftAnimationConfig);

        //cupboard is open (all)
        let openallAnimationConfig = {

            key: 'openall',
            frames: this.anims.generateFrameNumbers('cupboard', {

                start: 5,
                end: 6

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(openallAnimationConfig);
    }

    //collect fire spell page
    collectSpell(avatar, fire) {
        avatar.hasFire = true;
        fire.destroy();
    }

    collectCheese(avatar, cheese) {
        avatar.hasCheese = true;
        cheese.destroy();
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

        // //fire spell used when player is near box AND has collected spell page, removes collider to pass through
        // if (this.keyA.isDown && this.avatar.x > 1200 && this.avatar.hasFire === true) {
        //     this.box.play('broke', true);
        //     this.physics.world.removeCollider(this.collider);
        //     this.avatar.setCollideWorldBounds(false);
        // }

        //when table is interracted with, plays 'open' animation and spawns fire spell
        // if (this.keyZ.isDown && this.avatar.x > 800 && this.avatar.x < 1000) {
        //     this.table.play('open', true);
        //     this.fire = this.physics.add.sprite(1000, 400, 'fire');
        //     this.physics.add.overlap(this.avatar, this.fire, this.collectSpell, null, this);
        // }
        //open cupboard
        if (this.keyZ.isDown && this.avatar.x > 900 && this.avatar.x < 1200) {
            this.cupboard.play('openright', true);
            this.cupboard.openright = true;
            if (this.cupboard.openleft === true) {
                this.cupboard.play('openall', true);
            }
        }
        else if (this.keyZ.isDown && this.avatar.x > 800 && this.avatar.x < 1000) {
            this.cupboard.play('openleft', true);
            this.cupboard.openleft = true;
            if (this.cupboard.openright === true) {
                this.cupboard.play('openall', true);
            }
        }
        else if (this.keyZ.isDown && this.avatar.x >= 200 && this.avatar.x < 400) {
            this.time.delayedCall(1000);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scene2', {
                        door: "scene3ToScene2"
                    });
                })
            })
        }
        else if (this.keyZ.isDown && this.avatar.x > 2000 && this.avatar.x < 2300) {
            this.time.delayedCall(1000);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scene5', {
                        door: "scene3ToScene5"
                    });
                })
            })
        }
        //hidden door brings player to hidden location
        else if (this.keyZ.isDown && this.avatar.x > 2700 && this.avatar.x < 2900) {
            this.time.delayedCall(1000);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('scene4', {
                        door: "scene3ToScene4"
                    });
                })
            })
        }

    }
}