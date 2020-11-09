window.addEventListener("load", init);

//Global variables
const container: HTMLDivElement = document.querySelector("#container");
const lettersInDOM: HTMLDivElement = document.querySelector("#letters");
const attemptInDOM: HTMLDivElement = document.querySelector("#attempt");
const keyboard: HTMLDivElement = document.querySelector("#keyboard");

let attempts: number = 5;
let word: string = "hangman first draft";
let lettersInWord: string[] = [];
let guessedLettersInWord: string[] = [];

/**
 * Function to initialize the programme
 */
function init() {
  //write the alphabet keyboard to the DOM
  writeAlphabetToTheDom();

  //set lettersInWord
  lettersInWord = word.split("");

  //set guessedLettersInWord
  for (let i: number = 0; i < word.length; i++) {
    if (lettersInWord[i] == " ") {
      guessedLettersInWord.push(" ");
    } else {
      guessedLettersInWord.push("-");
    }
  }

  //write guessedLettersInWord to the DOM
  writeGuessedLettersToTheDom(guessedLettersInWord);

  //write attempts to the DOM
  attemptInDOM.innerHTML = attempts.toString();
}

/**
 * Function to write the alphabet keyboard to the DOM
 */
function writeAlphabetToTheDom() {
  const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  keyboard.addEventListener("click", guessLetter);
  alphabet.forEach(function (element, index) {
    let divKey: HTMLDivElement = document.createElement("div");
    divKey.id = element;
    divKey.classList.add("key");
    divKey.innerHTML = element;
    keyboard.append(divKey);
  });
}

/**
 * Function to write the guessedLetters to the DOM
 */
function writeGuessedLettersToTheDom(guessedLetters: string[]) {
  lettersInDOM.innerHTML = "";
  guessedLettersInWord.forEach(function (letter) {
    const letterElement = document.createElement("li");
    letterElement.innerHTML = letter;
    lettersInDOM.append(letterElement);
  })
}

/**
 * Function to guess a letter
 */
function guessLetter(event: Event) {

  const target: HTMLElement = event.target as HTMLElement;
  const clickedLetter: string = target.id;

  if (clickedLetter !== "keyboard") {
    console.log(clickedLetter);
    target.classList.add("idle");

    const indexes: number[] = findLetter(clickedLetter);
    if (indexes.length > 0) {
      updateGuessedLettersInWord(clickedLetter, indexes);
    } else {
      attempts--
      attemptInDOM.innerHTML = attempts.toString();
    }

    checkWin();
    checkLose();
  }
}

/**
 * Function to check if letter is in word
 */
function findLetter(clickedLetter: string): number[] {
  let indexes: number[] = [];
  for (let i: number = 0; i < lettersInWord.length; i++) {
    if (lettersInWord[i] === clickedLetter) {
      console.log("Found it!")
      indexes.push(i);
    }
  }
  return indexes;
}

/**
 * Function to update guessedLettersInWord to the DOM
 */
function updateGuessedLettersInWord(clickedLetter: string, indexes: number[]) {
  indexes.forEach(function (index) {
    guessedLettersInWord[index] = clickedLetter;
  })
  writeGuessedLettersToTheDom(guessedLettersInWord);
}

/**
 * Function to check if player has won
 */
function checkWin() {
  if (lettersInWord.join("") === guessedLettersInWord.join("")) {
    console.log("YOU WIN!");
    container.classList.add("winner");
    keyboard.classList.add("idle");
  }
}

/**
 * Function to check if player has lost
 */
function checkLose() {
  if (attempts === 0) {
    console.log("You lose");
    container.classList.add("lost");
    keyboard.classList.add("idle");
  }
}
