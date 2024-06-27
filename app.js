/* eslint-disable prefer-const */
/**
 * Plan
 * initialize the app
 *
 *  pick a random letter
 *
 * wait for the user to type a key on their keyboard (NICE TO HAVE) or click a ltr button
 *
 * check the ltr chosen againt the ltr that was randomly chosen
 *
 * let the user know if they were right or wrong
 *  -- if wrong, deduct from the # of guesses and show a them the wrong guess, then render that wrong guess to the screen
 *  -- if wrong and they dont have any guesses left, show the losing message and updat the losses + reset/re-initialize the game
 *  -- if right, update the wins , show a winning message and reset/re-initialize the game
 */

// Game Variables
let wins = 0;
let losses = 0;
let guessesLeft = 10;
let userGuesses = [];
let randomLetter;
const letters = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('');

// UI Variables
const winsEl = document.querySelector('#wins');
const lossesEl = document.querySelector('#losses');
const guessesLeftEl = document.querySelector('#guesses-left');
const userGuessesEl = document.querySelector('#user-guesses');
const letterButtonsContainerEl = document.querySelector('#letter-buttons-container');

// Utility Functions
function computerChoice() {
  const randomIndex = Math.floor(Math.random() * letters.length);
  randomLetter = letters[randomIndex];
}

// if i take a string of html elements and instert it into the innerHTML of any element,
// the browser will convert it to HTML for us
function generateLetterButtons() {
  // <div class="cell">Cell 1</div>
  let buttons = '';

  letters.forEach((letter) => {
    buttons += `<button>${letter}</button>`;
  });

  return buttons;
}

function displayMessage(message) {
  window.alert(message);
}

function updateUI(el, value) {
  el.textContent = value;
}

function takeTurn(letter) {
  guessesLeft -= 1;
  userGuesses.push(letter);
  updateUI(guessesLeftEl, guessesLeft);
  updateUI(userGuessesEl, userGuesses);
}

function checkForValidTurn(letter) {
  if (userGuesses.includes(letter)) {
    displayMessage('You already guessed that letter!');
  } else {
    // add the choice to the user choices
    takeTurn(letter);
  }
}

function checkWinCondition(letter) {
  // if the letter is the same as random letter
  // +1 win, display winning message, reset the game
  // else if guesses left === 0 show the lossing message and reset the game

  if (letter === randomLetter) {
    wins += 1;
    displayMessage(`You won! The letter was ${randomLetter}!`);
    init();
  } else if (guessesLeft === 0) {
    losses += 1;
    displayMessage(`Oooops you ran out of turns! The letter was ${randomLetter}!`);
    init();
  }
}

// Event Handles
function handleButtonClick(event) {
  /**
   * @FLOW
   * 1. check the event target and get the letter from the inner text  - DONE
   * 2. check that letter against the random letter -
   * 2a. if correct show the winning message
   * 2b. if wrong, deduct from the guesses left and show the wrong guess, add the choice to the user choices and display that to the screen
   * 2c if wrong and no guesses left, show the losing message
   */

  if (event.target.tagName !== 'BUTTON') return;

  const choice = event.target.innerText;
  checkForValidTurn(choice);
  checkWinCondition(choice);
}
// Event Listeners
document.addEventListener('click', handleButtonClick);

// start the game
function init() {
  // 1st load scenario
  // all the values are set to default

  // after win/loss scenario
  // we need to reset the guessses left and user guesses
  // userguesses array lenght > 0  && guesses left !== 10
  if (userGuesses.length > 0 && guessesLeft !== 10) {
    guessesLeft = 10;
    userGuesses = [];
  }

  computerChoice();

  updateUI(winsEl, wins);
  updateUI(lossesEl, losses);
  updateUI(guessesLeftEl, guessesLeft);
  updateUI(userGuessesEl, userGuesses);

  // render the letters on the page
  letterButtonsContainerEl.innerHTML = generateLetterButtons();
}

init();