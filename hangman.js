var POSSIBLE_WORDS = ["obdurate", "defenestrate", "obsquious",
    "dissonant", "obdurate", "toady"];

var word = "";
var guesses = "";
var MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;
var gameStarted = false;
var gameFinished = false;

function newGame() {
    gameStarted = true;
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    updatePage();
}

function guessLetter() {
    if (!gameStarted) {
        alert("You must start the game first");
        return;
    }

    //guesses dont work until user starts a new game
    if(guess_count <= 0) {
        alert("You lost. Press new game to play again.");
        return;
    }

  

    var input = document.getElementById("guess");
    var letter = input.value;
    if (word.indexOf(letter) < 0) {
        guess_count--;
    }
    //don't let it guess previously
    if (guesses.includes(letter)) {
        alert("You cannot use previously guessed letters!")
        return;
    }

    //game ends once user runs out of guesses
    if (guess_count <= 0) {
        alert("Game Over");
        updatePage();
        return;
    }
    guesses += letter;
    updatePage();
    input.value = "";
}

function updatePage() {
    var clueString = "";
    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " ";
        }
        else
            clueString += "_ ";
    }
    //update clue string
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;
    //update guesses from user
    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters: " + guesses;
    //update image
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman" + guess_count + ".gif";

}