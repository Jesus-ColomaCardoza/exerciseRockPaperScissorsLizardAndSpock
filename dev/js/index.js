const formDates = document.getElementById('form-dates');
const optionsPlayer = document.getElementById('optionsplayer');
const timer = document.getElementById('timer');
const marker = document.getElementById('marker');
const choicePlayer=document.getElementById('choiceplayer');
const choiceComputer=document.getElementById('choicecomputer');
const arrayOptions=Array.from(document.querySelectorAll('.options__img'));

//variables
let countWin;
let countPlayer;
let countComputer;
let optionPlayer;
let optionComputer;
let rulesGame = [];
let seconds;
let timerInterval;
let playing;

//initialization
countPlayer = 0;
countComputer = 0;
gameRules = new Array(5);

//we generate the rules game using a two-dimensional array
for (let i = 0; i < 5; i++) {
    gameRules[i] = new Array(5);
}

//rules rock
gameRules[0][0] = -1
gameRules[0][1] = 0
gameRules[0][2] = 1
gameRules[0][3] = 1
gameRules[0][4] = 0
//rules paper
gameRules[1][0] = 1
gameRules[1][1] = -1
gameRules[1][2] = 0
gameRules[1][3] = 0
gameRules[1][4] = 1
//rules scissors
gameRules[2][0] = 0
gameRules[2][1] = 1
gameRules[2][2] = -1
gameRules[2][3] = 1
gameRules[2][4] = 0
//rules lizard
gameRules[3][0] = 0
gameRules[3][1] = 1
gameRules[3][2] = 0
gameRules[3][3] = -1
gameRules[3][4] = 1
//rules spock
gameRules[4][0] = 1
gameRules[4][1] = 0
gameRules[4][2] = 1
gameRules[4][3] = 0
gameRules[4][4] = -1

formDates.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('form-dates__startgame') && formDates.number.value > 0) {
        countWin = parseInt(formDates.number.value);
        console.log(countWin);
        startTimer();
        startGame();
        formDates.reset();
    } else if (formDates.number.value < 0) {
        console.log('Enter number of rounds');
    }
})
optionsPlayer.addEventListener('click', (e) => {
    if (e.target.classList.contains('options__img')) {
        if (seconds>=0) {// the timer doesn't finish yet
            //we get the options that they (player and computer) chose
            optionPlayer = parseInt(e.target.dataset.id);
            optionComputer=getOptionComputer();
            
            //we show the player choice in the screem on the html
            showChoise(choicePlayer,optionPlayer)
            showChoise(choiceComputer,optionComputer);
            
            //we validate according the game rules 
            validate(optionPlayer,optionComputer);
            
            if (playing) {//When we still are playing
                let i = 0
                let newRoundInterval = setInterval(() => {
                    //we place the animation
                    setTimeout(() => {
                        //we remove the animation
                    }, 500)
                    i++;
                    console.log(i);
                    if (i == 3) {
                        clearInterval(newRoundInterval);
                        startTimer();
                    }
                }, 1500)
            }
            //we update the marker
            updateMarker();
            //we stop the timer
            clearInterval(timerInterval);
        }else{
            console.log('You ran out of time');

        }
    }
})

const validate = (optionPlayer,optionComputer) => {
    console.log('player choise', optionPlayer);
    console.log('computer choise', optionComputer);

    if (gameRules[optionPlayer][optionComputer] == 1) {
        countPlayer++;
        console.log('player win');
        if (countPlayer == countWin) {
            console.log('player won the game');
            stopGame();
        }
    } else if (gameRules[optionPlayer][optionComputer] == 0) {
        countComputer++;
        console.log('computer win');
        if (countComputer == countWin) {
            console.log('computer won the game');
            stopGame();
        }
    } else if (gameRules[optionPlayer][optionComputer] == -1) { 
        //message: dead heat
        console.log('dead heat');
    }    
}

const updateMarker = () => {
    marker.textContent=`👤 ${countPlayer} - ${countComputer} 🖥️`
}
const startTimer = () => {
    seconds = 5;
    timerInterval = setInterval( () => {
        timer.textContent = `${seconds} seconds`;
        seconds--;
        if (seconds < 0) {
            clearInterval(timerInterval);
        }
    }, 1000)
}
const getOptionComputer = () => {
    let random = parseInt(Math.random() * 5)
    return random;
}
const getOptionPlayer = () => {
    return optionPlayer;
}
const startGame = () => {
    playing=true;
}
const stopGame = () => {
    playing=false;
}
const showChoise=(choice,option)=>{
    choice.firstElementChild.setAttribute('src',`${arrayOptions[option].src}`);
}