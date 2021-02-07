//Game Life
const MIN_BET = 10;
const MAX_BET = 100;

let totalChips = 1000;
let playerChips = 0;

document.querySelector("#button").addEventListener("click", getDeck);
document.querySelector("#minBet").addEventListener("click", minBet);
document.querySelector("#maxBet").addEventListener("click", maxBet);
document.querySelector("#total").value = totalChips;
document.querySelector("#player").value = playerChips;

//Update Chips

function minBet() {
  if (playerChips >= totalChips) {
    alert("No more coins!");
    return -1;
  }
  playerChips += MIN_BET;
  document.querySelector("#player").value = playerChips;
}

function maxBet() {
  if (playerChips >= totalChips) {
    alert("No more coins!");
    return -1;
  }
  playerChips += MAX_BET;
  document.querySelector("#player").value = playerChips;
}

//Game Logic

function matchCards(array) {
  console.log(array);
  let result = array.every((item) => item == array[0]);
  if (result) {
    alert("You win!");
    totalChips += playerChips;
    document.querySelector("#total").value = totalChips;
  } else {
    console.log("Try again!");
    totalChips -= playerChips;
    document.querySelector("#total").value = totalChips;

    if (totalChips < 10) {
      alert("reload the page, game over");
    }
  }
}

function isMatch(array) {
  let arrayValues = [];
  let value = "";

  for (let i = 0; i < array.length; i++) {
    value = array[i].value;
    arrayValues.push(value);
  }

  matchCards(arrayValues);
}

// DOM Images

function drawImage(array) {
  for (let i = 0; i < array.length; i++) {
    document.querySelector(`#img${i}`).src = array[i].image;
  }
}

// Array of Objects

class Card {
  constructor(cardValue, cardImage) {
    this.value = cardValue;
    this.image = cardImage;
  }
}

function getCards(arr) {
  let arrayRow = [];
  let arrayData = arr.cards;

  arrayData.forEach((item) => arrayRow.push(new Card(item.value, item.image)));

  isMatch(arrayRow);
  drawImage(arrayRow);
}

// FETCH DECK API

let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AS,AS,AD,AD,AD,KC,KH,JS,JD,QC,QH,KC,KH,JS,JD,QC,QH`;

function getDeck() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let deckID = data.deck_id;
      const urlDeck = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`;
      fetch(urlDeck)
        .then((res) => res.json())
        .then((data) => {
          getCards(data);
          const urlReshuffle = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`;
          fetch(urlReshuffle)
            .then((res) => res.json())
            .catch((err) => `error ${err}`);
        })
        .catch((err) => `error ${err}`);
    })
    .catch((err) => `error ${err}`);
}
