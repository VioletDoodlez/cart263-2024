class BadEnd extends Phaser.Scene {
    constructor() {
        super({
            key: 'bad'
        });
    }

    preload() {
        //load end image
        this.load.image('badend', 'assets/images/badend.PNG');
    }

    create() {
        //display end image
        let bad = this.add.sprite(400, 300, 'badend');

        //fades out when Z key is pressed
        this.input.keyboard.on('keydown-Z', event => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
        //end message
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('end');
            })
        });
    }
}