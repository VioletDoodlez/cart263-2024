class GoodEnd extends Phaser.Scene {
    constructor() {
        super({
            key: 'good'
        });
    }

    preload() {
        //load end image
        this.load.image('goodend', 'assets/images/goodend.PNG');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //display end image
        let good = this.add.sprite(400, 300, 'goodend');

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