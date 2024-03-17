class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {
        this.load.image('bg', 'assets/images/bg.png');

        this.load.spritesheet('frames', 'assets/images/frames-sheet.png', {
            frameWidth: 200,
            frameHeight: 200,
            endFrame: 2
        })

        this.load.spritesheet('avatar', 'assets/images/philia-walk-sheet-01.png', {
            margin: 100,
            spacing: 200,
            frameWidth: 200,
            frameHeight: 300,
            endFrame: 7
        });

        this.load.spritesheet('cat', 'assets/images/inky-sheet.png', {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 8
        });


        this.load.spritesheet('box', 'assets/images/box-sheet.png', {
            frameWidth: 300,
            frameHeight: 300,
            endFrame: 2
        })

        this.load.spritesheet('table', 'assets/images/table-sheet.png', {
            frameWidth: 200,
            frameHeight: 200,
            endFrame: 2
        })

        this.load.image('key', 'assets/images/key-01.png');
        this.load.image('fire', 'assets/images/fire.png')

        this.load.image('door', 'assets/images/door.png')

        this.load.on(`complete`, () => {
            this.scene.start(`title`);
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

