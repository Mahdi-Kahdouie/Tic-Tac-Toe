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
  const player1 = player("Mahdi", "X");
  const player2 = player("Computer", "o");

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

  return { playRound, checkWinner };
})();

// gameController.playRound(0);
// gameController.playRound(4);
// gameController.playRound(1);
// gameController.playRound(5);
// gameController.playRound(2);

// gameController.playRound(0); //me
// gameController.playRound(1); //computer
// gameController.playRound(2); //me

// gameController.playRound(3); //computer
// gameController.playRound(4); //me
// gameController.playRound(6); //computer

// gameController.playRound(5); //me
// gameController.playRound(8); //computer
// gameController.playRound(7); //me

// gameController.playRound(8);
// gameController.playRound(4);
// gameController.playRound(1);
// gameController.playRound(5);
// gameController.playRound(2);
// gameController.playRound(3);

console.log(gameBoard.getBoard());
