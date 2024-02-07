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
        "command": /commander (.*)/,
        "callback": setGreeting
    },
    {
        "command": /who (.*)/,
        "callback": setMeeting
    },
    {
        "command": /where (.*)/,
        "callback": setLocation
    },
    {
        "command": /why (.*)/,
        "callback": setReason
    },
    {
        "command": /surely (.*)/,
        "callback": setSass
    }

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

    push();
    textSize(20);
    textAlign(CENTER);
    rectMode(CENTER);
    fill(0, 255, 0);
    text('SI/ST/UR', width / 2, height / 4);
    pop();

    if (subtitles != ``) {
        textSize(20);
        textAlign(CENTER);
        rectMode(CENTER);
        fill(0, 255, 0);
        text(subtitles, 35, 35, 35, 35);
    }

}

function removePunctuation(text) { //removes punctuations
    var punctuation = /[\.,?!]/g;
    var newText = text.replace(punctuation, "");
    return newText;
}

function handleCommand() {
    if (!speechRecognizer.resultValue) {
        return;
    }

    for (let command of commands) {
        let lowercase = removePunctuation(speechRecognizer.resultString.toLowerCase());
        let match = lowercase.match(command.command);
        console.log(match);
        if (match && match.length > 1) {
            command.callback(match);
        }
    }
}

function setGreeting(data) {
    if (data[1] === "ripley") {
        speechSynthesizer.speak('Welcome, Commander Ripley. How may I help you?');
    }
    else {
        setRejection();
    }
}

function setRejection() {
    speechSynthesizer.speak('You do not have the proper clearance to check these files. Please obtain proper authorization.');
}

function setLocation(data) {
    if (data[1] === "are we") {
        speechSynthesizer.speak('We are currently orbitting the dwarf planet known as RS-79.');
    }

}


function setMeeting(data) {
    if (data[1] === "are you" || data[1] === "is sister") {
        speechSynthesizer.speak('I am the control system for the Nostromo. I assist with navigation and data collection. You, Commander, have acces to my numerous files');
    }
    else if (data[1] === "is the cat" || data[1] === "is jonesy") {
        speechSynthesizer.speak('Jonsie is a cat residing on the Nostromo. According to the crew, he is the ships mascot.');
    }

}

function setReason(data) {
    if (data[1] === "are we here" || data[1] === "did we stop here") {
        speechSynthesizer.speak('I am programmed to stop near planets that are suspected to contain alien life.');
    }
}

function setSass(data) {
    if (data[1] === "you can't be serious" || data[1] === "you cannot be serious") {
        speechSynthesizer.speak('I am serious. And do not call me Shirley.');
    }
    else if (data[1] === "you must be joking" || data[1] === "you have to be joking") {
        speechSynthesizer.speak('I am not joking And do not call me Shirley.');
    }
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

