console.log("app.js is on")

class PlayerMaker{
    constructor(){
        this.name = prompt("what is your name", "Benedict")
        this.credit = 400
    }
}

let player = new PlayerMaker


let slotMachine = {
    possibleValues : [0,1,2,3,4,5,6,7,8,9], //,"a","b","c","d","e"
    firstPanel : document.getElementById("first-panel"),
    secondPanel : document.getElementById("second-panel"),
    thirdPanel : document.getElementById("third-panel"),
    roll : document.querySelector("#slot-roll"),
    resultDisplay: document.querySelector("#result"),
    //methods
    randomPick : function(){
        let random = Math.floor(Math.random()*slotMachine.possibleValues.length)
       return random
    }
}

slotMachine.roll.addEventListener("click", play)

function play(){
    if (player.credit <= 0){
        alert("Your monies is gonz, boi.")
        return
    }
    let betAmmount = Number(document.querySelector("#bet-ammount").value)
    let firstPanelPick = slotMachine.randomPick()
    let secondPanelPick = slotMachine.randomPick()
    let thirdPanelPick = slotMachine.randomPick()

    slotMachine.firstPanel.innerText = slotMachine.possibleValues[firstPanelPick]
    slotMachine.secondPanel.innerText = slotMachine.possibleValues[secondPanelPick]
    slotMachine.thirdPanel.innerText = slotMachine.possibleValues[thirdPanelPick]
    //console.log(firstPanelPick,secondPanelPick,thirdPanelPick)
    if (firstPanelPick === secondPanelPick && firstPanelPick === thirdPanelPick  && secondPanelPick === thirdPanelPick){
        let creditAmmount = Number((betAmmount * 5).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Jackpot! You won $${creditAmmount}! Current credit is ${player.credit}` 
        slotMachine.resultDisplay.classList.add("win")
    }
    else if(firstPanelPick == secondPanelPick-1 && secondPanelPick == thirdPanelPick-1){
        let creditAmmount = Number((betAmmount * 1.3).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Takeoff bonus! You won $${creditAmmount}! Current credit is ${player.credit}` 
        slotMachine.resultDisplay.classList.remove("lose")
        slotMachine.resultDisplay.classList.add("win")
    }
    else if(firstPanelPick == secondPanelPick+1 && secondPanelPick == thirdPanelPick+1){
        let creditAmmount = Number((betAmmount * 1.3).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `Landing bonus! You won $${creditAmmount}! Current credit is ${player.credit}` 
        slotMachine.resultDisplay.classList.remove("lose")
        slotMachine.resultDisplay.classList.add("win")
    }
    else if (firstPanelPick === secondPanelPick || secondPanelPick === thirdPanelPick || firstPanelPick === thirdPanelPick){
        let creditAmmount = Number((betAmmount * 1).toFixed(2))
        player.credit += creditAmmount
        slotMachine.resultDisplay.innerText = `You won your $${creditAmmount} back! Current credit is ${player.credit}` 
        slotMachine.resultDisplay.classList.remove("lose")
        slotMachine.resultDisplay.classList.add("win")
    }else {
        player.credit -= betAmmount
        slotMachine.resultDisplay.innerText = `You lost $${betAmmount}! We are sure you can win on the next round, ${player.name}. Current credit is ${player.credit}` 
        slotMachine.resultDisplay.classList.add("lose")
    } 
}











// if(!localStorage.getItem("playerName")){
    //cria um jogador com basico
// }else {
//     let name = localStorage.getItem("playerName")
//     alert(`welcome back, ${name}!`)

// }

