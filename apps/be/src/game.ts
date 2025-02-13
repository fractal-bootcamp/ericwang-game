type Board = Player[]
type Player = 1 | 2 | 'test' | null
type Column = [Player, Player, Player, Player, Player, Player]
type Status = 'ongoing' | 'won' | 'tie'
export type ColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

type GameState = {
    board: Board,
    status: Status,
    currentPlayer: Player
}

const rowBoundaries = [
    [0, 6],
    [7, 13],
    [14, 20],
    [21, 27],
    [28, 34],
    [35, 41],
]

const colBoundaries = [
    [0, 35],
    [1, 36],
    [2, 37],
    [3, 38],
    [4, 39],
    [5, 40],
    [6, 41],
]

const diagBoundariesLTR = [
    [14, 22, 30, 38],
    [7, 15, 23, 31, 39],
    [0, 8, 16, 24, 32, 40],
    [1, 9, 17, 25, 33, 41],
    [2, 10, 18, 26, 34],
    [3, 11, 19, 27],
]

const diagBoundariesRTL = [
    [3, 9, 15, 21],
    [4, 10, 16, 22, 28],
    [5, 11, 17, 23, 29, 35],
    [6, 12, 18, 24, 30, 36],
    [13,19, 25, 31, 37],
    [20, 26, 32, 38],
]

export function getColPlayers(colNumber: number, game: GameState): Column {
    return [game.board[colNumber], game.board[colNumber+7], game.board[colNumber+14], game.board[colNumber+21], game.board[colNumber+28], game.board[colNumber+35]]
}

function getColPlayerIndexes(colNumber: number): number[] {
    return [colNumber, colNumber + 7, colNumber + 14, colNumber + 21, colNumber + 28, colNumber + 35]
}

function checkWin(board: Board, player: Player): boolean | undefined {
    // rows
    for(const nodes of rowBoundaries) { 
        for(let i=nodes[0]; i<nodes[1]; i++) {
            if(board[i] === player && board[i + 1] === player && board[i + 2] === player && board[i + 3] === player) {
                console.log("row win")
                return true
            }
        }
    }
    // columns
    for(const nodes of colBoundaries) { 
        for(let i=nodes[0]; i<nodes[1]; i += 7) {
            if(board[i] === player && board[i+7] === player && board[i+14] === player && board[i+21] === player) {
                console.log("column win")
                return true
            }
        }
    }
    // diagonalLTR
    for (const diagonal of diagBoundariesLTR) {
        for(let i=0; i < diagonal.length - 3; i++) {
            if(board[diagonal[i]] === player && board[diagonal[i+1]] === player && board[diagonal[i+2]] === player && board[diagonal[i+3]] === player) {
                console.log("diagonalLTR win")
                return true
            }
        }
    }
    // diagonalRTL
    for (const diagonal of diagBoundariesRTL) {
        for(let i=0; i < diagonal.length - 3; i++) {
            if(board[diagonal[i]] === player && board[diagonal[i+1]] === player && board[diagonal[i+2]] === player && board[diagonal[i+3]] === player) {
                console.log("diagonalRTL win")
                return true
            }
        }
    }

    return false
}

export function move( prevGameState:GameState, colIndex: ColumnIndex ): GameState {
    const newGameState = structuredClone(prevGameState)
    
    const selectedCol = getColPlayers(colIndex, prevGameState)
    const colPlayerIndexes = getColPlayerIndexes(colIndex)

    // console.log('selectedCol:', selectedCol)
    // console.log('colPlayerIndexes:', colPlayerIndexes)
    // console.log(selectedCol.includes(null))

    // if there's an empty slot
    if(selectedCol.includes(null)) {
        // add new player
        selectedCol.forEach((player, index) => {
            if(player) {
                selectedCol[index - 1] = newGameState.currentPlayer
            }
        })
        // set players at correct indexes in the board
        colPlayerIndexes.forEach((colPlayerIndex, index) => {
            newGameState.board[colPlayerIndex] = selectedCol[index]
        })
        console.log(newGameState.board)
    }

    // check tie
    if(!newGameState.board.includes(null)) {
        newGameState.status = 'tie'
        return newGameState
    }

    // check win
    if(checkWin(newGameState.board, newGameState.currentPlayer)) {
        newGameState.status = 'won'
        console.log('someone won')
        return newGameState
    }

    // // switch players
    // newGameState.currentPlayer = prevGameState.currentPlayer === 1 ? 2 : 1

    // console.log('game ongoing')
    // return newGameState
}

const winningBoardRTL:Board = [
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, 1   , null, null, null,
    null, null, 1   , 2   , null, null, null,
    null, 1   , 2   , 2   , null, null, null,
    1   , 2   , 2   , 2   , null, null, null,  // Winning row (bottom)
];

const test = [
    null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, 
    null, null, null,   1,  null, null, null,
    null, 'test',  1,   2,  null, null, null, 
    null, 'test',  2,   2,  null, null, null, 
    1,    2,       2,   2,  null, null, null
]

const winningGameState:GameState = {
    board: winningBoardRTL,
    currentPlayer: 'test',
    status: 'ongoing'
}

// checkWin(winningBoardRTL, 1)

move(winningGameState, 1)