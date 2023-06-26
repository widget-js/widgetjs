export interface Point {
  x: number;
  y: number;
}

export type Position = {
  x: number,
  y: number
}

export enum Gravity {
  TOP = 'TOP', LEFT = "LEFT", RIGHT = "RIGHT", BOTTOM = "BOTTOM"
}
