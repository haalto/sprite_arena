import Phaser from "phaser";
import { Player } from "~/classes/Player";

export default class GameScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap | null;
  tiles: Phaser.Tilemaps.Tileset | null;
  backgroundLayer: Phaser.Tilemaps.TilemapLayer | null;
  player: Player | null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;

  constructor() {
    super("Game");
    this.map = null;
    this.tiles = null;
    this.backgroundLayer = null;
    this.player = null;
    this.cursors = null;
  }

  create() {
    this.createMap();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 32, 32, "characters", 0);
  }

  update() {
    this.player?.update(this.cursors as Phaser.Types.Input.Keyboard.CursorKeys);
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
