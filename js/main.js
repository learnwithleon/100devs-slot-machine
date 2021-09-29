// I need an array of icons.
// I need 3 reels in the DOM
// I need to select those reels to put emojis in it
// I need to randomize those 3 reels
// I need to check if those 3 emojis are the same
// I need to set a timer for the reel to spin
// I need a stack of money to bet
// I need to check if he wins or not and win money or lose money
// I need a button to spin the wheel


const dom = {
// SELECT THE REEL
reels: document.querySelector(".all-reels"),
// SELECT ALL INDEPENDANT REELS
reel1: document.querySelector(".reel1"),
reel2: document.querySelector(".reel2"),
reel3: document.querySelector(".reel3"),

// SELECT START BUTTON
startSpin: document.querySelector(".start"),

// SELECT BETS BUTTON
betMin: document.querySelector(".bet-min"),
betMax: document.querySelector(".bet-max"),

// SELECT CURRENT BET
currentBet: document.querySelector(".totalBet"),

// SELECT CURRENT MONEY
currentMoney: document.querySelector(".total-cash"),
}
// CREATE ARRAY OF ICONS FOR THE REELS
const emojis = ["🧨", "✨", "7️⃣", "💛", "💥", "💫", "💦", "💯"];


let myMoney = 1000
let myBet = 0

function setEarnings(value) {
  myMoney += value;
  myMoney -= myBet;
  dom.currentMoney.innerHTML = `Total Cash: ${myMoney}`;
}

function setBet(value) {
  
  myBet += value;
  dom.currentBet.innerHTML = `Current Bet: ${myBet}`;
}

function randomEmoji() {
  return Math.floor(Math.random() * emojis.length);
}



  dom.betMin.addEventListener("click", () => {
    if (myMoney - myBet - 10 < 0) {
      alert("You don't have any more money!");
    } else {
      setBet(50);
    }
  });
  dom.betMax.addEventListener("click", () => {
    if (myMoney <= 0) {
      alert("You don't have anything to bet!");
    } else {
      setBet(myMoney - myBet);
    }
  });


class SlotMachine {

  // Create parameters for spins values
  constructor(leftReel, middleReel, rightReel){
    this.leftReel = leftReel
    this.middleReel = middleReel
    this.rightReel = rightReel
  }  

  slotMachineResults(){
    // Check if the 3 values are the same for Jackpot
    if (this.leftReel === this.middleReel === this.rightReel){
      let value = myBet * 4
      setEarnings(value)
      alert("You hit the JACKPOT!")
      myBet = 0
      dom.currentBet.innerHTML = `Current Bet: ${myBet}`;
    } // Check if left Reel is equal to middle Reel, or mid equal to right
    else if (this.leftReel === this.middleReel || this.middleReel === this.rightReel){
      let value = myBet * 2
      setEarnings(value)
      myBet = 0
      dom.currentBet.innerHTML = `Current Bet: ${myBet}`;
      alert("You won dubble your bet")
     
    } // Check if left Reel equal Right Reel
    else if (this.leftReel === this.rightReel){
      let value = myBet
      setEarnings(value)
      myBet = 0
      dom.currentBet.innerHTML = `Current Bet: ${myBet}`;
      alert("You got back your bet")
     
    
    } else{
      let value = 0
      setEarnings(value)
      myBet = 0
      dom.currentBet.innerHTML = `Current Bet: ${myBet}`;
      alert("You lost!")
    }
  }

 
}

dom.startSpin.addEventListener('click', spinSlotMachine)
let slotMachineValues

function spinSlotMachine(){
  if (myBet === 0) {
    alert("Place your bets before spinning!");
  } else{
  dom.reel1.textContent = emojis[randomEmoji()]
  dom.reel2.textContent = emojis[randomEmoji()]
  dom.reel3.textContent = emojis[randomEmoji()]
  }

  slotMachineValues = new SlotMachine(dom.reel1.textContent,dom.reel2.textContent,dom.reel3.textContent)
    slotMachineValues.slotMachineResults()


}