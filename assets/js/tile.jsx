import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import { Starter } from "./starter-game.jsx";

export default function Tile({ selected, completed, locked, onclick, letter }) {
  if (completed) {
    return <button disabled>{letter}</button>;
  } else if (selected) {
    return <button disabled>{letter}</button>;
  } else {
    return (
      <button disabled={locked} onClick={onclick}>
        ?
      </button>
    );
  }
}
