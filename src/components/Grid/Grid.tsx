import * as React from 'react';
import './Grid.css';

import Square from '../Square/Square';

const cloneArray = (array: Array<Array<boolean>>) => array.map(arr => arr.slice());
const generateArray = (rows: number, columns: number) => Array(rows).fill(0).map(() => Array(columns).fill(false));

export interface Props {
  rows: number;
  columns: number;
  speed: number;
  onNewGeneration: Function;
}
export interface State {
  generation: number;
  gridState: Array<Array<boolean>>;
}

class Grid extends React.Component<Props, State> {
  private FILL_FACTOR: number = .25;

  private intervalId: NodeJS.Timer | number;

  constructor(props: Props) {
    super(props);

    this.state = {
      generation: 0,
      gridState: Array(this.props.rows).fill(0).map(() => Array(this.props.columns).fill(false))
    };
  }

  selectSquare = (row: number, column: number) => {
    const gridState = this.state.gridState.map(array => array.slice());
    gridState[column][row] = !gridState[column][row];
    this.setState({ gridState });
  }

  play = () => {
    this.pause();
    this.intervalId = setInterval(this.iterate, this.props.speed);
  }

  pause = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId as number);
    }
  }

  countNeightbords = (row: number, column: number) => {
    let neighbors: number = 0;

    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i >= this.props.rows) {
        continue;
      }
      for (let j = column - 1; j <= column + 1; j++) {
        // Check bounds
        if (j < 0 || j >= this.props.rows) {
          continue;
        }

        // Exclude self
        if (i === row && j === column) {
          continue;
        }

        if (this.state.gridState[i][j]) {
          neighbors++;
        }
      }
    }

    return neighbors;
  }

  iterate = () => {
    const gridState = cloneArray(this.state.gridState);

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        const count: number = this.countNeightbords(i, j);
        if (this.state.gridState[i][j] && (count < 2 || count > 3)) {
          gridState[i][j] = false;
        }
        if (!this.state.gridState[i][j] && count === 3) {
          gridState[i][j] = true;
        }
      }
    }

    const generation: number = this.state.generation + 1;
    this.setState({ gridState, generation });

    this.props.onNewGeneration(generation);
  }

  reset = () => {
    const gridState = generateArray(this.props.rows, this.props.columns);
    this.pause();
    this.setState({ gridState, generation: 0 });
    this.props.onNewGeneration(0);
  }

  fill = () => {
    const gridState =
      Array(this.props.rows)
        .fill(0)
        .map(() => Array(this.props.columns).fill(false));

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        if (Math.random() < this.FILL_FACTOR) {
          gridState[i][j] = true;
        }
      }
    }

    this.setState({ gridState });
  }

  componentDidMount() {
    this.fill();
    this.play();
  }

  render() {
    const squares: Array<JSX.Element> = [];
    let isLive: boolean = false;

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        let squareId = `${i}_${j}`;
        isLive = this.state.gridState[i][j];

        squares.push(
          <Square
            isLive={isLive}
            key={squareId}
            squareId={squareId}
            row={i}
            column={j}
            selectSquare={this.selectSquare}
          />
        );
      }
    }

    return (<div className="grid">{squares}</div>);
  }
}

export default Grid;
