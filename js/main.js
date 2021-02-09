

document.addEventListener('DOMContentLoaded',()=>{
    const spinBtn = document.querySelector('#spinBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const plus = document.querySelector('#plus');
    const minus = document.querySelector('#minus');
    const bet = document.querySelector('#bet');
    const winnings = document.querySelector('#winnings');
    let betLevel = 1;


    if(localStorage.getItem('winnings')){
        winnings.innerHTML = localStorage.getItem('winnings');
    }else{
        winnings.innerHTML = 0;
    }




    let machine = new SlotMachine();

    spinBtn.addEventListener('click',()=>{
        
        betLevel = parseInt(bet.innerHTML)
        let reward = machine.spin();
        console.log(reward,'hello',betLevel)

        winnings.innerHTML = parseInt(winnings.innerHTML) + reward*parseInt(betLevel);
        localStorage.setItem('winnings',parseInt(winnings.innerHTML))
    })
    resetBtn.addEventListener('click',()=>{
        winnings.innerHTML = 200;
        localStorage.getItem('winnings', 200)
    })
    plus.addEventListener('click', ()=>{
        let betLevel = parseInt(bet.innerHTML)
        console.log('hello')
        if(betLevel < 3){
            betLevel += 1;
            bet.innerHTML = betLevel;
        }
    })
    minus.addEventListener('click',()=>{
        let betLevel = parseInt(bet.innerHTML);

        if (betLevel > 1){
            betLevel -= 1;
            bet.innerHTML = betLevel;
        }
    })


})


    
    function SlotMachine(){
        const choiceOne = document.querySelector('#one');
        const choiceTwo = document.querySelector('#two');
        const choiceThree = document.querySelector('#three');
    
        const possibilities = {
            'wild':0,
            'seven':0,
            'bar':0,
            'blue':0,
            'white':0,
            'red':0,
        }

        const possibleColors = ['red', 'white', 'blue']
        const possibleSymbols = ['seven','wild','bar'] 

        this.spin = () =>{
            winnings.innerHTML = parseInt(winnings.innerHTML) - parseInt(bet.innerHTML);
            let results = generatePicks();
            displayResults(results);
            let reward = calculateReward(results);

            
            return reward

        }

        this.increaseBet = () =>{}

        this.decreaseBet = () =>{}

        function generatePicks(){

            let picks = {'one':{'color':'','symbol':''},'two':{'color':'','symbol':''},'three':{'color':'','symbol':''}}

            picks.one.color = randomColor();
            picks.one.symbol = randomSymbol();
            picks.two.color = randomColor();
            picks.two.symbol = randomSymbol();
            picks.three.color = randomColor();
            picks.three.symbol = randomSymbol();

            return picks
        }

        function displayResults(results){
            if (results.one.symbol == 'seven'){
                choiceOne.innerHTML = '7'
            }else{
                choiceOne.innerHTML = results.one.symbol
            }
            if (results.two.symbol == 'seven'){
                choiceTwo.innerHTML = '7'
            }else{
                choiceTwo.innerHTML = results.one.symbol
            }
            if (results.three.symbol == 'seven'){
                choiceThree.innerHTML = '7'
            }else{
                choiceThree.innerHTML = results.one.symbol
            }
            choiceOne.style.color = results.one.color;
            choiceTwo.style.color = results.two.color;
            choiceThree.style.color = results.three.color;
            
        }

        function calculateReward(results){
            console.log(results)
            symbolCounter(results.one.symbol)
            symbolCounter(results.two.symbol)
            symbolCounter(results.three.symbol)

            colorCounter(results.one.color)
            colorCounter(results.two.color)
            colorCounter(results.three.color)

            let winnings = 0;
            console.log(possibilities.red,possibilities.white, possibilities.blue)
            console.log(possibilities.bar)

            if(possibilities.wild == 3){
                winnings = 4000
            }else if(possibilities.red == 1 && possibilities.white == 1 && possibilities.blue == 1 && possibilities.seven == 3){
                winnings = 400
            }else if(possibilities.red == 3 && possibilities.seven == 3){
                winnings = 300
            }else if(possibilities.white == 3 && possibilities.seven == 3){
                winnings = 200    
            }else if(possibilities.blue == 3 && possibilities.seven == 3){
                winnings = 100
            }else if(possibilities.seven == 3){
                winnings = 50
            }else if(possibilities.bar == 3 && possibilities.blue == 3){
                winnings = 40
            }else if(possibilities.bar == 3 && possibilities.white == 2){
                winnings = 20
            }else if(possibilities.red == 1 && possibilities.white == 1 && possibilities.blue == 1){
                winnings = 20
            }else if(possibilities.bar == 3 && possibilities.red == 3){
                winnings = 10
            }else if(possibilities.bar == 3){
                winnings = 5;
            }else if(possibilities.blue == 3 || possibilities.red == 3 || possibilities.white == 3){
                winnings = 2;
            }else{
                winnings = 0;
            }

            resetSpin();

            return winnings
        }

        function randomColor(){
            return possibleColors[Math.floor(Math.random()*3)]
        }

        function randomSymbol(){
            return possibleSymbols[Math.floor(Math.random()*3)]
        }
        function colorCounter(result){
            switch (result){
                case 'red':
                    possibilities.red += 1
                    break;
                case 'white':
                    possibilities.white += 1
                    break;
                case 'blue':
                    possibilities.blue += 1
                    break;
            }
            console.log(possibilities)

        }
        function symbolCounter(result){
            switch (result){
                case 'seven':
                    possibilities.seven += 1
                    break;
                case 'wild':
                    possibilities.wild += 1
                    break;
                case 'bar':
                    possibilities.bar += 1
                    break;
            }
        }
        function resetSpin(){
            possibilities.red = 0;
            possibilities.white = 0;
            possibilities.blue = 0;
            possibilities.wild = 0;
            possibilities.seven = 0;
            possibilities.bar = 0;
    
        }
    }