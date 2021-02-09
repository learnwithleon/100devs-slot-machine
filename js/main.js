// //Event Listeners
document.querySelector('#min-bet').addEventListener('click',minBet)//minimum bet event
document.querySelector('#max-bet').addEventListener('click',maxBet)//maximum bet event
document.querySelector('#spin').addEventListener('click',spin)//spin event
document.querySelector('#reset').addEventListener('click',reset)//reset game event

let playerBalance = 100//sets default user balance to 100

document.querySelector('#current-bet').value = 1//sets value of default bet to 1 credit

function randomNum(){
  return Math.floor(Math.random() * 5 + 1)
}//returns random num 1-5

function minBet(){
  document.querySelector('#current-bet').value = 1//sets value to 1
  document.querySelector('#current-bet').innerText = 1//set text to 1
}

function maxBet(){
  document.querySelector('#current-bet').value = 3//sets value to 3
  document.querySelector('#current-bet').innerText = 3//sets text to 3
  }

function spin(){
  let currentBetAmt = document.querySelector('#current-bet').value
  let balanceAmt = document.querySelector('#balance').innerText
  let winAmt = document.querySelector('#win-amt').innerText

  document.querySelector('#win-amt').innerText = 0

  let num1 = randomNum()
  let num2 = randomNum()
  let num3 = randomNum()

  document.querySelector('#item1').innerText = num1
  document.querySelector('#item2').innerText = num2
  document.querySelector('#item3').innerText = num3


    if(num1 === num2 && num1 === num3){
  
      playerBalance += currentBetAmt * 2//adds bet amt to balance
      document.querySelector('#win-amt').innerText = currentBetAmt * 2//updates win amt
      document.querySelector('#balance').innerText = playerBalance//updates bet amt on DOM
   
      document.querySelector('#jackpot-txt').style.display = "block"//shows Jackpot on DOM
       }else {
        playerBalance -= currentBetAmt//substracts bet amt from balance
        document.querySelector('#balance').innerText = playerBalance//shows updated balance on DOM
        document.querySelector('#jackpot-txt').style.display = "none"//hides Jackpot on DOM
        }
      let balancePtsTwo = Number(document.querySelector('#balance').innerText)
      if(balancePtsTwo < 1){
      alert("Game Over")
      return reset()
      }
}

  function reset(){
    if(confirm("Are you sure you want to reset?")){
        playerBalance = 100
        document.querySelector('#balance').innerText = playerBalance
        document.querySelector('#win-amt').innerText = 0
        document.querySelector('#jackpot-txt').style.display = "none"
        document.querySelector('#item1').innerText = "-"
        document.querySelector('#item2').innerText = "-"
        document.querySelector('#item3').innerText = "-"
    }
 
}




