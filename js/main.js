//array of options
//              [banana, penguin, cowboy, money, grandma]
const icons = ["🍌", "🐧", "🤠", "💰", "👵"];
//spin button
const spin = document.querySelector("#spin");
//text things
const currentCash = document.getElementById("currentCash");
const betAmount = document.getElementById("betAmount");
const winAmount = document.getElementById("winAmount");
//bet Mods
const betAdd = document.getElementById("betAdd");
const betSub = document.getElementById("betSub");
const bet = document.getElementById("bet");
const addFive = document.getElementById("addFive");
const addTen = document.getElementById("addTen");
const addHund = document.getElementById("addHund");
const allIn = document.getElementById("allIn");
//jackpot stuff
const jackpot = document.getElementById("jackpot");
const slotScreen = document.getElementById("slotScreen");
const playaPlaya = document.getElementById("playaPlaya");



//array of three slot screen elements
let slotIcons = Array.from(document.querySelectorAll(".slotIcon"));

let randomIndeces = Array(3)
  .fill(5)
  .map((x) => (x = Math.floor(Math.random() * x)));
console.log(randomIndeces);

slotIcons.forEach((e, i) => (e.innerText = icons[randomIndeces[i]]));

//event listeners
bet.addEventListener("click", modifyBetAmount);
spin.addEventListener("click", animateMate);

//three money bags === super jackpot
//100 * betAmount
//three of a kind === 50 * bet amount
//feed the penguin === cowboy banana penguin
//no money but you get bananas
//alert "don't feed the penguins!"
//two of a kind === 3*bet amount

function animateMate() {
  if (Number(currentCash.innerText) - Number(betAmount.innerText) >= 0) {
    winAmount.innerText = "0";
    spin.removeEventListener("click", animateMate);
    currentCash.innerText =
      Number(currentCash.innerText) - Number(betAmount.innerText);
    spinThatReel(slotIcons[0], 30 - Math.floor(Math.random() * 5));
    setTimeout(() => {
      spinThatReel(slotIcons[1], 36 - Math.floor(Math.random() * 5));
    }, 500);
    setTimeout(() => {
      spinThatReel(slotIcons[2], 41 - Math.floor(Math.random() * 5));
    }, 1000);

    //win conditions
    setTimeout(() => {
      if (
        slotIcons[0].innerText === "💰" &&
        slotIcons[1].innerText === "💰" &&
        slotIcons[2].innerText === "💰"
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 300;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        jackpot.animate(jackFrames, jackTime);
        slotScreen.animate(screenJackFrames, jackTime);
        playaPlaya.animate(screenJackFrames, jackTime);
      } else if (
        slotIcons[0].innerText === slotIcons[1].innerText &&
        slotIcons[0].innerText === slotIcons[2].innerText
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 50;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        jackpot.animate(jackFrames, jackTime);
        slotScreen.animate(screenJackFrames, jackTime);
        playaPlaya.animate(screenJackFrames, jackTime);
      } else if (slotIcons[0].innerText === slotIcons[1].innerText) {
        winAmount.innerText = Number(betAmount.innerText) * 3;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
      } else if (
        slotIcons[0].innerText === "💰" &&
        slotIcons[2].innerText === "💰"
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 100;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
      } else if (
        slotIcons[0].innerText === slotIcons[2].innerText &&
        slotIcons[0].innerText !== slotIcons[1].innerText
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 3;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
      }
      spin.addEventListener("click", animateMate);
    }, 5000);
  } else {
    alert("you are broke, loser!");
  }
}



//change the bet amount
function modifyBetAmount(e) {
  if (e.target === betAdd) {
    betAmount.innerText = Number(betAmount.innerText) + 1;
  }else if (e.target === betSub) {
    if (Number(betAmount.innerText) > 0) {
      betAmount.innerText = Number(betAmount.innerText) - 1;
      }
    } else if (e.target === addFive) {
      betAmount.innerText = Number(betAmount.innerText) + 5;
    } else if (e.target === addTen) {
      betAmount.innerText = Number(betAmount.innerText) + 10;
    } else if (e.target === addHund) {
      betAmount.innerText = Number(betAmount.innerText) + 100;
    } else if (e.target === addTen) {
      betAmount.innerText =
        Number(betAmount.innerText) + Number(currentCash.innerText);
    }
}

//aniStuff

const normalFrames = [{ top: "-50%" }, { top: "80%" }];

let normalTime = {
  duration: 55,
  iterations: 1,
  fill: "both",
};

const slowFrames = [{ top: "0%" }, { top: "100%" }];
const slowTime = {
  duration: 750,
  iterations: 1,
  fill: "both",
};

const endFrames = [{ top: "-100%" }, { top: "0%" }];
const endTime = {
  duration: 750,
  iterations: 1,
  fill: "both",
};

function spinThatReel(e, spins) {
  let intervalCount = 0;
  e.animate(slowFrames, slowTime);

  const changeTheBaby = setInterval(() => {
    e.animate(normalFrames, normalTime);
    let counter = icons.indexOf(e.innerHTML);
    intervalCount++;
    // if(intervalCount > 5){
    //     normalTime.duration -= 50
    // }else if(intervalCount > 11 && intervalCount < 18){
    //     normalTime.duration += 50
    // }

    counter++;
    if (counter >= 5) {
      counter = 0;
    }
    e.innerHTML = icons[counter];

    if (intervalCount > spins) {
      e.animate(endFrames, endTime);
      clearInterval(changeTheBaby);
    }
  }, 80);
}

const screenJackFrames = [
  { boxShadow: "0 0 10px 10px rgb(255, 255, 0)" },
  { boxShadow: "0 0 0 0 black" },
];
const jackFrames = [
  {
    border: "8px ridge rgb(255, 255, 0)",
    color: "rgb(251, 251, 0)",
    boxShadow: "0 0 10px 10px rgb(255, 255, 0)",
    textShadow: "0px 0px 20px rgb(255, 255, 0)",
  },
  {
    border: "8px ridge rgb(128, 128, 50)",
    color: "rgb(138, 138, 100)",
    boxShadow: "0 0 0 0 black",
    textShadow: "0px 0px 0px black",
  },
];
const jackTime = {
  duration: 1000,
  iterations: 5,
  fill: "both",
};

//justincase
// slotIcons.forEach(e => e.animate(slowFrames, slowTime))

//     const changeTheBaby = setInterval(() => {

//             slotIcons.forEach(e => e.animate(normalFrames, normalTime))
//         console.log(intervalCount)
//         intervalCount++
//         if(intervalCount < 10){
//             normalTime.duration -= 50
//         }else if(intervalCount > 15){
//             normalTime.duration += 50
//         }
//         console.log(normalTime.duration)
//         slotIcons.forEach(function(e, i) {
//             let counter = icons.indexOf(e.innerHTML)
//             counter++
//             if(counter >= 5){
//                 counter= 0
//             }
//             e.innerHTML = icons[counter]

//             })

//         if(intervalCount > 19){
//             slotIcons.forEach(e => e.animate(endFrames, endTime))
//         clearInterval(changeTheBaby)
//     }

//     },800);
