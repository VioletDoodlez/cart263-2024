class Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'title'
        });
    }

    preload() {
        //load title image
        this.load.image('title', 'assets/images/title.png');
    }

    create() {
        //display title image
        let title = this.add.sprite(400, 200, 'title');

        //display instructions
        let startText = this.add.text(275, 450, 'Press [Z] to begin.', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });


        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 1000,
            repeat: -1,
            onComplete: () => {
                this.tweens.add({
                    targets: startText,
                    alpha: 1,
                    duration: 1000,
                    repeat: -1,
                })
            }
        })


        //fades out when Z key is pressed
        this.input.keyboard.on('keydown-Z', event => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
        //starts game
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('instructions');
            })
        });
    }
}