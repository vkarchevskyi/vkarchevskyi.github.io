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
}

function getMove(id) {
    if (end) return;

    const cell = document.getElementById(id);
    cell.innerHTML = currentMove % 2 == 0 ? cross : circle;

    board.makeMove(id, currentMove % 2 == 0 ? 'x' : 'o');
    if (board.checkBoard('x')) {
        document.getElementById('winner').innerHTML = "X Wins!";
        end = true;
    } else if (board.checkBoard('o')) {
        document.getElementById('winner').innerHTML = "O Wins!";
        end = true;
    }

    currentMove++;
}

function restart() {
    for (let i = 0; i <= 8; i++) {
        document.getElementById(i).innerHTML = '';
    }
    document.getElementById('winner').innerHTML = '';
    init();
}

function init() {
    currentMove = 0;
    end = false;
    board = new Board();
}

const circle = '<img src="circle.svg" alt="O">';
const cross = '<img src="cross.svg" alt="X">';
let board;
let currentMove;
let end;

init();