import * as React from 'react';
import './App.css';

import Grid from '../Grid/Grid';

export interface Props { }

export interface State {
  generation: number;
  speed: number;
  rows: number;
  columns: number;
  paused: boolean;
}

class App extends React.Component<Props, State> {
  private grid: Grid;
  constructor() {
    super();

    this.state = {
      generation: 0,
      speed: 100,
      rows: 30,
      columns: 50,
      paused: false
    };
  }

  updateGeneration = (generation: number) => {
    this.setState({ generation });
  }

  render() {
    return (
      <div>
        <Grid
          ref={(g) => { this.grid = g as Grid; }}
          rows={this.state.rows}
          columns={this.state.columns}
          speed={this.state.speed}
          onNewGeneration={this.updateGeneration}
        />
        <h2>Generation: {this.state.generation}</h2>
        <button onClick={() => this.grid.fill.apply(this)}>Fill</button>
        <button onClick={() => this.grid.reset.apply(this)}>Reset</button>
        <button onClick={() => this.grid.pause.apply(this)}>Pause</button>
        <button onClick={() => this.grid.play.apply(this)}>Play</button>
      </div>
    );
  }
}

export default App;
