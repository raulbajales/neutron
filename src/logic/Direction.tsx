export enum Direction {
  NoDirectionSet,
  Up,
  UpRight,
  Right,
  DownRight,
  Down,
  DownLeft,
  Left,
  UpLeft,
}

export const discoverDirection = (
  rowMove: number,
  colMove: number
): Direction | undefined => {
  if (rowMove < 0 && colMove === 0) {
    return Direction.Up;
  }
  if (rowMove < 0 && colMove > 0) {
    return Direction.UpRight;
  }
  if (rowMove === 0 && colMove > 0) {
    return Direction.Right;
  }
  if (rowMove > 0 && colMove > 0) {
    return Direction.DownRight;
  }
  if (rowMove > 0 && colMove === 0) {
    return Direction.Down;
  }
  if (rowMove > 0 && colMove < 0) {
    return Direction.DownLeft;
  }
  if (rowMove === 0 && colMove < 0) {
    return Direction.Left;
  }
  if (rowMove < 0 && colMove < 0) {
    return Direction.UpLeft;
  }
  return undefined;
};
