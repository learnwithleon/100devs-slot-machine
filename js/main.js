let score = 0
let total = 100
const maxBet = 50
const minBet = 10
let userBet = 0

document.querySelector('#minBet').addEventListener('click', placeMinBet)
document.querySelector('#maxBet').addEventListener('click', placeMaxBet)
document.querySelector('#play').addEventListener('click', playSlots)

function placeMinBet() {
    userBet = minBet
    document.querySelector('#minBet').classList.add('clicked')
    document.querySelector('#maxBet').classList.remove('clicked')
    document.querySelector('h2').innerText = `Bet: $10`
}

function placeMaxBet() {
    userBet = maxBet
    document.querySelector('#minBet').classList.remove('clicked')
    document.querySelector('#maxBet').classList.add('clicked')
    document.querySelector('h2').innerText = `Bet: $50`
}
function playSlots() {
    slotMachine.game()
}
const slotMachine = {
    reel: function(){
        const random = Math.random()
        console.log(random)
        if(random < .143){
            return `<i class="fas fa-apple-alt" id="apple"></i>`
        } else if(random < .285){
            return `<i class="fas fa-star" id="star"></i>`
        } else if(random < .426){
            return `<i class="fas fa-fish" id="fish"></i>`
        } else if(random < .569){
            return  `<i class="far fa-gem" id="diamond"></i>`
        } else if(random < .712){
            return `<i class="fas fa-chess-knight" id="horseshoe"></i>`
        } else if(random < .855){
                return `<i class="fas fa-coins" id="gold"></i>`
        } else {
                return `<i class="fas fa-coins" id='silver'></i>`
        }
    },
    game: function () {
        if(total < 10){
            alert(`You're out of money!`)
            return
        }
        if(userBet > total){
            alert(`You don't have enough money to cover the bet`)
            return
        }
        if(userBet > 0 && total >= 10){
            const reelOne = slotMachine.reel()
            const reelTwo = slotMachine.reel()
            const reelThree = slotMachine.reel()
            console.log(reelOne,reelTwo,reelThree)
            if(reelOne === reelTwo && reelOne === reelThree){
                score += userBet*3
                total += userBet*3
                alert('JACKPOT!')
            } else if(reelOne === reelTwo || reelOne === reelThree || reelTwo === reelThree){
                score += userBet
                total += userBet
            } else{
                total -= userBet
            }
            console.log(`Your score is : ${score}`)
            document.querySelector('h1').innerText = `Wallet: $${total}`
            document.querySelector(`.slot1`).innerHTML = reelOne
            document.querySelector(`.slot2`).innerHTML = reelTwo
            document.querySelector(`.slot3`).innerHTML = reelThree
            document.querySelector('#minBet').classList.remove('clicked')
            document.querySelector('#maxBet').classList.remove('clicked')
            document.querySelector('h2').innerText = `Bet: $0`
            }else{
            alert('Place your bet!')
            }
        userBet = 0
    }
}



