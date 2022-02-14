import React from "react";
import "./App.css";
import { FormView } from "./FormView";
import { BoardView } from "./BoardView";
import { Game } from "../logic/Game";
import { Player, TokenColor } from "../logic/Player";
import { WinnerView } from "./WinnerView";


/*

BOT 

Try to win (moving neutron to my first row, or moving neutron out and token blocking neutron)

if can't then:

Move neutron to a place where it can be later moved into my first row (OR not be a direct road to opponent's win) AND move token out of the neutron's road to win (or move a token near the opponent's first row)


*/


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
