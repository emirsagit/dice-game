// Variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let initialSetted = false;

// Variables to store references to the necessary DOM nodes
const message = document.getElementById("message");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player1Dice = document.getElementById("player1Dice");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const player2Dice = document.getElementById("player2Dice");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Changes textContent of message element
 * @param player is who won the game (player 1 or 2)
 */
function writeMessageToDom(player = null) {
  if (!initialSetted) {
    message.textContent = "Roll Dice! (Who's First?)";
    return;
  }
  if (player) {
    message.textContent = `${player} WON! 🏅`;
    message.classList = "text-danger";
  } else {
    if (player1Turn) {
      message.textContent = "Player 1 Turn";
      message.classList = "text-black";
      return;
    }
    message.textContent = "Player 2 Turn";
    message.classList = "text-primary";
  }
}

/**
 * Changes scoreboard textContent
 */
function writeScoreToDom() {
  player1Scoreboard.textContent = player1Score;
  player2Scoreboard.textContent = player2Score;
}

/**
 * Changes dice class according to random number. So correct face of dice displays.
 * @param number is a random number created by dice (1 - 6)
 */
function writeDiceToDom(number) {
  if (player1Turn) {
    player1Dice.classList = "cube show-" + number;
  } else {
    player2Dice.classList = "cube show-" + number;
  }
}

/**
 * Sets score
 * @param number is a random number created by dice (1 - 6)
 */
function setScore(number) {
  player1Turn ? (player1Score += number) : (player2Score += number);
  writeScoreToDom();
}

/**
 * Shows reset button, hide roll button
 */
function showResetBtn() {
  rollBtn.style.display = "none";
  resetBtn.style.display = "inline";
}

/**
 * Shows roll button, hide reset button
 */
function showRollBtn() {
  rollBtn.style.display = "inline";
  resetBtn.style.display = "none";
}

/**
 * Resets game after decided who starts
 */
function setInitial() {
  initialSetted = true;
  player1Score = 0;
  player2Score = 0;
  writeMessageToDom();
  writeScoreToDom();
}

/**
 * Decides who starts first (player 1 or 2)
 */
function setFirstPlayer() {
  if (player1Turn) {
    player1Turn = false;
    return;
  }

  if (player1Score === player2Score) {
    message.innerHTML = "DRAW! <br> Roll Dice Once More";
    player1Turn = true;
    return;
  }

  player1Score > player2Score ? (player1Turn = true) : (player1Turn = false);
  setInitial();
}

/**
 * Checks somebody won the game, if not, will change turn
 */
function evaluateTheScore() {
  if (player1Score >= 21) {
    writeMessageToDom("Player 1");
    showResetBtn();
  } else if (player2Score >= 21) {
    writeMessageToDom("Player 2");
    showResetBtn();
  } else {
    player1Turn = !player1Turn;
    writeMessageToDom();
  }
}

/**
 * Initial, main function after clicks roll button
 * Creates random number between (1 - 6)
 * Calls other functions in order
 */
function roll() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  setScore(randomNumber);
  writeDiceToDom(randomNumber);
  if (!initialSetted) {
    setFirstPlayer();
  } else {
    evaluateTheScore();
  }
}

/**
 * Resets the game
 */
function reset() {
  showRollBtn();
  player2Score = 0;
  player1Score = 0;
  player1Turn = true;
  initialSetted = false;
  player1Dice.classList = "cube show-1";
  player2Dice.classList = "cube show-1";
  writeMessageToDom();
  writeScoreToDom();
}

rollBtn.addEventListener("click", roll);
resetBtn.addEventListener("click", reset);
