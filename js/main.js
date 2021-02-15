console.log("Test");

const items = ['cherry','diamond','lemon','seven','watermelon'];
const reel1 = document.querySelector('.reel1');
const reel2 = document.querySelector('.reel2');
const reel3 = document.querySelector('.reel3');
const reelArr=[reel1,reel2,reel3];
const total=0;
const winningCombs=[[3,2,3],[2,0,2],[4,2,0],[1,4,1],[0,0,1],[3,3,2]];

document.querySelector('#roll').addEventListener('click', runGame);

function runGame(){
    let roll=[];
    for(let i=0;i<3;i++){
        roll.push(getItem());
    }
    console.log(roll);
    displayRoll(roll);
    checkComb(roll);
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
    setTimeout(function(){
    console.log(roll);
    if(roll.filter(el=>el===roll[0]).length==3){
        alert("JACKPOT!");
    }
    else if(winningCombs.includes(roll)){
        alert("YOU WIN X AMOUNT");
    }
    else{
        alert("YOU DIDNT WIN ANYTHING")
    }

    },3500)
}

function getItem(){
    return Number((Math.random()*5).toString().slice(0,1));
}