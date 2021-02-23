//Get the deck
let deckId = ''
let gameCount = 1
let cashMoney = 0

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
const bgAudio = document.querySelector("#backgroundAudio")
bgAudio.play()
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AH,AC,AD,KS,KH,KC,KD,QS,QH,QC,QD,AS,AH,AC,AD,KS,KH,KC,KD,QS,QH,QC,QD,AS,AH,AC,AD,KS,KH,KC,KD,QS,QH,QC,QD')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        const dId = data.deck_id

              const url = `https://deckofcardsapi.com/api/deck/${dId}/draw/?count=3`

               fetch(url)
                  .then(res => res.json()) // parse response as JSON
                  .then(data => {
                    console.log(data)
                          let val1 = Number(cardValue( data.cards[0].value ))
                          let val2 = Number(cardValue( data.cards[1].value ))
                          let val3 = Number(cardValue( data.cards[2].value ))
                          let suit1 = data.cards[0].value
                          let suit2 = data.cards[1].value
                          let suit3 = data.cards[2].value
                          // console.log(data.cards[0])
                          document.querySelector('#card1').src = data.cards[0].image
                          document.querySelector('#card2').src = data.cards[1].image
                          document.querySelector('#card3').src = data.cards[2].image
                          document.querySelector('.spinCount').innerText = `spins ${gameCount++}`

                                if(val1 === val2 && val2 === val3 && (val1+val2+val3)>=39 ){
                                    const megajackpotAudio = document.querySelector('#megaJackpotAudio')
                                     megajackpotAudio.play()

                                  document.querySelector('.result').innerText = "MEGA JACKPOT!"
                                  
                                  document.querySelector('h5').innerText = `$ ${cashMoney += 750}` 
                                }
                                else if(val1 === val2 && val2 === val3){
                                 const jackpotAudio = document.querySelector('#jackpotAudio')
                                 jackpotAudio.play()
                                  document.querySelector('.result').innerText = "JACKPOT"
                                   
                                  document.querySelector('h5').innerText = `$ ${cashMoney += 250}` 
                                }
                                else if(suit1 == "ACE" && suit2 == "ACE" || suit1 == "ACE" && suit3 == "ACE" || suit2 == "ACE" && suit3 == "ACE"){
                                  
                                  document.querySelector('.result').innerText = "LUCKY PAIR"
                                  document.querySelector('h5').innerText = `$ ${cashMoney += 100}`
                                }
              
                                else{
                                  document.querySelector('.result').innerText = "TRY AGAIN"
                                }

      
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  

}

function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return val
  }
}
