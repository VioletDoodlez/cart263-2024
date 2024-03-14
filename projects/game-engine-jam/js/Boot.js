class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        this.load.image('bg', 'assets/images/bg-01.png');

        this.load.spritesheet('avatar', 'assets/images/philia-walk-sheet-01.png', {
            margin: 100,
            spacing: 200,
            frameWidth: 200,
            frameHeight: 300,
            endFrame: 7
        });

        this.load.spritesheet('box', 'assets/images/box-sheet.png', {
            frameWidth: 300,
            frameHeight: 300,
            endFrame: 2
        })

        this.load.image('key', 'assets/images/key-01.png');

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

