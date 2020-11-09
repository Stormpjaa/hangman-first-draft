window.addEventListener("load", init);
const container = document.querySelector("#container");
const lettersInDOM = document.querySelector("#letters");
const attemptInDOM = document.querySelector("#attempt");
const keyboard = document.querySelector("#keyboard");
let attempts = 5;
let word = "hangman first draft";
let lettersInWord = [];
let guessedLettersInWord = [];
function init() {
    writeAlphabetToTheDom();
    lettersInWord = word.split("");
    for (let i = 0; i < word.length; i++) {
        if (lettersInWord[i] == " ") {
            guessedLettersInWord.push(" ");
        }
        else {
            guessedLettersInWord.push("-");
        }
    }
    writeGuessedLettersToTheDom(guessedLettersInWord);
    attemptInDOM.innerHTML = attempts.toString();
}
function writeAlphabetToTheDom() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    keyboard.addEventListener("click", guessLetter);
    alphabet.forEach(function (element, index) {
        let divKey = document.createElement("div");
        divKey.id = element;
        divKey.classList.add("key");
        divKey.innerHTML = element;
        keyboard.append(divKey);
    });
}
function writeGuessedLettersToTheDom(guessedLetters) {
    lettersInDOM.innerHTML = "";
    guessedLettersInWord.forEach(function (letter) {
        const letterElement = document.createElement("li");
        letterElement.innerHTML = letter;
        lettersInDOM.append(letterElement);
    });
}
function guessLetter(event) {
    const target = event.target;
    const clickedLetter = target.id;
    if (clickedLetter !== "keyboard") {
        console.log(clickedLetter);
        target.classList.add("idle");
        const indexes = findLetter(clickedLetter);
        if (indexes.length > 0) {
            updateGuessedLettersInWord(clickedLetter, indexes);
        }
        else {
            attempts--;
            attemptInDOM.innerHTML = attempts.toString();
        }
        checkWin();
        checkLose();
    }
}
function findLetter(clickedLetter) {
    let indexes = [];
    for (let i = 0; i < lettersInWord.length; i++) {
        if (lettersInWord[i] === clickedLetter) {
            console.log("Found it!");
            indexes.push(i);
        }
    }
    return indexes;
}
function updateGuessedLettersInWord(clickedLetter, indexes) {
    indexes.forEach(function (index) {
        guessedLettersInWord[index] = clickedLetter;
    });
    writeGuessedLettersToTheDom(guessedLettersInWord);
}
function checkWin() {
    if (lettersInWord.join("") === guessedLettersInWord.join("")) {
        console.log("YOU WIN!");
        container.classList.add("winner");
        keyboard.classList.add("idle");
    }
}
function checkLose() {
    if (attempts === 0) {
        console.log("You lose");
        container.classList.add("lost");
        keyboard.classList.add("idle");
    }
}
//# sourceMappingURL=app.js.map