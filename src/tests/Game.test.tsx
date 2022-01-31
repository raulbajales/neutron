import React from "react";
import { Cell } from "../logic/Cell";
import { Direction } from "../logic/Direction";
import { Game, PieceToMove } from "../logic/Game";
import { Player, TokenColor } from "../logic/Player";

test("Sample game", () => {
  var game: Game = new Game(
    new Player("Player One", TokenColor.White),
    new Player("Player Two", TokenColor.Black)
  );

  //
  // Start a new game...
  //
  expect(game.running).toEqual(false);
  game.run();
  expect(game.running).toEqual(true);

  //
  // White moves...
  //
  expect(game.playerTurn).toEqual(game.playerOne);
  expect(game.pieceToMove).toEqual(PieceToMove.Neutron);
  game.moveNeutron(game.playerOne!, Direction.Up);
  expect(game.pieceToMove).toEqual(PieceToMove.Token);
  game.moveToken(game.playerOne!, {
    col: 0,
    row: 0,
    direction: Direction.Down,
  });
  expect(game.board?.cells).toEqual([
    [Cell.Empty, Cell.White, Cell.White, Cell.White, Cell.White],
    [Cell.Empty, Cell.Empty, Cell.Neutron, Cell.Empty, Cell.Empty],
    [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.White, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.Black, Cell.Black, Cell.Black, Cell.Black, Cell.Black],
  ]);
  expect(game.winner).toEqual(undefined);

  //
  // Black moves...
  //
  expect(game.playerTurn).toEqual(game.playerTwo);
  expect(game.pieceToMove).toEqual(PieceToMove.Neutron);
  game.moveNeutron(game.playerTwo!, Direction.Left);
  expect(game.pieceToMove).toEqual(PieceToMove.Token);
  game.moveToken(game.playerTwo!, {
    col: 4,
    row: 4,
    direction: Direction.Up,
  });
  expect(game.board?.cells).toEqual([
    [Cell.Empty, Cell.White, Cell.White, Cell.White, Cell.White],
    [Cell.Neutron, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Black],
    [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.White, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.Black, Cell.Black, Cell.Black, Cell.Black, Cell.Empty],
  ]);
  expect(game.winner).toEqual(undefined);

  //
  // White moves...
  //
  expect(game.playerTurn).toEqual(game.playerOne);
  expect(game.pieceToMove).toEqual(PieceToMove.Neutron);
  game.moveNeutron(game.playerOne!, Direction.Up);
  expect(game.board?.cells).toEqual([
    [Cell.Neutron, Cell.White, Cell.White, Cell.White, Cell.White],
    [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Black],
    [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.White, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
    [Cell.Black, Cell.Black, Cell.Black, Cell.Black, Cell.Empty],
  ]);
  expect(game.winner).toEqual(game.playerOne);
  expect(game.running).toEqual(false);
});
