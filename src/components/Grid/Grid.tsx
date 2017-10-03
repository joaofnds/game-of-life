import * as React from 'react';
import './Grid.css';

import Square from '../Square/Square';

export interface Props {
  rows: number;
  columns: number;
  gridFull: Array<Array<boolean>>;
  selectSquare: Function;
}
export interface State {}

class Grid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const squares: Array<JSX.Element> = [];
    let isOn: boolean = false;

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.columns; j++) {
        let squareId = `${i}_${j}`;
        isOn = this.props.gridFull[i][j];

        squares.push(
          <Square
            squareClass={`square ${isOn ? 'on' : 'off'}`}
            key={squareId}
            squareId={squareId}
            row={i}
            column={j}
            selectSquare={this.props.selectSquare}
          />
        );
      }
    }

    return (<div className="grid">{squares}</div>);
  }
}

export default Grid;
