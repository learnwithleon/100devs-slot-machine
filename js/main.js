let jackpot = 10000;
let credits = 1000;
let wager = 0;
let score = 100;
let isWager = false;
const mxBet = 1000;
const mnBet = 100;

let slotArr = ["1", "2", "3", "4", "5", "6", "7", "8"];

//Display the initial tokens and the score
document.querySelector("#tokNum").innerHTML = `${credits}`;
document.querySelector("#score").innerHTML = `${score}`;

const maxBet = document.querySelector("#safeBet");
const minBet = document.querySelector("#riskyBet");
const spinBtn = document.querySelector("#spins");
const urBet = document.getElementById("betValue");

let urWager = urBet.addEventListener("onchange", yourBet);
let min = minBet.addEventListener("click", minBetMoney);
maxBet.addEventListener("click", maxBetMoney);
spinBtn.addEventListener("click", spin);

//if you have enough credits or money to play
function yourBet() {
  if (isWager) {
    document.querySelector(
      "playStatus"
    ).innerHTML = `You already bet your wager`;
  } else {
    userBet = urBet.value;
    // document.getElementById("score").innerHTML = score + userBet;
  }
  isWager = true;
  return userBet;
}

function minBetMoney() {
  if (!isWager) {
    userBet = mnBet;
    // document.getElementById("score").innerHTML = score + userBet;
  } else {
    document.querySelector(
      ".playStatus"
    ).innerHTML = `You already bet your wager`;
  }
  isWager = true;
  return userBet;
}

function maxBetMoney() {
  if (!isWager) {
    userBet = maxBet;
    // document.getElementById("score").innerHTML = score ;
  } else {
    document.querySelector(
      ".playStatus"
    ).innerHTML = `You already bet your wager`;
  }
  isWager = true;
  return userBet;
}

function convertCredits() {
  let points =
    credits <= 500
      ? 50
      : 1000 <= credits >= 500
      ? 500
      : 2000 <= credits >= 1000
      ? 1000
      : 8000 <= credits >= 5000
      ? 3000
      : 5000;
  score += points;
  return score;
}

function spin() {
  let userBet = urBet.value;
  if (score <= 50 && credits <= 0) {
    document.querySelector(
      ".playStatus"
    ).innerHTML = `Sorry, not enough credits or money to play`;
  } else if (score <= 50 && credits > 0) {
    convertCredits();
  } else if (score < userBet && score <= 50) {
    document.querySelector("playStatus").innerHTML = "Not enough money to play";
  }
  if (score > 50 && userBet > 0) {
    const slot1 = getElement("slot1");
    const slot2 = getElement("slot2");
    const slot3 = getElement("slot3");

    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const num3 = getRandomNumber();

    slot1.innerHTML = `${num1}`;
    slot2.innerHTML = `${num2}`;
    slot3.innerHTML = `${num3}`;

    if (
      (num1 === num2 && num1 === num3) ||
      (num2 === num1 && num2 == num3) ||
      (num3 === num1 && num3 === num2)
    ) {
      credits += userBet * 3;
      score += userBet * 3;
      winMessage();
    } else if (num1 == num2 || num1 == num3 || num2 == num3) {
      credits += userBet;
      score += userBet;
      loseMessage();
    } else {
      score -= userBet * 3;
    }
  }
}

function getElement(id) {
  return document.getElementById(id);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 8) + 1;
}

function winMessage() {
  const msg = document.getElementById("message");
  msg.style.display = "block";
  msg.classList.add("animated", "pulse");
  msg.InnerHTML = "YOU HIT JACKPOT";
}

function loseMessage() {
  const msg = document.getElementById("message");
  msg.style.display = "none";
  msg.innerHTML = "YOU GOT 2 SLOTS";
}

function refreshCounts(value) {
  score += value;
  document.getElementById("p2").innerHTML = score;
}
