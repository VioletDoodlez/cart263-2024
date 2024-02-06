/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

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
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();

    speechSynthesizer.speak('Please state your identity.');
}


/**
 * Description of draw()
*/
function draw() {

}

function handleSpeechInput() {
    currentSpeech = speechRecognizer.resultString;

    if (speechRecognizer.resultString.toLowerCase() === "ripley") {
        speechSynthesizer.speak('Welcome, Captain Ripley. I am sister. How may I help you?');
    }
    else {
        speechSynthesizer.speak('You are not authorized to view these files.');
    }

    if (speechRecognizer.resultString.toLowerCase() === "where are we") {
        speechSynthesizer.speak('We are current orbitting the dwarf planet known as RS-79.');
    }
    else if (speechRecognizer.resultString.toLowerCase() === "why are we here") {
        speechSynthesizer.speak('I am programmed to stop near planets that are suspected to contain alien life.');
    }
    if (speechRecognizer.resultString.toLowerCase() === "alien life") {
        speechSynthesizer.speak('The Wainright Atari corporation has made it their mission to know which planets are optimal for colonization.');
    }

    else {
        speechSynthesizer.speak('Can you repeat that, Captain?');
    }
}