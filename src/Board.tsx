import React from 'react';
import {Square} from './Square';

interface BoardProps {
    squares : string[];
    onClick : (i : number) => any;
}

interface BoardStates // State, component that should be updated
{
    squares : string[]; // store each square's status
    xIsNext: boolean, // check if O or X 
}
export class Board extends React.Component <BoardProps, BoardStates>{
   
    renderSquare(i : number) {
      return (<Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />);
    }
  
    render() {

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  