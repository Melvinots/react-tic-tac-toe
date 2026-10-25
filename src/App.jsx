import './App.css'
import { useState } from 'react';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    if (move === currentMove) {
      const text = move > 0
        ? 'You are at move #' + move
        : 'You are at game start';

      return (
        <li key={move}>
          <span className="current-move">{text}</span>
        </li>
      );
    }

    const description = move > 0
      ? 'Go to move #' + move
      : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="app">
      <h1 className="title">Tic-Tac-Toe</h1>
      <p className="subtitle">// cyber edition</p>

      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>

        <div className="game-info">
          <h2>History</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    (xIsNext) ? nextSquares[i] = "X" : nextSquares[i] = "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const gameStatus = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  const boardRows = [0, 1, 2].map((row) => (
    <div key={row} className="board-row">
      {[0, 1, 2].map((col) => {
        const i = row * 3 + col;
        return (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        );
      })}
    </div>
  ));

  return (
    <>
      <div className={`status ${winner ? "winner" : ""}`}>{gameStatus}</div>
      {boardRows}
    </>
  );
}

function Square({ value, onSquareClick }) {
  const colorClass = value ? value.toLowerCase() : "";
  return (
    <button className={`square ${colorClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;