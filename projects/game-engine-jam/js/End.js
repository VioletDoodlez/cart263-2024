class End extends Phaser.Scene {
    constructor() {
        super({
            key: 'end'
        });
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        let endText = this.add.text(200, 300, 'Thank you for playing!', {
            fontFamily: 'american-typewriter',
            fontSize: '50px',
            fill: '#ffffff',
            align: 'center'
        });
    }
}