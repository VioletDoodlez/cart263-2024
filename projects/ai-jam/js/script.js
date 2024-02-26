/**
 * AI Jam
 * Nicole Covaliu
 * 
 * Object recognition game where the player must guess what the 
 */

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

let objects = [
    {
        label: "cell phone",
        description: "Communication box",
        found: false
    },
    // {
    //     label: "keyboard",
    //     description: "Machine communicatior",
    // found: false
    // },
    // {
    //     label: "mouse",
    //     description: "Machine animal",
    // found: false
    // },
    {
        label: "bottle",
        description: "Liquid tube",
        found: false
    },
    // {
    //     label: "cup",
    //     description: "Liquid holder",
    // found: false
    // },
    // {
    //     label: "bowl",
    //     description: "Food retainer",
    // found: false
    // },
    // {
    //     label: "spoon",
    //     description: "Scooping device",
    // found: false
    // },
    // {
    //     label: "fork",
    //     description: "Stabbing device",
    // found: false
    // },
    // {
    //     label: "knife",
    //     description: "Slicing device",
    // found: false
    // },
    // {
    //     label: "apple",
    //     description: "Red food-ball",
    // found: false
    // },
    // {
    //     label: "banana",
    //     description: "Yellow food-tube",
    // found: false
    // },
    {
        label: "book",
        description: "Keeper of Knowledge",
        found: false
    },
    {
        label: "scissors",
        description: "Separator",
        found: false
    },
    // {
    //     label: "teddy bear",
    //     description: "Fake animal",
    // found: false

    // },
    // {
    //     label: "toothbrush",
    //     description: "Tusk cleaner",
    // found: false
    // },
];

// list of objects to find
let currentObject1 = undefined;
let currentObject2 = undefined;
let currentObject3 = undefined;

let alpha = 255;

/**
Starts the webcam and the ObjectDetector
*/
function setup() {
    createCanvas(640, 480);

    // Start webcam and hide the resulting HTML element

    video = createCapture(VIDEO, videoReady);
    video.hide();

    // Start the CocoSsd model and when it's ready start detection
    // and switch to the running state

    currentObject1 = random(objects);
    currentObject2 = random(objects);
    currentObject3 = random(objects);

    if (currentObject1 === currentObject2 || currentObject1 === currentObject3 || currentObject3 === currentObject2) {
        currentObject1 = random(objects);
        currentObject2 = random(objects);
        currentObject3 = random(objects);
    }
}

function videoReady() {

    cocossd = ml5.objectDetector('cocossd', {}, function () {
        // Ask CocoSsd to start detecting objects, calls gotResults
        // if it finds something
        cocossd.detect(video, gotResults);
        // Switch to the running state
        state = `running`;
    });

}

/**
Called when CocoSsd has detected at least one object in the video feed
*/
function gotResults(err, results) {
    // If there's an error, report it
    if (err) {
        console.error(err);
    }
    // Otherwise, save the results into our predictions array
    else {
        predictions = results;
    }
    // Ask CocoSsd to detect objects again so it's continuous
    cocossd.detect(video, gotResults);
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
    if (state === `loading`) {
        loading();
    }
    else if (state === `running`) {
        running();
    }
    else if (state === `end`) {
        end();
    }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
    background(255);

    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`Loading ${modelName}...`, width / 2, height / 2);
    pop();
}

/**
Displays the webcam.
If there are currently objects detected it outlines them and labels them
with the name and confidence value.
*/

function running() {

    // Display the webcam
    image(video, 0, 0, width, height);

    // Display list
    push();
    textSize(22);
    textStyle(BOLD);
    textAlign(TOP, LEFT);
    fill(0)
    text(`Find:`, width / 5 - 75, height / 5 - 70);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    if (currentObject1.found) {
        fill(0, 255, 0); // text colour changes green if found
    }
    else {
        fill(255, 0, 0);
    }
    text(currentObject1.description, width / 5 - 75, height / 5 - 50);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    if (currentObject2.found) {
        fill(0, 255, 0); // text colour changes green if found
    }
    else {
        fill(255, 0, 0);
    }
    text(currentObject2.description, width / 5 - 75, height / 5 - 30);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    if (currentObject3.found) {
        fill(0, 255, 0); // text colour changes green if found
    }
    else {
        fill(255, 0, 0);
    }
    text(currentObject3.description, width / 5 - 75, height / 5 - 10);
    pop();

    rectMode(CORNER);
    noStroke();
    fill(0, 0, 0, alpha);
    rect(290, 130, 350, 350);

    push();
    textSize(22);
    textStyle(BOLD);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`Greeting Human!`, 465, 150);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`We are what you call "extraterrestrials" and we need help!`, 465, 180);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`We are researching your planet and`, 465, 220);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`we need to know how certain objects look.`, 465, 240)
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`A list of objects are at the top left corner of your screen.`, 465, 280);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`Find these objects in your residence and `, 465, 320);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`show them to your device's camera.`, 465, 340)
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`BE WARNED: We don't know the objects' proper names!`, 465, 380);
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`You'll have to guess.`, 465, 400)
    pop();

    push();
    textSize(12);
    fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER);
    text(`(click to remove)`, 465, 440);
    pop();

    // Check if there currently predictions to display
    if (predictions) {
        // If so run through the array of predictions
        for (let i = 0; i < predictions.length; i++) {
            // Get the object predicted
            let object = predictions[i];
            // Highlight it on the canvas
            if (predictions[i].label !== "person" && predictions[i].confidence >= 0.6) {
                highlightObject(object);
            }
            if (predictions[i].label === currentObject1.label) {
                currentObject1.found = true;
            }

            if (predictions[i].label === currentObject2.label) {
                currentObject2.found = true;
            }

            if (predictions[i].label === currentObject3.label) {
                currentObject3.found = true;
            }

            if (currentObject1.found && currentObject2.found && currentObject3.found) {
                state = `end`;
            }
        }
    }
}

function end() {
    background(0);

    push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255);
    text(`You found all the objects!`, width / 2, height / 2);
    pop();

    push();
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255);
    text(`Thank you! Now all we need is a live human!`, width / 2, height / 2 + 42);
    pop();
}

/**
Provided with a detected object it draws a box around it and includes its
label and confidence value
*/
function highlightObject(object) {
    // Display a box around it
    push();
    noFill();
    stroke(255, 255, 0);
    rect(object.x, object.y, object.width, object.height);
    pop();
    // Display the label and confidence in the center of the box
    push();
    textSize(18);
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
    pop();
}

function mousePressed() {
    let d = dist(415, 200, mouseX, mouseY)
    if (d < 350) {
        alpha = alpha - 255;
    }
}
