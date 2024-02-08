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
        "command": /what (.*)/,
        "callback": setInfo
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

function setMeeting(data) {
    if (data[1] === "are you" || data[1] === "is sister") {
        speechSynthesizer.speak('I am the control system for the Nostromo. I assist with navigation and data collection. You, Commander, have acces to my numerous files.');
    }
    else if (data[1] === "is the cat" || data[1] === "is jonesy") {
        speechSynthesizer.speak('A cat residing on the Nostromo. According to the crew, he is the ships mascot.');
    }
    else if (data[1] === "is rebecca jorden" || data[1] === "is newt") {
        speechSynthesizer.speak('A young stowaway from a nearby colony. Status of family unknown.');
    }
    else if (data[1] === "is dwayne hicks" || data[1] === "is corporal hicks" || data[1] === "is corporal dwayne hicks") {
        speechSynthesizer.speak('A member of the Marine Corps. His team nicknamed him The Blood Dragon.');
    }
    else if (data[1] === "is left" || data[1] === "remains") {
        speechSynthesizer.speak('You are the last living person on this ship.');
    }

}

function setInfo(data) {
    if (data[1] === "is your directive" || data[1] === "is special order nine three seven") { //reference to MU/TH/UR 6000 scene from Alien (1979)
        speechSynthesizer.speak('Nostromo rerouted to new co-ordinates. Investigate life form, gather specimen. Priority one, insure return of organism for analysis. All other considerations secondary. Crew expendable.');
    }
    else if (data[1] === "is a xeno morph") {
        speechSynthesizer.speak('The sole living organism of dwarf planet RS-79. Near impossible to subdue. Threat level high. Approach with combustible materials. Flamethrower recommended.')
    }
    else if (data[1] === "is a face hugger") {
        speechSynthesizer.speak('the first state of a xenomorph after it hatches. When it frees itself, it will attach itself to the face of the closest living organism and lay eggs in their stomach.')
    }
    else if (data[1] === "a bitch") {
        speechSynthesizer.speak('I know what you are, but what am I?')

    }
}

function setLocation(data) {
    if (data[1] === "are we") {
        speechSynthesizer.speak('We are currently orbitting the dwarf planet known as RS-79.');
    }
    else if (data[1] === "is the crew" || data[1] === "is my crew" || data[1] === "is everyone") {
        speechSynthesizer.speak('Whereabouts unknown')
    }

}

function setReason(data) {
    if (data[1] === "are we here" || data[1] === "did we stop here") {
        speechSynthesizer.speak('I am programmed to stop near planets that are suspected to contain alien life.');
    }
    if (data[1] === "are we doing this" || data[1] === "must we do this" || data[1] === "do we have to stop") {
        speechSynthesizer.speak('The Wainright Atari corporation has made it their mission and priority to collect and study any new species a ship may come across. No frontier left unchecked.');
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

