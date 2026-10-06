const gameBoard = (function () {
  const gameArray = [null, null, null, null, null, null, null, null, null];
  // console.log(gameArray[7])
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

  return { setCell, getBoard,resetArray };
})();


function player(name,symbol){
   const playerName=()=>name;
   const playerSymbol=()=>symbol;

    return { playerName, playerSymbol };
}