export enum TokenColor {
  Black,
  White,
}

export class Player {
  name?: string;
  tokenColor?: TokenColor;

  constructor(name?: string, tokenColor?: TokenColor) {
    if (!(name && name.trim().length > 0))
      throw Error("Player name must be provided");
    if (!(tokenColor !== undefined))
      throw Error("Token color must be provided");
    this.name = name.trim();
    this.tokenColor = tokenColor;
  }
}
