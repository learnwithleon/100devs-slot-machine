const button = document.getElementById("btn");
const reelImages = document.getElementsByTagName("img");
const reels = [
  reelImages[0],
  reelImages[1],
  reelImages[2]
] 
button.addEventListener("click", roll);

const imageFnames = ["charizard", "groudon", "mewtwo", "pikachu", "pokeball"];

function roll(e) {
  console.log(e)
  button.disabled = true;
  reels.forEach(setNewImage);
}

function setNewImage(img, idx) {
  setTimeout(() => {
    img.src = randomImg(imageFnames);
    console.log(img.src)

    if (idx == 2) {
      button.disabled = false;
    }
  }, 2000*(idx + 1));
}

function randomImg(images) {
  return "images/" + images[Math.floor(Math.random() * images.length)] + ".png";
}
