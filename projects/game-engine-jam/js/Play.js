class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'play'
        });
    }

    create() {
        let style = {
            fontFamily: 'sans-serif',
            fontSize: '40px',
            fill: '#ffffff',
        };

        let gameDescription = 'Think of a number.';

        this.gameText = this.add.text(100, 100, gameDescription, style);
    }

    update() {

    }
}


