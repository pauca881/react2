
import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadoras
    // Para ver si hay 3 x u o juntas
    for ( const combo of WINNER_COMBOS)  {
      const [a, b , c] = combo
      if(
        //Si en la posición a existe algo i...
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && //la casilla a tiene lo mismo que b
        boardToCheck[a] === boardToCheck[c] // i la casilla tiene lo mismo que c
      ){
  
        return boardToCheck[a]
  
      }
  
    }
    //En caso de que no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    //Revisamos si hay un empate
    // Si no hay más espacios vacíos
    // en el tablero

    //Si en newBoard, todas las posiciones(square), 
    //tienen un valor diferente a null
    return newBoard.every((square) =>  square != null)

 }