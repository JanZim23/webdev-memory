import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Tile from "./tile.jsx";

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const getTiles = () => {
  return letters.reduce((a, letter) => {
    a.push(letter + "1");
    a.push(letter + "2");
    return a;
  }, []);
};

const initialState = () =>
  Object.assign(
    {},
    {
      lastClicked: 0,
      tiles: getTiles().sort(() => 0.5 - Math.random()),
      completed: [],
      first: false,
      second: false,
      clicks: 0
    }
  );

const getTime = () => {
  return Math.round(new Date().getTime() / 1000);
};

export class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState();
  }

  clickTile(tile) {
    this.setState(state => ({
      clicks: state.clicks + 1
    }));

    if (!this.isLocked()) {
      //We are not locked
      if (this.state.first === false) {
        this.setState({ first: tile });
      } else if (this.state.second === false) {
        this.setState({ second: tile });
        this.lock();
        if (this.state.first.substring(0, 1) === tile.substring(0, 1)) {
          this.complete(this.state.first, tile);
          this.unlock();
        } else {
          setTimeout(() => {
            this.unlock();
          }, 2000);
        }
      }
    }
  }

  reset() {
    this.setState(initialState());
  }

  complete(tile1, tile2) {
    this.setState(state => ({
      first: false,
      second: false,
      completed: [...state.completed, tile1, tile2]
    }));
  }

  isSelected(tile) {
    return tile === this.state.first || tile === this.state.second;
  }

  isCompleted(tile) {
    return this.state.completed.includes(tile);
  }

  isLocked() {
    return !(getTime() - this.state.lastClicked > 2);
  }

  lock() {
    this.setState({ lastClicked: getTime() });
  }

  unlock() {
    this.setState({ lastClicked: 0, first: false, second: false });
  }

  render() {
    return (
      <div style={{ margin: "0 auto", width: "300px" }}>
        {this.state.tiles.map(tile => {
          return (
            <Tile
              selected={this.isSelected(tile)}
              completed={this.isCompleted(tile)}
              locked={this.isLocked()}
              onclick={() => this.clickTile(tile)}
              key={tile}
              letter={tile.substring(0, 1)}
            />
          );
        })}
        <div>Total Click: {this.state.clicks}</div>
        <div>{this.state.completed.length == 16 ? "Done! Congrats" : ""}</div>
        <button
          onClick={() => {
            this.reset();
          }}
        >
          Reset Game
        </button>
      </div>
    );
  }
}
