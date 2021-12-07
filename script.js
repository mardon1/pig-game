'use strict';
const elPlayer0 = document.querySelector('.player--0');
const elPlayer1 = document.querySelector('.player--1');
const elScore0 = document.querySelector('#score--0');
const elScore1 = document.getElementById('score--1');
const elCurrent0 = document.getElementById('current--0');
const elCurrent1 = document.getElementById('current--1');
const elDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  elScore0.textContent = 0;
  elScore1.textContent = 0;
  elCurrent0.textContent = 0;
  elCurrent1.textContent = 0;
  elDice.classList.add('hidden');
  elPlayer0.classList.remove('player--winner');
  elPlayer1.classList.remove('player--winner');
  elPlayer0.classList.add('player--active');
  elPlayer1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  currentScore = 0;
  elPlayer0.classList.toggle('player--active');
  elPlayer1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    elDice.classList.remove('hidden');
    elDice.src = `img/dice-${dice}.png`;

    // Check for rolled 1

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score  is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      elDice.classList.add('hidden');
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
