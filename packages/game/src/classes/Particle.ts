import Phaser from "phaser";

export class Particle extends Phaser.Physics.Arcade.Image {
  id: string;
  scene: Phaser.Scene;
  velocity: number;

  constructor(
    id: string,
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame: number
  ) {
    super(scene, x, y, key, frame);
    this.id = id;
    this.velocity = 3;
    this.scene = scene;
    /*     this.scene.physics.world.enable(this); */
    this.setScale(1);
    /*     ((this as unknown) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody).body.setCollideWorldBounds(
      true
    ); */
    /*     this.setImmovable(false); */
    this.scene.add.existing(this);
  }

  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  remove() {
    this.destroy();
  }
}
