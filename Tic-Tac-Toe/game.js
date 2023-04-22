class Board {
    _board = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            this._board[i] = [];
            for (let j = 0; j < 3; j++) {
                this._board[i][j] = ' ';
            }
        }
    }

    makeMove(id, char) {
        this._board[Math.floor(id / 3)][id % 3] = char;
        console.table(this._board);
    }

    checkBoard(char) {
        return (this._board[0][0] == char && this._board[1][0] == char && this._board[2][0] == char) ||
            (this._board[0][1] == char && this._board[1][1] == char && this._board[2][1] == char) ||
            (this._board[0][2] == char && this._board[1][2] == char && this._board[2][2] == char) ||
            (this._board[0][0] == char && this._board[0][1] == char && this._board[0][2] == char) ||
            (this._board[1][0] == char && this._board[1][1] == char && this._board[1][2] == char) ||
            (this._board[2][0] == char && this._board[2][1] == char && this._board[2][2] == char) ||
            (this._board[0][0] == char && this._board[1][1] == char && this._board[2][2] == char) ||
            (this._board[0][2] == char && this._board[1][1] == char && this._board[2][0] == char);
    }

    getFreeCells() {
        const cellsId = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this._board[i][j] == ' ') {
                    cellsId.push(i * 3 + j);
                }
            }
        }
        return cellsId;
    }
}

class AIeasy {
    makeMove() {
        const freeCells = board.getFreeCells();
        const randomId = Math.floor(Math.random() * freeCells.length);
        getMove(freeCells[randomId]);
    }
}

class AImedium {
    makeMove() {

    }
}

class AIhard {
    makeMove() {

    }
}

function getMove(id) {
    const cell = document.getElementById(id);

    if (!isStart || cell.innerHTML != '') return;

    cell.innerHTML = currentMove % 2 == 0 ? cross : circle;

    board.makeMove(id, currentMove % 2 == 0 ? 'x' : 'o');
    if (board.checkBoard('x')) {
        document.getElementById('winner').innerHTML = "X Wins!";
        isStart = false;
        return;
    } else if (board.checkBoard('o')) {
        document.getElementById('winner').innerHTML = "O Wins!";
        isStart = false;
        return;
    }

    currentMove++;

    if (currentMove % 2 == 0 && player1 != 'User') {
        setTimeout(player1.makeMove, 500);
    }
    if (currentMove % 2 == 1 && player2 != 'User') {
        setTimeout(player2.makeMove, 500);
    }
}

function init() {
    currentMove = 0;
    isStart = true;
    board = new Board();
}

function startGame() {
    // restart
    for (let i = 0; i <= 8; i++) {
        document.getElementById(i).innerHTML = '';
    }
    document.getElementById('winner').innerHTML = '';
    init();
    //

    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    switch (player1) {
        case 'AIeasy':
            player1 = new AIeasy();
            break;
        case 'AImedium':
            player1 = new AImedium();
            break;
        case 'AIhard':
            player1 = new AIhard();
            break;
    }
    switch (player2) {
        case 'AIeasy':
            player2 = new AIeasy();
            break;
        case 'AImedium':
            player2 = new AImedium();
            break;
        case 'AIhard':
            player2 = new AIhard();
            break;
    }

    if (player1 != "User") {
        player1.makeMove();
    }
}

const circle = '<img src="circle.svg" alt="O">';
const cross = '<img src="cross.svg" alt="X">';
let isStart = false;
let isBotMove = false;
let board;
let currentMove;
let player1;
let player2;