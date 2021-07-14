// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// Create variables to store references to the necessary DOM nodes
const message = document.getElementById("message");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player1Dice = document.getElementById("player1Dice");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const player2Dice = document.getElementById("player2Dice");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");

function writeMessageToDom(player = null) {
  if (player) {
    message.textContent = `${player} WON!`;
  } else {
    player1Turn
      ? (message.textContent = "Player 1 Turn")
      : (message.textContent = "Player 2 Turn");
  }
}

function writeScore() {
  player1Scoreboard.textContent = player1Score;
  player2Scoreboard.textContent = player2Score;
}

function writeDice(number) {
  if (player1Turn) {
    player1Dice.textContent = number;
    player2Dice.textContent = "-";
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
  } else {
    player2Dice.textContent = number;
    player1Dice.textContent = "-";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
  }
}

function setScore(number) {
  player1Turn ? (player1Score += number) : (player2Score += number);
  writeScore();
}

function showResetBtn() {
  rollBtn.style.display = "none";
  resetBtn.style.display = "inline";
}

function showRollBtn() {
  rollBtn.style.display = "inline";
  resetBtn.style.display = "none";
}

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

function roll() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  setScore(randomNumber);
  writeDice(randomNumber);
  evaluateTheScore();
}

function reset() {
  showRollBtn();
  player2Score = 0;
  player1Score = 0;
  player1Turn = true;
  player2Dice.textContent = "-";
  player1Dice.textContent = "-";
  player1Dice.classList.add("active");
  player2Dice.classList.remove("active");
  writeMessageToDom();
  writeScore();
}

rollBtn.addEventListener("click", roll);
resetBtn.addEventListener("click", reset);
