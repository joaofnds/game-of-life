import * as React from 'react';
import './Square.css';

export interface Props {
  isLive: boolean;
  key: string;
  squareId: string;
  row: number;
  column: number;
  selectSquare: Function;
}
export interface State {}

class Square extends React.Component<Props, State> {
  selectSquare = () => {
    this.props.selectSquare(this.props.column, this.props.row);
  }

  render() {
    const isLive = this.props.isLive;
    return (
      <div
        className={`square ${isLive ? 'on' : 'off'}`}
        id={this.props.squareId}
        onClick={this.selectSquare}
      />
    );
  }
}

export default Square;
