document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function renderBoard() {
        board.innerHTML = "";
        gameBoard.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", () => handleCellClick(index));
            board.appendChild(cellDiv);
        });
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let condition of winConditions) {
            if (
                gameBoard[condition[0]] !== "" &&
                gameBoard[condition[0]] === gameBoard[condition[1]] &&
                gameBoard[condition[1]] === gameBoard[condition[2]]
            ) {
                status.textContent = `Player ${currentPlayer} wins!`;
                return true;
            }
        }
        if (!gameBoard.includes("")) {
            status.textContent = "It's a draw!";
            return true;
        }
        return false;
    }

    resetButton.addEventListener("click", () => {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        status.textContent = "Player X's turn";
        renderBoard();
    });

    renderBoard();
});
