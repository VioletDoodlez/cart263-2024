/**
 * AI Jam
 * Nicole Covaliu
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
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
        description: "Communication box"
    },
    // {
    //     label: "keyboard",
    //     description: "Machine communicatior"
    // },
    // {
    //     label: "mouse",
    //     description: "Machine animal"
    // },
    {
        label: "bottle",
        description: "Liquid tube"
    },
    // {
    //     label: "cup",
    //     description: "Liquid holder"
    // },
    // {
    //     label: "bowl",
    //     description: "Food retainer"
    // },
    // {
    //     label: "spoon",
    //     description: "Scooping device"
    // },
    // {
    //     label: "fork",
    //     description: "Stabbing device"
    // },
    // {
    //     label: "knife",
    //     description: "Slicing device"
    // },
    // {
    //     label: "apple",
    //     description: "Red food-ball"
    // },
    // {
    //     label: "banana",
    //     description: "Yellow food-tube"
    // },
    {
        label: "book",
        description: "Keeper of Knowledge"
    },
    {
        label: "scissors",
        description: "Separator"
    },
    // {
    //     label: "teddy bear",
    //     description: "Fake animal"
    // },
    // {
    //     label: "toothbrush",
    //     description: "Tusk cleaner"
    // },
];

let currentObject1 = undefined;
let currentObject2 = undefined;
let currentObject3 = undefined;

let desc = {
    fill: {
        r1: 255,
        g1: 0,
        r2: 255,
        g2: 0,
        r3: 255,
        g3: 0,
        b: 0,
    }
}

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

    push();
    textSize(22);
    textStyle(BOLD);
    textAlign(TOP, LEFT);
    text(`Find:`, width / 5 - 75, height / 5 - 70);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    fill(desc.fill.r1, desc.fill.g1, desc.fill.b)
    text(currentObject1.description, width / 5 - 75, height / 5 - 50);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    fill(desc.fill.r2, desc.fill.g2, desc.fill.b)
    text(currentObject2.description, width / 5 - 75, height / 5 - 30);
    pop();

    push();
    textSize(22);
    textAlign(TOP, LEFT);
    fill(desc.fill.r3, desc.fill.g3, desc.fill.b)
    text(currentObject3.description, width / 5 - 75, height / 5 - 10);
    pop();

    // rectMode(CORNER);
    // fill(0);
    // rect(440, 280, 200, 200);

    // push();
    // textSize(22);
    // textStyle(BOLD);
    // fill(255);
    // textAlign(TOP, LEFT);
    // text(`Find:`, 440, 280);
    // pop();


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
                desc.fill.r1 = desc.fill.r1 - 255;
                desc.fill.g1 = desc.fill.g1 + 255;
            }

            if (predictions[i].label === currentObject2.label) {
                desc.fill.r2 = desc.fill.r2 - 255;
                desc.fill.g2 = desc.fill.g2 + 255;
            }

            if (predictions[i].label === currentObject3.label) {
                desc.fill.r3 = desc.fill.r3 - 255;
                desc.fill.g3 = desc.fill.g3 + 255;
            }

            if (desc.fill.g1 === 255 && desc.fill.g2 === 255 && desc.fill.g3 === 255) {
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
    text(`You found all the objects!`, width / 2, height / 2);
    pop();

    push();
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`Thank you! Now all we need is a live human!`, width / 2, height / 2);
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

// function mousePressed() {
//
// }
