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

    checkWin(char, board = this._board) {
        return (board[0][0] == char && board[1][0] == char && board[2][0] == char) ||
            (board[0][1] == char && board[1][1] == char && board[2][1] == char) ||
            (board[0][2] == char && board[1][2] == char && board[2][2] == char) ||
            (board[0][0] == char && board[0][1] == char && board[0][2] == char) ||
            (board[1][0] == char && board[1][1] == char && board[1][2] == char) ||
            (board[2][0] == char && board[2][1] == char && board[2][2] == char) ||
            (board[0][0] == char && board[1][1] == char && board[2][2] == char) ||
            (board[0][2] == char && board[1][1] == char && board[2][0] == char);
    }

    getFreeCells(board = this._board) {
        const cellsId = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == ' ') {
                    cellsId.push(i * 3 + j);
                }
            }
        }
        return cellsId;
    }

    getBoard() {
        return JSON.parse(JSON.stringify(this._board));
    }
}

class AIeasy {
    constructor() { }

    makeMove() {
        const freeCells = board.getFreeCells();
        const randomId = Math.floor(Math.random() * freeCells.length);
        makeMove(freeCells[randomId]);
    }
}

class AImedium extends AIeasy {
    _char;
    _enemyChar;

    constructor(char) {
        super();
        this._char = char;
        this._enemyChar = char == 'x' ? 'o' : 'x';
    }

    makeMove() {
        const findPos = (char) => {
            const currentBoard = board.getBoard();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (currentBoard[i][j] == ' ') {
                        currentBoard[i][j] = char; // temporary change symbol
                        if (board.checkWin(char, currentBoard)) {
                            currentBoard[i][j] = ' '; // return to the initial symbol
                            return i * 3 + j; // if any side can win by doing this move, return this coordinate
                        }
                        currentBoard[i][j] = ' '; // return to the initial symbol
                    }
                }
            }
        }

        const winPos = findPos(this._char);
        if (winPos !== undefined) {
            makeMove(winPos);
            return;
        }

        // search the move to prevent a loss
        const losePos = findPos(this._enemyChar);
        if (losePos !== undefined) {
            makeMove(losePos);
            return;
        }

        // In other case make a random move
        super.makeMove();
    }
}

class AIhard extends AImedium {
    constructor(char) {
        super(char);
    }

    minimax(newBoard, depth, isMax) {
        let win = board.checkWin(this._char, newBoard);
        let lose = board.checkWin(this._enemyChar, newBoard);

        if (win) { // If Maximizer has won the game
            return 10; // return his/her evaluated score
        } else if (lose) { // If Minimizer has won the game
            return -10; // return his/her evaluated score
        } else if (board.getFreeCells(newBoard).length == 0) { // If there are no more moves and no winner
            return 0; // then it is a tie
        }

        let best = isMax ? -1000 : 1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (newBoard[i][j] == ' ') {
                    // Make the move
                    newBoard[i][j] = isMax ? this._char : this._enemyChar;

                    // Call minimax recursively and choose
                    // the maximum value
                    if (isMax) {
                        best = Math.max(best, this.minimax(newBoard, depth + 1, false));
                    } else {
                        best = Math.min(best, this.minimax(newBoard, depth + 1, true));
                    }

                    // Undo the move
                    newBoard[i][j] = ' ';
                }
            }
        }
        return best;
    }

    /**
     * This function will return the best possible move for the AI
     * @param board - game board with the symbols
     * */
    findBestMove(board) {
        let bestVal = -1000;
        let bestMove = null;

        // Traverse all cells, evaluate minimax function
        // for all empty cells. And return the cell
        // with optimal value.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Check if cell is empty
                if (board[i][j] == ' ') {
                    // Make the move
                    board[i][j] = this._char;

                    // compute evaluation function for this move
                    const moveVal = this.minimax(board, 0, false);

                    // Undo the move
                    board[i][j] = ' ';

                    // If the value of the current move is
                    // more than the best value, then update best
                    if (moveVal > bestVal) {
                        bestMove = i * 3 + j;
                        bestVal = moveVal;
                    }
                }
            }
        }
        return bestMove;
    }

    /**
     * Make the best move according to minimax algorithm
     * @param board - game board with the symbols
     * */
    makeMove() {
        const bestMove = this.findBestMove(board.getBoard());
        makeMove(bestMove);
    }
}

function makeMove(id, isUser) {
    const cell = document.getElementById(id);

    if (!isStart || cell.innerHTML != '') return;

    if (isUser && (player1 != 'User' || player2 != 'User')) {
        if (player1 == 'User' && currentMove % 2 == 1 ||
            player2 == 'User' && currentMove % 2 == 0 ||
            player1 != 'User' && player2 != 'User') {
            return;
        }
    }

    cell.innerHTML = currentMove % 2 == 0 ? cross : circle;

    board.makeMove(id, currentMove % 2 == 0 ? 'x' : 'o');
    if (board.checkWin('x')) {
        document.getElementById('winner').innerHTML = "X Wins!";
        isStart = false;
        return;
    } else if (board.checkWin('o')) {
        document.getElementById('winner').innerHTML = "O Wins!";
        isStart = false;
        return;
    } else if (currentMove + 1 == 9) {
        document.getElementById('winner').innerHTML = "Draw";
        isStart = false;
        return;
    }

    currentMove++;

    if (currentMove % 2 == 0 && player1 != 'User') {
        setTimeout(() => { player1.makeMove() }, 300);
    }
    if (currentMove % 2 == 1 && player2 != 'User') {
        setTimeout(() => { player2.makeMove() }, 300);
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
            player1 = new AImedium('x');
            break;
        case 'AIhard':
            player1 = new AIhard('x');
            break;
    }
    switch (player2) {
        case 'AIeasy':
            player2 = new AIeasy();
            break;
        case 'AImedium':
            player2 = new AImedium('o');
            break;
        case 'AIhard':
            player2 = new AIhard('o');
            break;
    }

    if (player1 != "User") {
        player1.makeMove();
    }
}

const circle = '<img src="circle.svg" alt="O">';
const cross = '<img src="cross.svg" alt="X">';
let isStart = false;
let board;
let currentMove;
let player1;
let player2;