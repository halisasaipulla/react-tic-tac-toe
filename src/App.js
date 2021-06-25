import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
    const squares = [];

    let currentId = 0;

    for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
        squares[row].push({
        id: currentId,
        value: '',
        });
        currentId += 1;
    }
    }

    return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
    const [squares, setSquares] = useState(generateSquares());
    const [currentPlayer, setCurrentPlayer] = useState('x');
    const [winner, setWinner] = useState('');

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
    const handlingClick=(updateSquare)=>{
        const newBoard = [...squares]
        const row = Math.floor(updateSquare.id/3)
        const col = updateSquare.id%3

        newBoard[row][col]=updateSquare
        updateSquare.value = currentPlayer
        if (currentPlayer.value !== '') {
            if (currentPlayer === 'x') {
                setCurrentPlayer(PLAYER_2);
        } else {
            setCurrentPlayer(PLAYER_1)
        };
        }
        setSquares(newBoard)
        setWinner(checkForWinner());
    
    }

    const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.
        if (squares[0][0].value === squares[1][1].value &&
            squares[2][2].value === squares[1][1].value &&
            squares[1][1].value !== '') {
            return squares[0][0].value;
        }else if(squares[0][2].value === squares[1][1].value &&
            squares[2][0].value === squares[1][1].value &&
            squares[1][1].value !== '') {
            return squares[0][2].value;
        }else{
            for (let row=0; row<3; row++){
            if(squares[row][0].value===squares[row][1].value && 
                squares[row][0].value===squares[row][2].value && squares[row][0].value !==''){
                return squares[row][0].value;
                }
        }
        for (let col=0; col<3; col++){
            if (squares[0][col].value===squares[1][col].value &&
                squares[0][col].value===squares[2][col].value && squares[0][col].value !==''){
                return squares[0][col].value;
        }
    }
    }
    }
        

    const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setCurrentPlayer(0);
    setWinner('');
    }

    return (
        <div className="App">
        <header className="App-header">
            <h1>React Tic Tac Toe</h1>
            <h2>{winner === null ? `Current Player ${ currentPlayer }` : `Winner is ${ winner }`}</h2>
            <button onClick={resetGame}>Reset Game</button>
        </header>
        <main>
            <Board squares={squares} onClickCallback={ handlingClick } currentPlayer={ currentPlayer }/>
        </main>
        </div>
);
}

export default App;
