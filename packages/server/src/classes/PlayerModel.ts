export default class Player {
  id: string;
  x: number;
  y: number;
  moveAngle: number | null;
  aimAngle: number;
  velocity: number;
  key: string;
  frame: number;

  constructor(id: string, x: number, y: number, key: string, frame: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.velocity = 3;
    this.key = key;
    this.frame = frame;
    this.moveAngle = null;
    this.aimAngle = 20;
  }

  update(): void {
    this.updatePosition();
  }

  updatePosition(): void {
    if (this.moveAngle) {
      const newX = this.x + this.velocity * Math.cos(this.moveAngle);
      const newY = this.y - this.velocity * Math.sin(this.moveAngle);

      if (newX > 639 || newX < 1) {
        return;
      }

      if (newY > 639 || newY < 1) {
        return;
      }

      this.x = newX;
      this.y = newY;
    }
  }
}
