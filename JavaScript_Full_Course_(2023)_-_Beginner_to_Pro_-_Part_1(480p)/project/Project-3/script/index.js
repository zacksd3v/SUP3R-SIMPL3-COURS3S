const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Hanyoyin da za a iya cin wasan (Winning patterns)
const winConditions = [
    // wann lissafin shine na
    // na adadin box namu tun daga
    // horizontal -> row kenan
    // har vertical -> column kenan
    // har izuwa cross angles guda biyus
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Kwance
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Tsaye
    [0, 4, 8], [2, 4, 6]             // Markade
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

// Fara wasa
cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `X's Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}