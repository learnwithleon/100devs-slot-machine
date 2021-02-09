console.log("app.js is on")

let player = {
    name : "guest",
    credit : 400,
    betAmmount : Number(document.querySelector("#bet-ammount").value)
}

let slotMachine = {
    possibleValues : [
        `<i class="fas fa-chess-queen"></i>`,
        `<i class="fas fa-chess-knight"></i>`,
        `<i class="fas fa-chess-king"></i>`,
        `<i class="fas fa-chess-bishop"></i>`,
        `<i class="fas fa-chess-rook"></i>`,
        `<i class="fas fa-chess-pawn"></i>`,
        `<i class="fas fa-heart"></i>`,
        `<i class="fas fa-lemon"></i>`,
        `<i class="fas fa-apple-alt"></i>`,
        `<i class="fas fa-carrot"></i>`,
    ], 
    firstPanel : document.querySelector("#first-panel p"),
    secondPanel : document.querySelector("#second-panel p"),
    thirdPanel : document.querySelector("#third-panel p"),
    roll : document.querySelector("#slot-roll"),
    resultDisplay: document.querySelector("#result"),
    currentCredit : document.querySelector("#current-credit"),
    //methods
    randomPick : function(){
        let random = Math.floor(Math.random()*slotMachine.possibleValues.length)
        return random
    },
    modalPopUp : function(){
        document.querySelector("#modal").classList.add("visible");
    // //make a purchase
        document.querySelector("#purchase-ammount-btn").addEventListener("click", (e) => {
            e.preventDefault()
            player.credit += Number(document.querySelector("#purchase-ammount").value)
            document.querySelector("#modal").classList.remove("visible");
            return
        })
    },
    

}

slotMachine.roll.addEventListener("click", play)

function play(){
    //pick the player name to populate the dom
    player.name = document.getElementById("player-name").value;

    //player is broke, no play
    if (player.credit <= 0){
        slotMachine.modalPopUp()
        return
    }

    animateRoll()

    //valid lever pull
    player.betAmmount = Number(document.querySelector("#bet-ammount").value)
    //validate the ammount
    if (player.betAmmount > player.credit){
        player.betAmmount = player.credit
        player.betAmmount.value = player.credit
    }

    let firstPanelPick = slotMachine.randomPick()
    let secondPanelPick = slotMachine.randomPick()
    let thirdPanelPick = slotMachine.randomPick()

    slotMachine.firstPanel.innerHTML = slotMachine.possibleValues[firstPanelPick]
    slotMachine.secondPanel.innerHTML = slotMachine.possibleValues[secondPanelPick]
    slotMachine.thirdPanel.innerHTML = slotMachine.possibleValues[thirdPanelPick]
    //console.log(firstPanelPick,secondPanelPick,thirdPanelPick)
    if (firstPanelPick === secondPanelPick && firstPanelPick === thirdPanelPick  && secondPanelPick === thirdPanelPick){
        let creditAmmount = Number((player.betAmmount * 5).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Jackpot! You won $${creditAmmount}!` 
        slotMachine.currentCredit.innerText = `Current credit is ${player.credit}`
        textClassToggler("win")
    }
    else if(firstPanelPick <= 5 && secondPanelPick <= 5 && thirdPanelPick <= 5){
        let creditAmmount = Number((player.betAmmount * 1.1).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Chess bonus! You won $${creditAmmount}!` 
        slotMachine.currentCredit.innerText = `Current credit is ${player.credit}`
        textClassToggler("win")
    }
    else if(firstPanelPick >= 7 && secondPanelPick >= 7 && thirdPanelPick >= 7){
        let creditAmmount = Number((player.betAmmount * 1.1).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Healthy diet bonus! You won $${creditAmmount}!` 
        slotMachine.currentCredit.innerText = `Current credit is ${player.credit}`
        textClassToggler("win")
    }
    else if (firstPanelPick === secondPanelPick || secondPanelPick === thirdPanelPick || firstPanelPick === thirdPanelPick){
        let creditAmmount = Number((player.betAmmount * 1).toFixed(2))
        slotMachine.resultDisplay.innerText = `You won a simple roll with a pair of equals. Get your $${creditAmmount} back!` 
        slotMachine.currentCredit.innerText = `Current credit is ${player.credit}`
        textClassToggler("win")
    }else {
        player.credit -= player.betAmmount
        slotMachine.resultDisplay.innerText = `You lost $${player.betAmmount}! We are sure you can win on the next round, ${player.name}.` 
        slotMachine.currentCredit.innerText = `Current credit is ${player.credit}`
        textClassToggler("lose")
    } 
}

function textClassToggler(condition){
    if (condition === "win"){
        slotMachine.resultDisplay.classList.remove("lose")
        slotMachine.resultDisplay.classList.add("win")
    } else{
        slotMachine.resultDisplay.classList.remove("win")
        slotMachine.resultDisplay.classList.add("lose")
    }
}

function animateRoll(){
    let time = Math.floor(Math.random()*2500)

    console.log(time)
    let interval = function (){}
    slotMachine.firstPanel.innerHTML = ""
    slotMachine.secondPanel.innerHTML = ""
    slotMachine.thirdPanel.innerHTML = ""
}

