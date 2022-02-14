import { Board } from "./Board";
import { Cell } from "./Cell";
import { Direction } from "./Direction";
import { Player, TokenColor } from "./Player";

export enum PieceToMove {
  Neutron,
  Token,
}

export class Game {
  board?: Board;
  playerOne?: Player;
  playerTwo?: Player;
  winner?: Player;
  playerTurn?: Player;
  pieceToMove?: PieceToMove;
  running?: Boolean;
  moves: number = 0;

  constructor(playerOne?: Player, playerTwo?: Player) {
    if (!(playerOne && playerTwo))
      throw Error("Both playerOne and playerTwo must be provided");
    if (!(playerOne.tokenColor !== playerTwo.tokenColor))
      throw Error("Token color for both players cannot be the same");
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.running = false;
  }

  run() {
    this.board = new Board([
      [Cell.White, Cell.White, Cell.White, Cell.White, Cell.White],
      [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
      [Cell.Empty, Cell.Empty, Cell.Neutron, Cell.Empty, Cell.Empty],
      [Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty, Cell.Empty],
      [Cell.Black, Cell.Black, Cell.Black, Cell.Black, Cell.Black],
    ]);
    this.winner = undefined;
    this.playerTurn =
      this.playerOne!.tokenColor === TokenColor.White
        ? this.playerOne!
        : this.playerTwo!;
    this.pieceToMove = PieceToMove.Neutron;
    this.running = true;
  }

  moveNeutron(player: Player, neutronMove: Direction) {
    if (this.winner) throw Error("Game already finished");
    if (this.playerTurn !== player) throw Error("Not your turn!");
    if (this.pieceToMove !== PieceToMove.Neutron) throw Error("Invalid move!");
    this.board!.moveNeutron(neutronMove);
    this.moves++;
    var [row] = this.board!.findNeutron();
    if (row === 0 || row === 4) {
      this.winner =
        this.playerOne!.tokenColor ===
        (row === 0 ? TokenColor.White : TokenColor.Black)
          ? this.playerOne!
          : this.playerTwo!;
      this.running = false;
    } else {
      this.pieceToMove = PieceToMove.Token;
    }
  }

  moveToken(
    player: Player,
    tokenMove: { row: number; col: number; direction: Direction }
  ) {
    if (this.winner) throw Error("Game already finished");
    if (this.playerTurn !== player) throw Error("Not your turn!");
    if (this.pieceToMove !== PieceToMove.Token) throw Error("Invalid move!");
    if (
      !(
        tokenMove!.row >= 0 &&
        tokenMove!.row <= 4 &&
        tokenMove!.col >= 0 &&
        tokenMove!.col <= 4
      )
    )
      throw Error("Invalid token move");
    this.moves++;
    this.board!.moveToken(player.tokenColor, tokenMove);
    if (!this.board!.canMoveNeutron()) {
      this.winner = player;
      this.running = false;
    } else {
      this.playerTurn =
        this.playerTurn === this.playerOne ? this.playerTwo : this.playerOne;
      this.pieceToMove = PieceToMove.Neutron;
    }
  }
}
