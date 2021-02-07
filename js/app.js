console.log("app.js is on")

// class PlayerMaker{
//     constructor(name){
//         this.name = name;
//         this.credit = 100;
//     }
//     //methods
//     storeName(){
//         localStorage.setItem("playerName", this.name)
//     }
//     bet(){
//         let ammount = document.querySelector("#bet-ammount").value
//     };
//     increaseMoney(ammount){
//         this.credit +=ammount
//     };
//     decreaseMoney(ammount){
//         this.credit -=ammount
//     };
// }

// class SlotMachine{
//     constructor(){
//         this.possibleValues = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j"]
//     }

// }



// document.querySelector("#start-game").addEventListener("click", play)

// function play(){
//     let name = document.querySelector("#player-name").value
//     //let name = "Amibo"
//     let player = new PlayerMaker(name)
//     console.log(player)
//     player.storeName()
//     let slot = new SlotMachine
// }

let player = {
    credit : 100
}

let slotMachine = {
    possibleValues : [0,1,2,3,4,"a","b","c","d","e"],
    firstPanel : document.getElementById("first-panel"),
    secondPanel : document.getElementById("second-panel"),
    thirdPanel : document.getElementById("third-panel"),
    roll : document.querySelector("#slot-roll"),
    //methods
    randomPick : function(){
        let random = Math.floor(Math.random()*slotMachine.possibleValues.length)
       return random
    }
}

slotMachine.roll.addEventListener("click", play)

function play(){
    let betAmmount = Number(document.querySelector("#bet-ammount").value)
    //console.log(betAmmount)
    //managePanel()
    let firstPanelPick = slotMachine.randomPick()
    let secondPanelPick = slotMachine.randomPick()
    let thirdPanelPick = slotMachine.randomPick()
    //console.log(firstPanelPick,secondPanelPick,thirdPanelPick)
    slotMachine.firstPanel.innerText = slotMachine.possibleValues[firstPanelPick]
    slotMachine.secondPanel.innerText = slotMachine.possibleValues[secondPanelPick]
    slotMachine.thirdPanel.innerText = slotMachine.possibleValues[thirdPanelPick]
    if (firstPanelPick === secondPanelPick || secondPanelPick === thirdPanelPick || firstPanelPick === thirdPanelPick){
        player.credit += betAmmount
        console.log(player.credit)
    }else if (firstPanelPick === secondPanelPick && firstPanelPick === thirdPanelPick){
        player.credit += betAmmount * 3
        console.log(player.credit)
    } else {
        player.credit -= betAmmount
        console.log(player.credit)
    } 
}











// if(!localStorage.getItem("playerName")){
    //cria um jogador com basico
// }else {
//     let name = localStorage.getItem("playerName")
//     alert(`welcome back, ${name}!`)

// }

