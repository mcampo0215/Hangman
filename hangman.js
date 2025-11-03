var POSSIBLE_WORDS = ["obdurate", "defenestrate", "obsquious",
    "dissonant", "obdurate", "toady"];

var word = "";
var guesses = "";
var MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;
var gameStarted = false;

function newGame() {
    gameStarted = true;
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    updatePage();
}

//adds a clear to the input field on a guess
function clear() {
    var input = document.getElementById("guess")
    return input.value = "";
}

function guessLetter() {
    //no guessing until a word is chosen
    if (!gameStarted) {
        alert("You must start the game first");
        return;
    }

    var input = document.getElementById("guess");
    var letter = input.value;
    if (word.indexOf(letter) < 0) {
        guess_count--;
    }

    //don't let it guess previously guessed letters
    if (guesses.includes(letter)) {
        alert("You cannot use previously guessed letters!")
        clear();
        return;
    }

    guesses += letter;
    updatePage();
    input.value = "";
}

function updatePage() {
    var won = true;
    var clueString = "";
    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " ";
        }
        else {
            clueString += "_ ";
            won = false;
        }
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

    //dialog for winning a game
    if(won) {
        var winDialog = document.getElementById("guesses");
        winDialog.innerHTML = "You Won. Press new game to play again."
        //game finished - no more guesses
        gameStarted = false;
        return;
    }

    //dialog for losing a game
    if(guess_count <= 0) {
        var loseDialog = document.getElementById("guesses");
        loseDialog.innerHTML = "You Lost. Press new game to play again.";
        //game finished - no more guesses
        gameStarted = false;
        return;
    }
}