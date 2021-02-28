let slot1 = document.getElementById('slot1')
let slot2 = document.getElementById('slot2')
let slot3 = document.getElementById('slot3')
let slotArray = [slot1, slot2, slot3]
let belle = 'img/belle.png'
let bonnie = 'img/bonnie.png'
let dusty = 'img/dusty.png'

let money = {
  balance: 100,
  win: 100,
  loss: 10
}

document.querySelector('h3').innerText = `Balance: ${money.balance} coins`

document.querySelector('button').addEventListener('click', slotMachine)

function slotMachine() {
//first check if they have money left
  if(money.balance === 0) {
  document.querySelector('h2').innerText = "Out of coins :("
  alert("You're out of coins! Refresh the page to start again")
  return;
}

//reset the h2 if they've won
document.querySelector('h2').innerText = ""

//Using setInterval to get pictures to flicker before showing result
let timesRun = 0
let flicker = setInterval(getPic, 50)


//create function to loop through slot array and randomly get 1 of 3 pictures
  function getPic() {
    timesRun++;
    slotArray.forEach(item => {
    let random = Math.random()
    if(random < 0.33) {
      item.src = belle
    } else if(random < 0.66) {
      item.src = bonnie
    } else {
      item.src = dusty
    }
  })
  if(timesRun === 20) {
    clearInterval(flicker)
    checkResults() // put function here so that it runs once getPic() has finished running, and when setInterval is complete
  }
}

//check if all three results were the same
  function checkResults() {
    if(slot1.src === slot2.src && slot2.src === slot3.src) {
      document.querySelector('h2').innerText = "😎 WINNER!😎"
      money.balance = money.balance + money.win
      document.querySelector('h3').innerText = `Balance: ${money.balance} coins`
    } else {
      money.balance = money.balance - money.loss
      document.querySelector('h3').innerText = `Balance: ${money.balance} coins`
    }
  }
}
