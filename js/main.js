 
let reelArr = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'mewtwo']
let reelArr1 = []
let reelArr2 = []
let reelArr3 = []
document.querySelector('#playButton').addEventListener('click', playGame)

function playGame(){
    randomizeReels()
    renderReels()
}

function randomizeReels(){
    reelArr1 = [...shuffle(reelArr)]
    reelArr2 = [...shuffle(reelArr)]
    reelArr3 = [...shuffle(reelArr)]
}

function renderReels(){
    const slotReel1 = document.querySelector('.slot-reel-1')
    const slotReel2 = document.querySelector('.slot-reel-2')
    const slotReel3 = document.querySelector('.slot-reel-3')
    for(let i=0; i< slotReel1.childElementCount; i++){
        slotReel1.children[i].firstElementChild.src = `img/${reelArr1[i]}.png`
        slotReel2.children[i].firstElementChild.src = `img/${reelArr2[i]}.png`
        slotReel3.children[i].firstElementChild.src = `img/${reelArr3[i]}.png`
    }
        
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }