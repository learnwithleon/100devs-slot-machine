 
let reelArr = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'mewtwo']
let reelArr1 = []
let reelArr2 = []
let reelArr3 = []
const totalCoins = document.getElementById('coinAmount')
const betAmount = document.getElementById('betAmount')
const slotReel1 = document.querySelector('.slot-reel-1')
const slotReel2 = document.querySelector('.slot-reel-2')
const slotReel3 = document.querySelector('.slot-reel-3')

const reelWindow = document.querySelector('.slot-reel').childElementCount
document.querySelector('#playButton').addEventListener('click', playGame)

function playGame(){
    if(Number(totalCoins.innerText) >= betAmount.value && betAmount.value > 0){
        randomizeReels()
        renderReels() 
        resolveBets(checkMatch())
    }
    else
        alert('Not Enough Coins!')
}

function randomizeReels(){
    reelArr1 = shuffle(reelArr)
    reelArr2 = shuffle(reelArr)
    reelArr3 = shuffle(reelArr)
}

function renderReels(){
    for(let i=0; i<reelWindow; i++){
        slotReel1.children[i].firstElementChild.src = `img/${reelArr1[i]}.png`
        slotReel2.children[i].firstElementChild.src = `img/${reelArr2[i]}.png`
        slotReel3.children[i].firstElementChild.src = `img/${reelArr3[i]}.png`
        //Remove the glow for matched pokemon
        slotReel1.children[i].classList.remove('match')
        slotReel2.children[i].classList.remove('match')
        slotReel3.children[i].classList.remove('match')
        
    }     
}

function checkMatch(){
    let totalMatches = 0
    for(let i = 0; i < reelWindow; i++){
        if(reelArr1[i] == reelArr2[i] && reelArr2[i] == reelArr3[i]){
            totalMatches++
            slotReel1.children[i].classList.add('match')
            slotReel2.children[i].classList.add('match')
            slotReel3.children[i].classList.add('match')
        }
    }
    let i = reelWindow - 1
    if(reelArr1[i] == reelArr2[i-1] && reelArr2[i-1] == reelArr3[i-2]){
        totalMatches++
        slotReel1.children[i].classList.add('match')
        slotReel2.children[i-1].classList.add('match')
        slotReel3.children[i-2].classList.add('match')
    }
    else if(reelArr3[i] == reelArr2[i-1] && reelArr2[i-1] == reelArr1[i-2]) {
        totalMatches++
        slotReel1.children[i-2].classList.add('match')
        slotReel2.children[i-1].classList.add('match')
        slotReel3.children[i].classList.add('match')
    }
    return totalMatches 
}

//Must use Array.from or .slice() to return a copy of the array. Returning the original array will cause assignments to this return value to point to the reference for the original array.
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array.slice(0)
  }

  function resolveBets(matches){
    if(matches)
       totalCoins.innerText =  Number(totalCoins.innerText) + 2**matches*betAmount.value
    else
        totalCoins.innerText = Number(totalCoins.innerText) - betAmount.value
  }