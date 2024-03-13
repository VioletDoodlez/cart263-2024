class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        this.load.image('bg', 'assets/images/bg-01.png');

        this.load.spritesheet('avatar', 'assets/images/philia-walk-sheet-01.png', {
            frameWidth: 400,
            frameHeight: 400,
            endFrame: 7
        });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {
        // let loadingTextStyle = {
        //     fontFamily: 'sans-serif',
        //     fontSize: '40px',
        //     fill: '#ffffff',
        //     align: 'center'
        // };
        // let loadingString = 'Loading...';
        // this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

        // this.scene.start('play');
    }

    update() {

    }
}

