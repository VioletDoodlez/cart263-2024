class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        this.load.image('wall', 'assets/images/wall.png');
        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {
        let loadingTextStyle = {
            fontFamily: 'sans-serif',
            fontSize: '40px',
            fill: '#ffffff',
            align: 'center'
        };
        let loadingString = 'Loading...';
        this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

        this.scene.start('play');
    }

    update() {

    }
}

