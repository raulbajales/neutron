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
    const playerOneNames = ["Romualdo", "Fulgencio", "Edelvina", "Armelinda"];
    const playerTwoNames = ["Benemérito", "Luzdivino", "Sayen", "Cleta"];
    const randomPlayerName = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    this.state = new Game(
      new Player(randomPlayerName(playerOneNames), TokenColor.White),
      new Player(randomPlayerName(playerTwoNames), TokenColor.Black)
    );
  }

  render() {
    const game = this.state;
    return (
      <>
        {!game.running && !game.winner && (
          <FormView
            game={game}
            updateState={() => {
              this.forceUpdate();
            }}
          />
        )}
        {!game.running && game.winner && (
          <WinnerView
            game={game}
            updateState={() => {
              this.forceUpdate();
            }}
          />
        )}
        {game.running && !game.winner && (
          <BoardView
            game={game}
            updateState={() => {
              this.forceUpdate();
            }}
          />
        )}
      </>
    );
  }
}
