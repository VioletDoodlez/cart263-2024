/**
Slamina!
Nicole Covaliu

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const speechRecgnizer = new p5.SpeechRec();

const speechSynthesizer = new p5.speechSynthesizer();

const animals = {
    "description": "A list of common types of animals",
    "animals":
        [
            "aardvark",
            "alligator",
            "alpaca",
            "antelope",
            "ape",
            "armadillo",
            "baboon",
            "badger",
            "bat",
            "bear",
            "beaver",
            "bison",
            "boar",
            "buffalo",
            "bull",
            "camel",
            "canary",
            "capybara",
            "cat",
            "chameleon",
            "cheetah",
            "chimpanzee",
            "chinchilla",
            "chipmunk",
            "cougar",
            "cow",
            "coyote",
            "crocodile",
            "crow",
            "deer",
            "dingo",
            "dog",
            "donkey",
            "dromedary",
            "elephant",
            "elk",
            "ewe",
            "ferret",
            "finch",
            "fish",
            "fox",
            "frog",
            "gazelle",
            "gila monster",
            "giraffe",
            "gnu",
            "goat",
            "gopher",
            "gorilla",
            "grizzly bear",
            "ground hog",
            "guinea pig",
            "hamster",
            "hedgehog",
            "hippopotamus",
            "hog",
            "horse",
            "hyena",
            "ibex",
            "iguana",
            "impala",
            "jackal",
            "jaguar",
            "kangaroo",
            "koala",
            "lamb",
            "lemur",
            "leopard",
            "lion",
            "lizard",
            "llama",
            "lynx",
            "mandrill",
            "marmoset",
            "mink",
            "mole",
            "mongoose",
            "monkey",
            "moose",
            "mountain goat",
            "mouse",
            "mule",
            "muskrat",
            "mustang",
            "mynah bird",
            "newt",
            "ocelot",
            "opossum",
            "orangutan",
            "oryx",
            "otter",
            "ox",
            "panda",
            "panther",
            "parakeet",
            "parrot",
            "pig",
            "platypus",
            "polar bear",
            "porcupine",
            "porpoise",
            "prairie dog",
            "puma",
            "rabbit",
            "raccoon",
            "ram",
            "rat",
            "reindeer",
            "reptile",
            "rhinoceros",
            "salamander",
            "seal",
            "sheep",
            "shrew",
            "silver fox",
            "skunk",
            "sloth",
            "snake",
            "squirrel",
            "tapir",
            "tiger",
            "toad",
            "turtle",
            "walrus",
            "warthog",
            "weasel",
            "whale",
            "wildcat",
            "wolf",
            "wolverine",
            "wombat",
            "woodchuck",
            "yak",
            "zebra"
        ]
};

let currentAnimal = [];

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
    createCanvas(500, 500);


}


/**
Description of draw()
*/
function draw() {

}

function reverseString(string) {
    let characters = string.split(``);

    let reverseCharacters = characters.reverse();

    let result = reverseCharacters.join(``);

    return result;
}

function mousePressed() {
    currentAnimal = random(animals);

    let reverseAnimal = reverseString(currentAnimal);

    speechSynthesizer.speak(reverseAnimal);
}