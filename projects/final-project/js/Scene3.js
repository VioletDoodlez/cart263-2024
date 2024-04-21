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

        // display counter
        this.counter = this.physics.add.sprite(700, 240, 'counter');
        this.counter.setImmovable(true);

        // display knife holder
        this.knife = this.physics.add.sprite(700, 230, 'knife');
        this.knife.setImmovable(true);
        this.knife.play('knife');

        //display oven
        this.oven = this.physics.add.sprite(1200, 292, 'oven');
        this.oven.setImmovable(true);
        this.oven.play('cold');

        //display cupboard
        this.cupboard = this.physics.add.sprite(1700, 292, 'cupboard');
        this.cupboard.setImmovable(true);
        this.cupboard.play('shut');

        //displays avatar sprite in idle animation
        this.avatar = this.physics.add.sprite(200, 400, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.play(`idle`);
        this.avatar.hasFire = false;
        this.avatar.hasCheese = false;
        this.avatar.hasEarth = true;
        this.avatar.hasMouse = false;

        this.mouse = this.physics.add.sprite(1200, 530, 'mouse');
        this.mouse.alpha = 0;

        this.plant = this.physics.add.sprite(2100, 450, `plant`);
        this.plant.setImmovable(true);
        this.collider = this.physics.add.collider(this.avatar, this.plant);
        this.plant.play('sprout');


        //creates camera that follows avatar as they move
        this.cameras.main.startFollow(this.avatar, true, 1, 1);
        this.cameras.main.setBounds(0, 0, this.width, this.height);

        //calls arrow keys, A key and Z key
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
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

        let coldAnimationConfig = {
            key: 'cold',
            frames: this.anims.generateFrameNumbers('oven', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(coldAnimationConfig);

        //cupboard is open (right)
        let hotAnimationConfig = {

            key: 'hot',
            frames: this.anims.generateFrameNumbers('oven', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(hotAnimationConfig);

        let runAnimationConfig = {

            key: 'run',
            frames: this.anims.generateFrameNumbers('mouse', {

                start: 0,
                end: 1

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(runAnimationConfig);

        let eatAnimationConfig = {

            key: 'eat',
            frames: this.anims.generateFrameNumbers('mouse', {

                start: 2,
                end: 3

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(eatAnimationConfig);


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

        let knifeAnimationConfig = {
            key: 'knife',
            frames: this.anims.generateFrameNumbers('knife', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(knifeAnimationConfig);

        //cupboard is open (right)
        let takeoneAnimationConfig = {

            key: 'takeone',
            frames: this.anims.generateFrameNumbers('knife', {

                start: 1,
                end: 2

            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(takeoneAnimationConfig);

        let sproutAnimationConfig = {
            key: 'sprout',
            frames: this.anims.generateFrameNumbers('plant', {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(sproutAnimationConfig);

        let grownAnimationConfig = {
            key: 'grown',
            frames: this.anims.generateFrameNumbers('plant', {
                start: 1,
                end: 2
            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(grownAnimationConfig);

        let chompAnimationConfig = {
            key: 'chomp',
            frames: this.anims.generateFrameNumbers('plant', {
                start: 3,
                end: 4
            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(chompAnimationConfig);
    }

    //collect fire spell page
    collectSpell(avatar, fire) {
        avatar.hasFire = true;
        fire.destroy();

        this.firetext = this.add.text(this.avatar.x - 90, this.avatar.y - 100, 'Found the Fire spell page!', {
            fill: '#000000',
            align: 'center'
        });
        this.firetext.alpha = 0;
    }

    //collect cheese
    collectCheese(avatar, cheese) {
        avatar.hasCheese = true;
        cheese.destroy();

        this.cheesetext = this.add.text(this.avatar.x - 90, this.avatar.y - 100, 'Got the cheese!', {
            fill: '#000000',
            align: 'center'
        });
        this.cheesetext.alpha = 0;

    }

    //collect mouse
    collectMouse(avatar, mouse) {
        avatar.hasMouse = true;
        mouse.destroy();

        this.mousetext = this.add.text(this.avatar.x - 90, this.avatar.y - 100, 'Got the mouse!', {
            fill: '#000000',
            align: 'center'
        });
        this.mousetext.alpha = 0;
    }

    //collect key
    collectItem(avatar, key) {
        avatar.hasKey = true;
        key.destroy();

        // displays message
        this.keytext = this.add.text(this.avatar.x - 90, this.avatar.y - 100, 'Got the key!', {
            fill: '#000000',
            align: 'center'
        });
        this.keytext.alpha = 0;

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

        if (this.avatar.hasFire === true) {
            this.tweens.add({
                targets: this.firetext,
                alpha: 1,
                duration: 1000,
                repeat: 0,
                onComplete: () => {
                    this.tweens.add({
                        targets: this.firetext,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                    })
                }
            })
        }

        if (this.avatar.hasCheese === true) {
            this.tweens.add({
                targets: this.cheesetext,
                alpha: 1,
                duration: 1000,
                repeat: 0,
                onComplete: () => {
                    this.tweens.add({
                        targets: this.cheesetext,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                    })
                }
            })
        }

        if (this.avatar.hasMouse === true) {
            this.tweens.add({
                targets: this.mousetext,
                alpha: 1,
                duration: 1000,
                repeat: 0,
                onComplete: () => {
                    this.tweens.add({
                        targets: this.mousetext,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                    })
                }
            })
        }

        if (this.avatar.hasKey === true) {
            this.tweens.add({
                targets: this.keytext,
                alpha: 1,
                duration: 1000,
                repeat: 0,
                onComplete: () => {
                    this.tweens.add({
                        targets: this.keytext,
                        alpha: 0,
                        duration: 500,
                        repeat: 0,
                    })
                }
            })
        }

        //fire spell used when player is near box AND has collected spell page, oven turns on
        if (this.keyX.isDown && this.avatar.x > 1000 && this.avatar.x < 1400 && this.avatar.hasFire === true) {
            this.oven.play('hot', true);

            this.mouse.play('run', true);
            this.mouse.alpha = 100;
            this.mouse.setVelocityX(-100);

            this.mouse.isScared = true;
        }
        else if (this.keyX.isDown && this.avatar.x > 1600 && this.avatar.x < 2000 && this.avatar.hasEarth === true) {
            this.plant.play('grown', true);
        }

        if (this.mouse.x < 1100) {
            this.mouse.setVelocityX(100);
            this.mouse.flipX = true;
        }
        else if (this.mouse.x > 1300) {
            this.mouse.setVelocityX(-100);
            this.mouse.flipX = false;
        }

        //take knife (optional)
        if (this.keyZ.isDown && this.avatar.x >= 650 && this.avatar.x <= 750) {
            this.knife.play('takeone', true);
            this.avatar.setCollideWorldBounds(false);
            this.cameras.main.setBounds(0, 0, this.width * 4, this.height);
        }
        //open cupboard
        else if (!this.avatar.hasCheese && this.keyZ.isDown && this.avatar.x > 1600 && this.avatar.x < 2000) {
            this.cupboard.play('openright', true);
            this.cupboard.openright = true;

            this.cheese = this.physics.add.sprite(1800, 410, 'cheese');
            this.physics.add.overlap(this.avatar, this.cheese, this.collectCheese, null, this);

            if (this.cupboard.openleft === true) {
                this.cupboard.play('openall', true);

                if (!this.avatar.hasFire === true) {
                    this.fire = this.physics.add.sprite(1700, 410, 'fire');
                    this.physics.add.overlap(this.avatar, this.fire, this.collectSpell, null, this);
                }
            }
        }
        else if (this.keyZ.isDown && this.avatar.x > 1300 && this.avatar.x < 1600) {
            this.cupboard.play('openleft', true);
            this.cupboard.openleft = true;

            this.fire = this.physics.add.sprite(1600, 410, 'fire');
            this.physics.add.overlap(this.avatar, this.fire, this.collectSpell, null, this);

            if (this.cupboard.openright === true) {
                this.cupboard.play('openall', true);

                if (!this.avatar.hasCheese) {
                    this.cheese = this.physics.add.sprite(1800, 410, 'cheese');
                    this.physics.add.overlap(this.avatar, this.cheese, this.collectCheese, null, this);
                }
            }
        }
        else if (this.keyZ.isDown && this.avatar.x >= 1000 && this.avatar.x <= 1400 && this.avatar.hasCheese === true && this.mouse.isScared === true) {

            this.mouse.setVelocityX(0);
            this.mouse.play('eat', true);
            this.mouse.isScared = false;

            if (this.mouse.isScared === false) {
                this.physics.add.overlap(this.avatar, this.mouse, this.collectMouse, null, this);
            }

        }
        else if (!this.avatar.hasKey === true && this.keyZ.isDown && this.avatar.x > 1600 && this.avatar.x < 2000 && this.avatar.hasMouse === true) {
            this.plant.play('chomp', true);
            this.physics.world.removeCollider(this.collider);

            this.key = this.physics.add.sprite(2300, 530, 'key');
            this.physics.add.overlap(this.avatar, this.key, this.collectItem, null, this);
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

        //brings player to final room
        else if (this.keyZ.isDown && this.avatar.x > 2000 && this.avatar.x < 2300 && this.avatar.hasKey === true) {
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