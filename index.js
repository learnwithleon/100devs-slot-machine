const button = document.getElementById("btn");
const reelImages = document.getElementsByTagName("img");
const money = document.getElementById("money");
const bet = document.getElementById("bet");
let reels = [
  reelImages[0],
  reelImages[1],
  reelImages[2]
] 
const imageFnames = ["charizard", "groudon", "mewtwo", "pikachu", "pokeball"];

button.addEventListener("click", roll);

async function roll(e) {
  e.preventDefault();
  if (bet.value === "") {
    alert("Please specify your bet amount");
    return;
  }
  button.disabled = true;
  let moneyValue = Number(money.innerHTML);
  let betAmount = Number(bet.value);
  const newReels = await setNewImages(reels);

  if (isWinner(newReels)) {
    moneyValue += betAmount;
    bet.max = moneyValue;
  } else {
    moneyValue -= betAmount;
  }
  money.innerHTML = moneyValue;

  if (!moneyValue) {
    button.disabled = true;
  }
}

function setNewImages(reels) {
  return new Promise((resolve, reject) => {
    reels.forEach((img, idx) => {
      setTimeout(() => {
        img.src = randomImg(imageFnames);

        console.log(img.src);
        if (idx == 2) {
          button.disabled = false;
          resolve(reels);
        }
      }, 400*(idx + 1) /*change to 2000, delay every image*/);
    });
  });
}

function isWinner(spinRes) {
  return spinRes[0].src === spinRes[1].src && reels[1].src === spinRes[2].src;
}

function randomImg(images) {
  return "images/" + images[Math.floor(Math.random() * images.length)] + ".png";
}
