const gameBoard = (function () {
  const gameArray = [null, null, null, null, null, null, null, null, null];
  const setCell = (position, symbol) => {
    if (gameArray[position] == null) {
      gameArray[position] = symbol;
      return true;
    } else return false;
  };

  const getBoard = () => {
    const arrayStatus = [...gameArray];
    return arrayStatus;
  };

  const resetArray = () => {
    for (let index = 0; index < gameArray.length; index++) {
      gameArray[index] = null;
    }
  };

  return { setCell, getBoard, resetArray };
})();

function player(name, symbol) {
  return { name, symbol };
}

const gameController = (function () {
  let player1 = player("Player 1", "X");
  let player2 = player("Player 2", "o");

  let activePlayer = player1;
  let gameOver = false;

  function playRound(cellIndex) {
    if (gameOver) return;
    let isMoving = gameBoard.setCell(cellIndex, activePlayer.symbol);
    if (!isMoving) return;
    const gameStatus = checkWinner();
    const nullArray = gameBoard.getBoard();
    if (!nullArray.includes(null) && gameStatus == false) {
      gameOver = true;
      return console.log("Tie");
    }
    if (gameStatus == true && activePlayer == player1) {
      gameOver = true;
      return console.log("Player 1 win");
    }
    if (gameStatus == true && activePlayer == player2) {
      gameOver = true;
      return console.log("Player 2 win");
    }

    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    let boardArray = gameBoard.getBoard();
    for (const element of winConditions) {
      const [a, b, c] = element;

      if (
        boardArray[a] !== null &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    gameBoard.resetArray();
    gameOver = false;
    activePlayer = player1;
  }

  function setPlayerNames(name1, name2) {
    player1 = player(name1 || "Player 1", "X");
    player2 = player(name2 || "Player 2", "o");
    resetGame();
  }
  const getActivePlayer = () => activePlayer;
  const getGameOver = () => gameOver;

  return {
    playRound,
    checkWinner,
    getActivePlayer,
    getGameOver,
    resetGame,
    setPlayerNames,
  };
})();

const displayGame = (function () {
  const cell = document.querySelectorAll(".cell");

  const playerStatus = document.querySelector(".playerStatus");

  const resetBtn = document.querySelector(".resetBtn");

  const p1Input = document.querySelector("#p1-name");
  const p2Input = document.querySelector("#p2-name");
  const startBtn = document.querySelector("#start-btn");

  cell.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      gameController.playRound(index);
      updateScreen();
    });
  });

  resetBtn.addEventListener("click", () => {
    gameController.resetGame();
    updateScreen();
  });

  const updateScreen = () => {
    const board = gameBoard.getBoard();

    cell.forEach((button) => {
      const index = button.dataset.index;
      button.textContent = board[index] || "";
    });

    if (gameController.getGameOver()) {
      if (!board.includes(null) && gameController.checkWinner() == false) {
        playerStatus.textContent = "Tie";
      } else {
        playerStatus.textContent = `${gameController.getActivePlayer().name} won!`;
      }
    } else {
      playerStatus.textContent = `Turn: ${gameController.getActivePlayer().name}`;
    }
  };

  startBtn.addEventListener("click", () => {
    const name1 = p1Input.value.trim();
    const name2 = p2Input.value.trim();

    gameController.setPlayerNames(name1, name2);
    updateScreen();
  });
  updateScreen();
})();
