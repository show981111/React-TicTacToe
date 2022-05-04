import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './Board';
import {calculateWinner} from './calculateWinner';

interface GameProps {};
interface GameStates {
  history: {
    squares:string[], // store board for each turn
  }[],
  stepNumber: number,
  xIsNext: boolean,
};
export class Game extends React.Component<GameProps, GameStates> {
  constructor(props : GameProps) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber : 0,
      xIsNext: true,
    };
  }

  handleClick(i : number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // move forward 
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ // concat() method doesn’t mutate the original array
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step : number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return ( //set key to uniquely distinguish each item of list(like id)
        <li key={move}> 
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
         <Board
            squares={current.squares}
            onClick={(i : number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);
