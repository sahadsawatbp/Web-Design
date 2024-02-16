var turn = 'O'
var win = false;
var winner = '';
var blocks = document.querySelectorAll('.table-block');
var turnObject = document.getElementById('turn');

newGame();

for (var block of blocks) {
    // 1. Modify the code here to check click event on each block
    block.onclick = function (event) {
        // modify the condition here to continue the game play as long as there is no winner
        if (game_continue) {
            // 4. Modify the code here to check whether the clicking block is avialable.            
            event.target.innerHTML = turn;
            checkResult();
        }
    }
}

function checkResult() {
    // 2. Modify the code here to check whether someone win the game

    if (winning_condition) {
        //Game end and someone wins the game
        winner = turn;
        turnObject.innerHTML = "Game win by " + winner;
    } else if (draw_condition) {
        // Game end and no-one wins the game
        turnObject.innerHTML = "Game draw";
    } else {
        // The game is on going
        turn = turn === 'O' ? 'X' : 'O';
        turnObject.innerHTML = "Turn: " + turn;
    }
}
function newGame() {
    turn = 'O';
    turnObject.innerHTML = "Turn: " + turn;
    winner = '';
    win = false;
    // 3. Modify the code here to reset the game to initial state
}
