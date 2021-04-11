//Go to read me


//vars
const statusDisplay = document.querySelector(".game--status");
const compButn = document.querySelector(".game--compter");

let gameOn = true;
let currentPlayer = "X";
let lastTurn = "O";
let vsComp = false;

let gameState = ["", "", "", "", "", "", "", "", ""];


const winMessage = () => `${lastTurn} is your champion!`;
const drawMessage = () => `Both of you lose`;
const playerTurn = () => `${currentPlayer}'s turn`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
statusDisplay.innerHTML = playerTurn();


//event listners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelector(".game--compter").addEventListener("click", compSelect);
//functions

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    if (gameState[clickedCellIndex] !== "") {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}


function checkGame() {
    if (gameOn != true) {
        return false;
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "") {
        playComp();
    }
    let randVar = checkGame();
    if (randVar === false) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer;
    statusDisplay.innerHTML = playerTurn();

    handlePlayerChange();


}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    lastTurn = lastTurn === "O" ? "X" : "O";
    statusDisplay.innerHTML = playerTurn();
}
function handleResultValidation() {

    let roundWin = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWin = true;
            break;
        }
    }
    if (roundWin) {
        winnerHandler();

        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    if (vsComp == true && currentPlayer == "O") {

        playComp();
        return;
    }

}

function winnerHandler() {

    statusDisplay.innerHTML = winMessage();
    gameOn = false;

}

function handleRestartGame() {
    gameOn = true;
    vsComp = false;
    currentPlayer = "X";
    lastTurn = "O";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = playerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}



function playComp(){
    
}






function compSelect() {
    vsComp = true;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





function randTitle(played) {
    let openSPots = [];
    played = false
    for (n = 0; n < gameState.length; n++) {
        if (gameState[n] === "") {
            openSPots.push(gameState[n]);
        }
    }

    let ranNum = getRandomInt(0, openSPots.length);
    openSPots[ranNum] = "O";

    for (n = ranNum; n < gameState.length; n++) {
        if (gameState[n] == "") {
            let cells = document.querySelectorAll(".cell");
            handleCellPlayed(cells[n], cells[n].getAttribute("data-cell-index"));
            handleResultValidation();
            return;
        }
    }

}

