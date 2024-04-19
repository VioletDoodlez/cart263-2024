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
        let missionText = this.add.text(220, 400, 'Help Philia find her cat', {
            fontFamily: 'american-typewriter',
            fontSize: '40px',
            fill: '#ffffff',
            align: 'center'
        });

        let moveText = this.add.text(200, 450, 'Use the left and right arrow keys to explore the house', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        let fireText = this.add.text(220, 490, 'Press [A] to use a fire spell if your path is blocked', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        let earthText = this.add.text(160, 530, 'Press [S] to use an earth spell to move objects marked with an X', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        let interractText = this.add.text(240, 570, 'Press [Z] to continue/interract with objects', {
            fontFamily: 'american-typewriter',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center'
        });

        //fades out when Z key is pressed
        this.input.keyboard.on('keydown-Z', event => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        });
        //starts game
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('scene3');
            })
        });
    }
}