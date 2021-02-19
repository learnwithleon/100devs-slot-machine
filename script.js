/* 
REEL ACTION
1. create an array of icons
2. randomize selection from array once for each reel
3. Insert emoji into DOM
4. Create CSS animation to imitate spinning reel

BETTING
1. Add event listeners to betting btns
2. Have +/- buttons increment/decrement respectively
3. Set max bet to 100
4. Add event listener to spin btn, give condition if bet > 0
5. Give player 1000 starting earnings
6. Calculate earnings based on reel result
    no match = lose bet, 2 match = return bet + 10, 3 match = double bet, 3 mermaids bonus = 5x bet
7. disable bet and spin button if out of money and alert
8. After all money lost, populate "Play again button" to reset the game
*/

const icons = ["🧜🏽‍♀️", "🦑", "🦭", "🐚", "🐬", "🐡", "🦈", "🦀"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

let betAmt = 0;
let currentEarnings = 1000;
const earnings = document.querySelector(".currentEarnings");
const totalBet = document.querySelector(".totalBet");
const add10 = document.querySelector(".betUp");
const minus10 = document.querySelector(".betDown");
const yolo = document.querySelector(".maxBet");
const betBtn = document.querySelector(".startBet");
const payMsg = document.querySelector(".payoutMessage");
const reels = document.querySelector(".reels");

add10.addEventListener("click", () => {
  if (currentEarnings - betAmt - 10 < 0) {
    alert("Slow down there, big spender! You ran out of sand dollars!");
  } else {
    setBet(10);
  }
});
minus10.addEventListener("click", () => {
  if (betAmt <= 0) {
    alert("You can't bet less than zero!");
  } else {
    setBet(-10);
  }
});
betBtn.addEventListener("click", () => {
  if (currentEarnings - betAmt - 100 < 0) {
    alert(
      "Come back when ya got more sand dollars, old chum! (refresh to play again)"
    );
  } else {
    setBet(100);
  }
});
yolo.addEventListener("click", () => {
  if (currentEarnings === 0) {
    alert(
      "Come back when ya got more sand dollars, old chum! (refresh to play again)"
    );
  }
  setBet(currentEarnings - betAmt);
});

function randomIcon() {
  return Math.floor(Math.random() * icons.length);
}

document.querySelector(".spinBtn").addEventListener("click", runGame);

function runGame() {
  const spins = spinReels();
  const winnings = calcWinnings(spins);
  console.log(winnings);
  setEarnings(betAmt + winnings);
  setBet(-betAmt);
}

function spinReels() {
  if (betAmt === 0) {
    alert("Place your bets before spinning!");
  } else {
    reel1.innerHTML = "";
    reel2.innerHTML = "";
    reel3.innerHTML = "";
    const spins = [
      icons[randomIcon()],
      icons[randomIcon()],
      icons[randomIcon()]
    ];
    setTimeout(function () {
      reel1.innerHTML = spins[0];
    }, 500);
    setTimeout(function () {
      reel2.innerHTML = spins[1];
    }, 800);
    setTimeout(function () {
      reel3.innerHTML = spins[2];
    }, 1100);
    return spins;
  }
}

function calcWinnings(spins) {
  /* no match = lose bet, 2 match = return bet + 10, 3 match = double bet, 3 mermaids bonus = 5x bet*/

  if (spins[0] === icons[0] && spins[1] === icons[0] && spins[2] === icons[0]) {
    payMsg.innerHTML = `<span class="payoutMessage">Congratulations, you got the 5X mermaid bonus! $${
      betAmt * 5
    } awarded!</span>`;
    return betAmt * 4;
  } else if (spins[0] === spins[1] && spins[0] === spins[2]) {
    payMsg.innerHTML = `<span class="payoutMessage">Congrats, you won a 2X bonus! $${
      betAmt * 2
    } awarded!</span>`;
    return betAmt;
  } else if (
    spins[0] === spins[1] ||
    spins[0] === spins[2] ||
    spins[2] === spins[1]
  ) {
    payMsg.innerHTML = `<span class="payoutMessage">Not bad, you got the 1.2X bonus! $${Math.round(
      betAmt * 1.2
    )} awarded!</span>`;
    return Math.round(betAmt * 0.2);
  } else {
    payMsg.innerHTML = `<span class="payoutMessage">Better luck next time!</span>`;
    return -betAmt * 2;
  }
}

function setEarnings(value) {
  currentEarnings += value;
  earnings.innerHTML = `Current Earnings: $${currentEarnings}`;
}

function setBet(value) {
  betAmt += value;
  totalBet.innerHTML = `Current Bet: $${betAmt}`;
}
