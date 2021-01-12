import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Image {
  scene: Phaser.Scene;
  velocity: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame: number
  ) {
    super(scene, x, y, key, frame);
    this.velocity = 160;
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setScale(2);
    ((this as unknown) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody).body.setCollideWorldBounds(
      true
    );
    this.setImmovable(false);
    this.scene.add.existing(this);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.setVelocity(0);

    if (cursors?.left.isDown) {
      this.setVelocityX(-this.velocity);
    }

    if (cursors?.right.isDown) {
      this.setVelocityX(this.velocity);
    }

    if (cursors?.up.isDown) {
      this.setVelocityY(-this.velocity);
    }

    if (cursors?.down.isDown) {
      this.setVelocityY(this.velocity);
    }
  }
}
