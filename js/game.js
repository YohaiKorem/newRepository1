'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = 'sf'
const CHERRY = '🍒'
var gEmptySpots = []
var gFoodCount = -1
const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    document.querySelector('.lose').style.display = 'none'
    document.querySelector('.win').style.display = 'none'
    setInterval(renderCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []
    var emptySpots = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } if ((i === 1 && j === 1) || (i === 1 && j === 8) || (i === 8 && j === 1) || (i === 8 && j === 8)) {
                board[i][j] = SUPER_FOOD
            }
            if (board[i][j] === FOOD) {
                gEmptySpots.push(board[i][j])
                gFoodCount++

            }
        }
    }
    return board
}
function isGameOn() {
    if (gGame.isOn === false) {
        clearInterval(gIntervalGhosts)
    }
}
function renderCherry() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if ((gBoard[i][j] !== WALL) && gBoard[i][j] === FOOD || EMPTY) {
                gBoard[i][j] = CHERRY
            }
        }
    }
}
function isWin() {

    if (gFoodCount === 0) {
        console.log('you won');
        document.querySelector('.win').style.display = 'block'
        gGame.isOn = false
        clearInterval(gIntervalGhosts)
    }
}

function superOff() {

    gPacman.isSuper = false
    console.log('gPacman.isSuper', gPacman.isSuper);
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    isWin()
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

    console.log(gFoodCount);
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    document.querySelector('.lose').style.display = 'block'
}