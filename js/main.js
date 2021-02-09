document.querySelector('#spinBtn').addEventListener('click', play)
document.querySelector('#minBet').addEventListener('click', minBet)
document.querySelector('#maxBet').addEventListener('click', maxBet)

let wager = 25
let credits = 1000
let jackpot = 5000
let isJackpot = false
let isMatchingThree = false

// each slot
let slot1 = document.getElementById('img1')
let slot2 = document.getElementById('img2')
let slot3 = document.getElementById('img3')


//setting jackpot and score upon loading
document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
document.querySelector('#score').innerText = credits

let arr = ['img/1.svg', 'img/2.svg', 'img/3.svg', 'img/pokeball.svg', 'img/5.svg',]
// let arr = ['img/1.svg', 'img/2.svg', 'img/3.svg', 'img/4.svg', 'img/pokeball.svg',]

function play() {
    slotMachine.game()
}

const slotMachine = {

    spin1: function () {
        let slot1RandomNumber = Math.floor(Math.random() * 10 + 20)
        let testingNumber1 = 0
        let i = 0
        spin2win1 = setInterval(spinReel1, 50)
        function spinReel1() {
            testingNumber1++
            i++
            if (testingNumber1 >= slot1RandomNumber) {
                clearInterval(spin2win1)
            }
            if (i === 5) {
                i = 0
                slot1.src = arr[i]
            } else {
                slot1.src = arr[i]
            }
        }
    },
    spin2: function () {
        let slot2RandomNumber = Math.floor(Math.random() * 10 + 35)
        let testingNumber2 = 0
        let i = 0
        spin2win2 = setInterval(spinReel2, 50)
        function spinReel2() {
            testingNumber2++
            i++
            if (testingNumber2 >= slot2RandomNumber) {
                clearInterval(spin2win2)
            }
            if (i === 5) {
                i = 0
                slot2.src = arr[i]
            } else {
                slot2.src = arr[i]
            }
        }
    },
    spin3: function () {
        let slot3RandomNumber = Math.floor(Math.random() * 10 + 50)
        let testingNumber3 = 0
        let i = 0
        spin2win3 = setInterval(spinReel3, 50)
        function spinReel3() {
            testingNumber3++
            i++
            if (testingNumber3 >= slot3RandomNumber) {
                clearInterval(spin2win3)
                if (wager === 25 && slot1.src === slot2.src && slot2.src === slot3.src) {
                    credits += 2000
                    jackpot = jackpot - 2000
                    document.querySelector('#score').innerText = credits
                    document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
                } else if (wager === 100 && slot1.src === slot2.src && slot2.src === slot3.src) {
                    credits += jackpot
                    jackpot = 0
                    document.querySelector('#score').innerText = credits
                    document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
                } else {
                    credits -= wager
                    jackpot += wager
                    document.querySelector('#score').innerText = credits
                    document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
                }

            }
            if (i === 5) {
                i = 0
                slot3.src = arr[i]
            } else {
                slot3.src = arr[i]
            }
        }

    },
    game: function () {
        const spinReel1 = slotMachine.spin1()
        const spinReel2 = slotMachine.spin2()
        const spinReel3 = slotMachine.spin3()
    },
    prize: function () {
        if (wager === 25 && slot1.src === slot2.src && slot2.src === slot3.src) {
            credits += 2000
            jackpot = jackpot - 2000
            document.querySelector('#score').innerText = credits
            document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
        } else if (wager === 100 && slot1.src === slot2.src && slot2.src === slot3.src) {
            credits += jackpot
            jackpot = 0
            document.querySelector('#score').innerText = credits
            document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
        } else {
            credits -= wager
            jackpot += wager
            document.querySelector('#score').innerText = credits
            document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
        }
    }
}

// function spin() {

//     let testingNumber2 = 0
//     let testingNumber3 = 0

//     let j = 0
//     let k = 0


//     spin2win2 = setInterval(spinReel2, 50)
//     spin2win3 = setInterval(spinReel3, 50)

//     function spinReel1() {
//         testingNumber1++
//         i++

//     }
//     function spinReel2() {
//         testingNumber2++
//         j++
//         if (testingNumber2 >= slot2RandomNumber) {
//             clearInterval(spin2win2)
//         }
//         if (j === 5) {
//             j = 0
//             slot2.src = arr[j]
//         } else {
//             slot2.src = arr[j]
//         }
//     }
//     function spinReel3() {
//         testingNumber3++
//         k++
//         if (testingNumber3 >= slot3RandomNumber) {
//             clearInterval(spin2win3)
//             console.log('i spun')
//         }

//         if (k === 5) {
//             k = 0
//             slot3.src = arr[k]
//         } else {
//             slot3.src = arr[k]
//         }

//     }

// }

// checkForJackpot()
// updateScore()

function minBet() {
    wager = 25
    minBet = document.querySelector("#minBet").className = ""
    minBet = document.querySelector("#minBet").className += "betBorder "
    maxBet = document.querySelector("#maxBet").className -= "betBorder "
    maxBet = document.querySelector("#maxBet").className = ""
}
function maxBet() {
    wager = 100
    maxBet = document.querySelector("#maxBet").className += ""
    maxBet = document.querySelector("#maxBet").className += "betBorder "
    minBet = document.querySelector("#minBet").className -= "betBorder "
    minBet = document.querySelector("#minBet").className = ""
}

function updateScore() {
    console.log("JP is " + isJackpot)
    console.log("JM3P is " + isMatchingThree)

    if (isJackpot) {
        credits += jackpot
        jackpot = 0
        document.querySelector('#score').innerText = credits
        document.querySelector('h2').innerText = `Jackpot: ${jackpot}`

    } else if (isMatchingThree) {
        credits += 2000
        jackpot = jackpot - 2000
        document.querySelector('#score').innerText = credits
        document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
    } else {
        jackpot += 25
        credits -= 25
        document.querySelector('h2').innerText = `Jackpot: ${jackpot}`
        document.querySelector('#score').innerText = credits
    }
}

function checkForJackpot() {
    let slot1 = document.querySelector('#img1').src
    let slot2 = document.getElementById('img2').src
    let slot3 = document.getElementById('img3').src

    //way too complicated to check for a jackpot
    let jpImage = slot1.split('/')
    let jpImageLength = jpImage.length
    console.log(jpImage[jpImageLength - 1])


    if (slot1 === slot2 && slot2 === slot3 && jpImage[jpImageLength - 1] === 'pokeball.svg') {
        isJackpot = true
        console.log('jackpot!!!')
        console.log("jackpot is " + isJackpot)
    } else if (slot1 === slot2 && slot2 === slot3) {
        console.log('matching 3')
        isMatchingThree = true
        console.log("matching 3  is " + isMatchingThree)
    }
}
