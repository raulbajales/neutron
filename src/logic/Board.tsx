import { Cell } from "./Cell";
import { Direction } from "./Direction";
import { TokenColor } from "./Player";

class Board {
  cells: Cell[][] | undefined;

  constructor(cells: Cell[][] | undefined) {
    if (
      !(
        cells &&
        cells.length === 5 &&
        cells[0].length === 5 &&
        cells[1].length === 5 &&
        cells[2].length === 5 &&
        cells[3].length === 5 &&
        cells[4].length === 5
      )
    )
      throw Error("Board initialization failed");
    this.cells = cells;
  }

  findNeutron(): [number, number] {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.cells![row][col] === Cell.Neutron) return [row, col];
      }
    }
    throw Error("Neutron not found!");
  }

  canMoveNeutron(): Boolean {
    var [row, col] = this.findNeutron();
    return (
      (row > 0 && this.cells![row - 1][col] === Cell.Empty) ||
      (row > 0 && col > 0 && this.cells![row - 1][col - 1] === Cell.Empty) ||
      (col > 0 && this.cells![row][col - 1] === Cell.Empty) ||
      (row < 4 && col > 0 && this.cells![row + 1][col - 1] === Cell.Empty) ||
      (row < 4 && this.cells![row + 1][col] === Cell.Empty) ||
      (row < 4 && col < 4 && this.cells![row + 1][col + 1] === Cell.Empty) ||
      (col < 4 && this.cells![row][col + 1] === Cell.Empty) ||
      (row > 0 && col < 4 && this.cells![row - 1][col + 1] === Cell.Empty)
    );
  }

  moveNeutron(move: Direction) {
    var [row, col] = this.findNeutron();
    var continueMoving: Boolean = true;
    while (continueMoving) {
      this.cells![row][col] = Cell.Empty;
      [continueMoving, row, col] = this.tryMove(move, row, col);
      this.cells![row][col] = Cell.Neutron;
    }
  }

  moveToken(
    tokenColor: TokenColor | undefined,
    tokenMove: { row: number; col: number; direction: Direction }
  ) {
    var [row, col] = [tokenMove.row, tokenMove.col];
    var cellToMove: Cell;
    if (
      tokenColor! === TokenColor.White &&
      this.cells![row][col] === Cell.White
    ) {
      cellToMove = Cell.White;
    } else if (
      tokenColor! === TokenColor.Black &&
      this.cells![row][col] === Cell.Black
    ) {
      cellToMove = Cell.Black;
    } else {
      throw Error("Invalid token move");
    }

    var continueMoving: Boolean = true;
    while (continueMoving) {
      this.cells![row][col] = Cell.Empty;
      [continueMoving, row, col] = this.tryMove(tokenMove.direction, row, col);
      this.cells![row][col] = cellToMove!;
    }
  }

  tryMove(
    move: Direction,
    row: number,
    col: number
  ): [Boolean, number, number] {
    var continueMoving: Boolean = true;
    switch (move) {
      case Direction.Up:
        continueMoving = row > 0 && this.cells![row - 1][col] === Cell.Empty;
        if (continueMoving) {
          --row;
        }
        break;

      case Direction.UpLeft:
        continueMoving =
          row > 0 && col > 0 && this.cells![row - 1][col - 1] === Cell.Empty;
        if (continueMoving) {
          --row;
          --col;
        }
        break;

      case Direction.Left:
        continueMoving = col > 0 && this.cells![row][col - 1] === Cell.Empty;
        if (continueMoving) {
          --col;
        }
        break;

      case Direction.DownLeft:
        continueMoving =
          row < 4 && col > 0 && this.cells![row + 1][col - 1] === Cell.Empty;
        if (continueMoving) {
          ++row;
          --col;
        }
        break;

      case Direction.Down:
        continueMoving = row < 4 && this.cells![row + 1][col] === Cell.Empty;
        if (continueMoving) {
          ++row;
        }
        break;

      case Direction.DownRight:
        continueMoving =
          row < 4 && col < 4 && this.cells![row + 1][col + 1] === Cell.Empty;
        if (continueMoving) {
          ++row;
          ++col;
        }
        break;

      case Direction.Right:
        continueMoving = col < 4 && this.cells![row][col + 1] === Cell.Empty;
        if (continueMoving) {
          ++col;
        }
        break;

      case Direction.UpRight:
        continueMoving =
          row > 0 && col < 4 && this.cells![row - 1][col + 1] === Cell.Empty;
        if (continueMoving) {
          --row;
          ++col;
        }
        break;
    }
    return [continueMoving, row, col];
  }
}

export { Board };
