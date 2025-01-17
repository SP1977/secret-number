const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

let highscore = 0;

const title = document.querySelector('.title');
const between = document.querySelector('.between');
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess');
const bodyEl = document.querySelector('body');
const guessZone = document.querySelector('.guess-zone');
const answer = document.querySelector('.answer');
const again = document.querySelector('.again');

const resultMessage = message => (title.textContent = message);

const displayMessage = message => (messageEl.textContent = message);

const displayNumber = number => (numberEl.textContent = number);

const displayScore = score => (scoreEl.textContent = score);

const clearInput = () => (guessInput.value = '');

const init = function () {
  score = 20;
  secretNumber = randomInt(1, 20);
  resultMessage('Guess my number!');
  displayMessage('Start guessing...');
  displayScore(score);
  displayNumber('?');
  clearInput();
  guessZone.style.display = 'block';
  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
  again.style.display = 'none';
  answer.style.display = 'none';
  guessInput.focus();
  between.style.display = 'block';
};

init();

const endingDisplay = () => {
  displayNumber(secretNumber);
  guessZone.style.display = 'none';
  again.style.display = 'inline-block';
  answer.style.display = 'block';
  between.style.display = 'none';
};

const handleWin = () => {
  resultMessage('Well done!');
  displayMessage('Correct number!');
  bodyEl.style.backgroundColor = '#540D6E';
  numberEl.style.width = '30rem';

  if (score > highscore) {
    highscore = score;
    highscoreEl.textContent = highscore;
  }
};

const handleLose = () => {
  resultMessage('You lost 😫!');
  displayMessage('No more attempts');
  displayScore(0);
  bodyEl.style.backgroundColor = '#990000';
};

const checkGuess = () => {
  const guess = +guessInput.value;
  if (!guess) {
    displayMessage('You must enter a number between 1 and 20');
    clearInput();
    guessInput.focus();

    // if number is < 1 or > 20
  } else if (guess > 20 || guess < 1 || guess === 0) {
    displayMessage('The secret number is between 1 and 20');
    clearInput();

    // If player wins
  } else if (guess === secretNumber) {
    handleWin();
    endingDisplay();

    // If the number is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      displayScore(score);
    } else {
      handleLose();
      endingDisplay();
    }
    clearInput();
    guessInput.focus();
  }
};

// Event listener for the "Check" button
document.querySelector('.check').addEventListener('click', checkGuess);

// Event listener for Enter key in the input
guessInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkGuess();
});

document.querySelector('.again').addEventListener('click', init);
