import * as React from 'react';
import './Square.css';

export interface Props {
  squareClass: string;
  key: string;
  squareId: string;
  row: number;
  column: number;
  selectSquare: Function;
}
export interface State {}

class Square extends React.Component<Props, State> {
  selectSquare = () => {
    this.props.selectSquare(this.props.row, this.props.column);
  }

  render() {
    return (
      <div
        className={this.props.squareClass}
        id={this.props.squareId}
        onClick={this.selectSquare}
      />
    );
  }
}

export default Square;
