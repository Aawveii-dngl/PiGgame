'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceroll = document.querySelector('.btn--roll');
const dicenew = document.querySelector('.btn--new');
const dicehold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let activegame = true;

let playerSwitch = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Dice rolling
diceroll.addEventListener('click', function () {
  if (activegame) {
    diceEl.classList.remove('hidden');
    let number = Math.trunc(Math.random() * 6 + 1);
    console.log(number);
    //Display dice
    diceEl.src = `dice-${number}.png`; //I was confused in this🤣😊😊
    //Check if number is 1
    if (number !== 1) {
      currentScore += number;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //ternary operator is used to change the user
      playerSwitch();
    }
  }
});
//HOLD
dicehold.addEventListener('click', function () {
  if (activegame) {
    //Add active score to current player score
    // console.log(scores);
    scores[activePlayer] += currentScore;
    // console.log(scores);
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if score >=100
    if (scores[activePlayer] >= 20) {
      activegame = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if yes finish game and player wins

      //else switch the player
      playerSwitch();
    }
  }
});
//New game
dicenew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  activegame = true;
  //It is done dynamically we can put scoreE1.textContent = 0 and score1E1.textcontent =0
  document.getElementById(`score--${activePlayer}`).textContent = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  scores[activePlayer] = 0;
  activePlayer = 0;
});
