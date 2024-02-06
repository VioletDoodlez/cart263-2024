/**
 * Voices Jam
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

const commands = [

    {
        "command": /where are we (.*)/,
        "callback": setLocation
    },
    // {
    //     "command": /why are we here (.*)/,
    //     "callback": setReason
    // },
    // {
    //     "command": /alien life(.*)/,
    //     "callback": setExaplination
    // }
];

let subtitles = '';
let lastFinishedSpeaking = 0;

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

let currentSpeech = '';

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500, 500);

    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleCommand;
    speechRecognizer.start();

    speechSynthesizer.speak('Please state your identity.');

    speechSynthesizer.onEnd = () => {
        setTimeout(() => {
            lastFinishedSpeaking = millis();
            subtitles = ``;
        }, 500);
    };
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    if (subtitles != ``) {
        textSize(20);
        textAlign(CENTER);
        rectMode(CENTER);
        fill(0, 255, 0);
        text(subtitles, 35, 35, 35, 35);
    }

}

function handleCommand() {
    if (!speechRecognizer.resultValue) {
        return;
    }

    for (let command of commands) {
        let lowercase = speechRecognizer.resultString.toLowerCase();
        let match = lowercase.match(command.command);
        console.log(match);
        if (match && match.length > 1) {
            command.callback(match);
        }
    }
}

function setLocation(data) {
    if (data[1] === "computer") {
        speechSynthesizer.speak('We are currently orbitting the dwarf planet known as RS-79.');
    }

}

function displayLocation() {
    push();

    pop();
}

// function handleSpeechInput() {
//     console.log(speechRecognizer.resultString.toLowerCase());

//     if (speechRecognizer.resultString.toLowerCase() === "ripley") {
//         speechSynthesizer.speak('Welcome, Captain Ripley. I am sister. How may I help you?');
//     }
//     // else {
//     //     speechSynthesizer.speak('You are not authorized to view these files.');
//     // }

//     // if (speechRecognizer.resultString.toLowerCase() === "where are we") {
//     //     speechSynthesizer.speak('We are current orbitting the dwarf planet known as RS-79.');
//     // }
//     else if (speechRecognizer.resultString.toLowerCase() === "why are we here") {
//         speechSynthesizer.speak('I am programmed to stop near planets that are suspected to contain alien life.');
//     }
//     else if (speechRecognizer.resultString.toLowerCase() === "alien life") {
//         speechSynthesizer.speak('The Wainright Atari corporation has made it their mission to know which planets are optimal for colonization.');
//     }
//     else if (speechRecognizer.resultString.toLowerCase() === "surely you can't be serious") {
//         speechSynthesizer.speak('I am serious. And do not call me Shirley.');
//     }

//     // else {
//     //     speechSynthesizer.speak('Can you repeat that, Captain?');
//     // }
// }

