export default class Player {
  id: string;
  x: number;
  y: number;
  moveAngle: number | null;
  aimAngle: number | null;
  velocity: number;
  key: string;
  frame: number;

  constructor(id: string, x: number, y: number, key: string, frame: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.velocity = 160;
    this.key = key;
    this.frame = frame;
    this.moveAngle = null;
    this.aimAngle = null;
  }
}
