import React from "react";
import "./App.css";
import { FormView } from "./FormView";
import { BoardView } from "./BoardView";
import { Game } from "../logic/Game";
import { Player, TokenColor } from "../logic/Player";
import { WinnerView } from "./WinnerView";

export default class App extends React.Component<Object, Game> {
  constructor(props: Object) {
    super(props);
    this.state = new Game(
      new Player("White", TokenColor.White),
      new Player("Black", TokenColor.Black)
    );
  }

  render() {
    const game = this.state;
    const forceUpdate = () => {
      this.forceUpdate();
    };
    return (
      <>
        {!game.running && !game.winner && (
          <FormView game={game} updateState={forceUpdate} />
        )}
        {!game.running && game.winner && (
          <WinnerView game={game} updateState={forceUpdate} />
        )}
        {game.running && !game.winner && (
          <BoardView game={game} updateState={forceUpdate} />
        )}
      </>
    );
  }
}
