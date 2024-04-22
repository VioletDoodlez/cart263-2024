class Instructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'instructions'
        });
    }

    preload() {
        //load title image
        this.load.image('instructions', 'assets/images/instructions.PNG');
    }

    create() {
        //display title image
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let instructions = this.add.sprite(400, 300, 'instructions');

        //fades out when Z key is pressed
        this.input.keyboard.on('keydown-Z', event => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
        //starts game
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('play');
            })
        });
    }
}