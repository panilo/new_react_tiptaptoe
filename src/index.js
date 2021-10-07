import React from "react";
import ReactDOM from "react-dom";

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={() => this.props.handleSquareClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rowStartIndexes = [0, 3, 6];
    const squares = Array(3).fill(null); // [null, null, ...]

    return rowStartIndexes.map((rowStartIndex, arrIndex) => {
      return (
        <div className="board-row">
          {squares.map((square, placeHolderIndex) => {
            let squareIndex = rowStartIndex + placeHolderIndex;
            return (
              <Square
                value={this.props.squares[squareIndex]}
                handleSquareClick={() => {
                  this.props.handleSquareClick(squareIndex);
                }}
              />
            );
          })}
        </div>
      );
    });
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextSymbol: "X",
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(index) {
    console.log(`User clicked ${index}`);
    const squares = this.state.squares;

    if (squares[index] !== null) {
      return;
    }

    squares[index] = this.state.nextSymbol;

    this.setState({
      squares: squares,
      nextSymbol: this.state.nextSymbol === "X" ? "O" : "X",
    });

    /*
      if(this.state.nextSymbol === "X") {
        this.setState({nextSymbol: "O"});
      } else {
        this.setState({nextSymbol: "X"});
      }
    */
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
            handleSquareClick={this.handleSquareClick}
            squares={this.state.squares}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
