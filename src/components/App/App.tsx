import * as React from 'react';
import './App.css';

import Grid from '../Grid/Grid';

export interface Props {}

export interface State {
  generation: number;
  gridFull: Array<Array<boolean>>;
}

class App extends React.Component<Props, State> {
  private speed: number;
  private rows: number;
  private columns: number;

  constructor() {
    super();

    this.speed = 100;
    this.rows = 30;
    this.columns = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill(0).map(() => Array(this.columns).fill(false))
    };
  }

  selectSquare = (i: number, j: number) => {
    console.log('square selected', i, j);
  }

  render() {
    return (
      <div>
        <Grid
          rows={this.rows}
          columns={this.columns}
          gridFull={this.state.gridFull}
          selectSquare={this.selectSquare}
        />
        <h2>Generation: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
