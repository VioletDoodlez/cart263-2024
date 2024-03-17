class Title extends Phaser.Scene {
    constructor() {
        super({
            key: 'title'
        });
    }

    create() {
        let titleTextStyle = this.add.text(270, 370, 'Help Philia find her cat', {
            fontFamily: 'american-typewriter',
            fontSize: '30px',
            fill: '#ffffff',
            align: 'center'
        });

        let moveTextStyle = this.add.text(200, 420, 'Use the left and right arrow keys to explore the house', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        let interractTextStyle = this.add.text(270, 460, 'Press [Z] to interract with objects', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        let fireTextStyle = this.add.text(220, 500, 'Press [A] to use a fire spell if your path is blocked', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });


        this.input.keyboard.on('keydown-Z', event => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('play');
            })
        });
    }
}