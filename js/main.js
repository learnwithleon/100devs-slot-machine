console.log("Test");

const items = ['cherry','diamond','lemon','seven','watermelon'];
const reel1 = document.querySelector('.reel1');
const reel2 = document.querySelector('.reel2');
const reel3 = document.querySelector('.reel3');
const reelArr=[reel1,reel2,reel3];
const total=0;
const winningCombs=[[3,2,3],[2,0,2],[4,2,0],[1,4,1],[0,0,1],[3,3,2]];
const coins=500;
const coinsLeft = document.querySelector('#coinsLeft');
const winnings = document.querySelector('#winnings');

document.querySelector('#rollMin').addEventListener('click', function(){
    runGame("min");
});
document.querySelector('#rollMax').addEventListener('click', function(){
    runGame("max");
});

function runGame(bet){
    if(bet=='min'&&coinsLeft.innerText<10){
        alert("You can't play anymore. There's not enough coins. Maybe refresh?");
        return;
    }
    else if(bet=='max'&&coinsLeft.innerText<500){
        alert("You can't bet max. There's not enough coins. Maybe try betting min now, ya goof.");
        return;
    }
    console.log(bet);
    let roll=[];
    for(let i=0;i<3;i++){
        roll.push(getItem());
    }
    console.log(roll);
    displayRoll(roll);
    let winOrNot;
    setTimeout(function(){
        console.log("Hello");
        winOrNot=checkComb(roll);
        console.log(winOrNot);
        if(!winOrNot){
            alert("You didn't win anything");
        }
        else if(winOrNot===1){
            alert("JACKPOT! YOU WIN 50K CONGRATS YAY");
        }
        else{
            alert("YOU WIN WITH ONE OF THE WINNING COMBINATIONS!");
        }
        updateStuff(bet, winOrNot);
    },3500);
}

function updateStuff(bet, winOrNot){
    if(bet=='min'){
        coinsLeft.innerText=(Number(coinsLeft.innerText)-10).toString();
    }
    else{
        coinsLeft.innerText=(Number(coinsLeft.innerText)-500).toString();
    }
    if(winOrNot==1){
        console.log('Winnings: '+Number(winnings.innerText));
        winnings.innerText=(Number(winnings.innerText)+50000).toString();
        coinsLeft.innerText=(Number(coinsLeft.innerText)+50000).toString();
    }
    else if(winOrNot==2){
        if(bet=='min'){
            winnings.innerText=(Number(winnings.innerText)+200).toString();
            coinsLeft.innerText=(Number(coinsLeft.innerText)+200).toString();
        }
        else{
            winnings.innerText=(Number(winnings.innerText)+2000).toString();
            coinsLeft.innerText=(Number(coinsLeft.innerText)+2000).toString();
        }
    }

}

function displayRoll(roll){
    let n=0;
    for(const reel of reelArr){
        reel.classList.toggle("hidden");
    }
        reel1.src="img/waiting.png";
        reel2.src="img/waiting.png";
        reel3.src="img/waiting.png";
        console.log("print");
        setTimeout(function(){
            reel1.src="img/"+items[roll[0]]+'.svg';
            setTimeout(function(){ 
                reel2.src="img/"+items[roll[1]]+'.svg';
                setTimeout(function(){
                    reel3.src="img/"+items[roll[2]]+'.svg';
                },1000)
            },1000)
        }
        ,1000)
    for(const reel of reelArr){
        reel.classList.toggle("hidden");
    }
}

function checkComb(roll){
    console.log(roll);
    console.log(winningCombs.map(el=>el.join("")).includes(roll.join("")));
    if(roll.filter(el=>el===roll[0]).length==3){
        console.log("WIN");
        return 1;
    }
    else if(winningCombs.map(el=>el.join("")).includes(roll.join(""))){
        return 2;
    }
    else{
        return null;
    }
}

function getItem(){
    return Number((Math.random()*5).toString().slice(0,1));
}