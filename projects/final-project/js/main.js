/**
 * Game Engine Jam
 * Nicole Covaliu
 * 
 * Sidescrolling adventure game where the player collects items to progress to the next room.
 * The game counld break the fourth wall.
 */

"use strict";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
    },
    scene: [Boot, Title, Instructions, Play, Scene2, Scene3, Scene4, Scene5, GoodEnd, BadEnd, End]
};

let game = new Phaser.Game(config);

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

}


/**
 * Description of draw()
*/
function draw() {

}