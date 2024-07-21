import React, { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame} from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

// 56:28

function App(){

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //Null no hay ganador, false empate



  const resetGame = () => {

    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  }
 
  const updateBoard = (index) => {

    //Si ya tiene algo, no actualizamos la posición
    if (board[index]) return

    //Actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard )

    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardamos la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)


    //Ahora vamos a revisar si hay algun ganador
    const newWinner = checkWinnerFrom(newBoard)

    //Si hay ganador, renderizamos el ganador
    if (newWinner){
      confetti()
      setWinner(newWinner)//La actualización del estado es asíncrona
      //alert(`El ganador es ${newWinner}`)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate

    }
  }


  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Resetear juego</button>

      <section className="game">
        {
          board.map((square, index) => {

            return(
              <Square key={index}
              index={index}
              updateBoard={updateBoard}>
                {square}
              </Square>

            )
            
})
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>


      </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
        
    </main>
  );
}



export default App