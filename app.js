//select the datacells
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningScreen = document.getElementById("winning-screen")
const restartButton = document.querySelector("#restart-button")
//variables x and circle to relate with classes to e inputed in html tags when clicked
const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//block scope changeable variable that store value from above variables when clicked
let circleTurn



//function that handles what happens when a cell is clicked
const handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placemark(cell, currentClass)


    //conditioner
    if(checkWining(currentClass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurns()
    setBoardHoverClass()
    }
 
}

const placemark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const swapTurns = () => {
    circleTurn = !circleTurn
}

const setBoardHoverClass = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWining(currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


const endGame = (draw) => {
    if(draw){
        winningMessageText.innerText = "Draw!"
    }else{
        winningMessageText.innerText = `${circleTurn? "O's" : "X's"} Wins!`
    } 
    winningScreen.classList.add("show")
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}





//start
const startGame = () => {
    circleTurn = false;

    //looping over the cells and picking one at a time clicked
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })

    setBoardHoverClass()
    winningScreen.classList.remove("show")
}

startGame()

restartButton.addEventListener("click", startGame)