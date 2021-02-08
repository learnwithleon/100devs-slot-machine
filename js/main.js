document.querySelector("#reset").addEventListener("click",resetGame)
document.querySelector("#wheel").addEventListener("click",rotateWheel)
let tmpCash = ""
let tmpBet = 50
document.querySelector("input").value = 50

if (!localStorage.getItem ("cash")) {
    localStorage.setItem ("cash","1000")
    document.querySelector("h3").innerText = 1000
    document.querySelector("input").value = 50
} else {
    tmpCash = localStorage.getItem("cash")
    document.querySelector("h3").innerText = tmpCash
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game (all progress is deleted)?')) {
        tmpCash = 1000
        tmpBet = 50
        document.querySelector("h3").innerText = 1000
        document.querySelector("input").value = 50
        localStorage.setItem ("cash","1000")
    }
}

function rotateWheel() {
    tmpCash = Number(document.querySelector("h3").innerText)
    tmpBet = Number(document.querySelector("input").value)
    tmpErg = []
    for (let i=1; i<=3; i++) {
        rotateResult = Math.floor(Math.random()*9) + 1
        let tmpResult = ""
        switch (rotateResult) {
            case 1:
                tmpResult = "fas fa-star"
                break;
            case 2: case 6:
                tmpResult = "fas fa-apple-alt"
                rotateResult = 2
                break;
            case 3: case 7:
                tmpResult = "fas fa-lemon"
                rotateResult = 3
                break;
            case 4: case 8:
                tmpResult = "fas fa-carrot"
                rotateResult = 4
                break;
            case 5: case 9:
                tmpResult = "fas fa-bus-alt"
                rotateResult = 5
                break;
        }
        tmpErg.push(rotateResult)
        document.querySelector("#wheel"+String(i)).className = tmpResult
    }

    console.log(tmpCash)
    console.log(tmpBet)
    console.log(tmpErg)

    if (tmpErg[0] === tmpErg[1] && tmpErg[0] === tmpErg[2]) {
        if (tmpErg[0] === 1) {
            document.querySelector("h1").innerText = `You win - 10 times your bet!`
            tmpCash = Number(tmpCash) + (tmpBet * 10)
        } else{
            document.querySelector("h1").innerText = `You win - 5 times your bet!`
            tmpCash = Number(tmpCash) + (tmpBet * 5)
        }
    } else if (tmpErg[0] === tmpErg[1] || tmpErg[0] === tmpErg[2] || tmpErg[1] === tmpErg[2]) {
        document.querySelector("h1").innerText = `You win - 2 times your bet!`
        tmpCash = Number(tmpCash) + (tmpBet * 2)
    } else {
        document.querySelector("h1").innerText = `You loose...!`
        tmpCash = Number(tmpCash) - tmpBet
    }
    localStorage.setItem ("cash",tmpCash)
    document.querySelector("h3").innerText = tmpCash
}
