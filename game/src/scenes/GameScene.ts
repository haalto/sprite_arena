import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap | null;
  tiles: Phaser.Tilemaps.Tileset | null;
  backgroundLayer: Phaser.Tilemaps.TilemapLayer | null;
  player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;

  constructor() {
    super("hello-world");
    this.map = null;
    this.tiles = null;
    this.backgroundLayer = null;
    this.player = null;
    this.cursors = null;
  }

  preload() {
    this.loadTileMap();
    this.loadImages();
    this.load.spritesheet("characters", "images/characters.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.createMap();
    this.player = this.physics.add.image(32, 32, "characters", 3);
    this.player.setScale(2);
    this.player.body.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player?.setVelocity(0);

    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-160);
    } else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(160);
    }

    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-160);
    } else if (this.cursors?.down.isDown) {
      this.player?.setVelocityY(160);
    }
  }

  loadImages() {
    this.load.image("background", "level/background-extruded.png");
  }

  loadTileMap() {
    this.load.tilemapTiledJSON("map", "level/test.json");
  }

  createMap() {
    this.map = this.make.tilemap({ key: "map" });
    this.tiles = this.map.addTilesetImage(
      "background",
      "background",
      32,
      32,
      1,
      2
    );
    this.backgroundLayer = this.map.createLayer("background", this.tiles, 0, 0);
    this.backgroundLayer.setScale(2);
  }
}
