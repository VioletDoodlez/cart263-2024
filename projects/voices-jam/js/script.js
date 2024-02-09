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
    createCanvas(windowWidth, windowHeight);

    //subtitles appear only when computer speaks
    speechSynthesizer.onEnd = () => {
        setTimeout(() => {
            lastFinishedSpeaking = millis();
            subtitles = '';
        }, 500);
    };

    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleCommand;
    speechRecognizer.start();

    speechSynthesizer.speak('Please state your identity.');
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    //include title at the top of the screen
    push();
    textSize(50);
    textAlign(CENTER);
    rectMode(CENTER);
    fill(0, 255, 0);
    text('SI/ST/UR', width / 2, height / 4);
    pop();

    //include subtitles at the center of the screen
    if (subtitles != '') {
        textSize(30);
        textAlign(CENTER);
        rectMode(CENTER);
        fill(0, 255, 0);
        text(subtitles, width / 2, height / 2);
    }

    // instructions, meant to be subtle
    push();
    textSize(15);
    textAlign(LEFT);
    fill(0, 255, 0);
    text('Ask SI/ST/UR:', width - 1450, height - 100);
    text('WHO (Jonesy, Newt, Dwayne Hicks, SI/ST/UR)', width - 1450, height - 80);
    text('WHAT (directives, Nostromos, face hugger, Xenomorph)', width - 1450, height - 60);
    text('WHERE (you are, the crew)', width - 1450, height - 40);
    text('WHY (here, doing this)', width - 1450, height - 20);
    pop();
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
        say('Welcome, Commander Ripley. How may I help you?'); //refernence to Alien franchise main character
    }
    else {
        setRejection();
    }
}

function setRejection() { //refuse access to other names (just for show)
    say('You do not have the proper clearance to check these files. \n Please obtain proper authorization.');
}

function setMeeting(data) { //responds to questions starting with "why"
    if (data[1] === "are you" || data[1] === "is sister") {
        say('I am SI/ST/UR, the control system for the Nostromo. I assist with navigation and data collection. \n You, Commander, have acces to my numerous files. \n Just ask me who, what, where or why.');
    }
    else if (data[1] === "is the cat" || data[1] === "is jonesy") { //reference to cat from Alien(1979)
        say('A cat residing on the Nostromo. \nAccording to the crew, he is the ships mascot.');
    }
    else if (data[1] === "is rebecca jorden" || data[1] === "is newt") { //reference to character from Aliens(1986)
        say('A young stowaway from a nearby colony. \nStatus of family unknown.');
    }
    else if (data[1] === "is dwayne hicks" || data[1] === "is corporal hicks" || data[1] === "is corporal dwayne hicks") { //reference to character from Aliens(1986)
        say('A member of the Marine Corps. \nHis team nicknamed him The Blood Dragon.');
    }
    else if (data[1] === "is left" || data[1] === "remains") {
        say('You are the last living person on this ship.');
    }

}

function setInfo(data) { //responds to questions starting with "what"
    if (data[1] === "is your directive" || data[1] === "are your directives" || data[1] === "is special order nine three seven") { //reference to MU/TH/UR 6000 scene from Alien (1979)
        say('Nostromo rerouted to new co-ordinates. \nInvestigate life form, gather specimen. \nPriority one, insure return of organism for analysis. \nAll other considerations secondary. \nCrew expendable.');
    }
    else if (data[1] === "is a xeno morph") {
        say('The sole living organism of dwarf planet RS-79. \nNear impossible to subdue. Threat level high. \nApproach with combustible materials. Flamethrower recommended.')
    }
    else if (data[1] === "is a face hugger") {
        say('The first stage of a xenomorph. \nWhen hatched, it will attach itself to the face of the closest living organism and lay eggs in their stomach.')
    }
    else if (data[1] === "is the nostromo") {
        say('The Nostromo is the ship you are currently on, carrying 20 million tons of mineral ore'); //title card reference from Alien (1979)
    }
}

function setLocation(data) { //responds to questions starting with "where"
    if (data[1] === "are we") {
        say('We are currently orbitting the dwarf planet known as RS-79.');
    }
    else if (data[1] === "is the crew" || data[1] === "is my crew" || data[1] === "is everyone") {
        say('Whereabouts unknown')
    }

}

function setReason(data) { //responds to questions starting with "why"
    if (data[1] === "are we here" || data[1] === "did we stop here") {
        say('I am programmed to stop near planets that are suspected to contain alien life.');
    }
    if (data[1] === "are we doing this" || data[1] === "must we do this" || data[1] === "do we have to stop") {
        say('The Wainright Atari corporation has made it their mission and priority to collect and study any new species a ship may come across. \nNo frontier left unchecked.');
    }
}

function setSass(data) { //responds to questions starting with "surely", hidden reference to Airplane (1980)
    if (data[1] === "you can't be serious" || data[1] === "you cannot be serious") {
        say('I am serious. And do not call me Shirley.');
    }
    else if (data[1] === "you must be joking" || data[1] === "you have to be joking") {
        say('I am not joking. And do not call me Shirley.');
    }
}

function onResult() {

    let data = speechRecognizer.resultJSON;
    console.log(data);

    if (data.timeStamp - lastFinishedSpeaking < 200 || !voiceRecognizer.resultValue || voiceRecognizer.resultString === ``) {
        return;
    }
}

function say(text) {
    setTimeout(() => {
        speechSynthesizer.speak(text);
        subtitles = text;
    }, 1000)
}