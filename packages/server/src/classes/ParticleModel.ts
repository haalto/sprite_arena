import PlayerModel from "./PlayerModel";

export default class Particle {
  id: string;
  player: PlayerModel;
  x: number;
  y: number;
  velocity: number;
  angle: number;
  damage: number;

  constructor(
    id: string,
    player: PlayerModel,
    x: number,
    y: number,
    velocity: number,
    angle: number,
    damage: number
  ) {
    this.id = id;
    this.player = player;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.angle = angle;
    this.damage = damage;
  }

  update(): void {
    this.updatePosition();
  }

  updatePosition(): void {
    if (this.angle) {
      const newX = this.x + this.velocity * Math.cos(this.angle);
      const newY = this.y - this.velocity * Math.sin(this.angle);

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
