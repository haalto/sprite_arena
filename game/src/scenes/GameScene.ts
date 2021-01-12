import Phaser from "phaser";
import { Player } from "../classes/Player";
import { Map } from "../classes/Map";

export default class GameScene extends Phaser.Scene {
  map: Map | null;
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
    this.createInputs();
    this.createPlayer();
  }

  update() {
    this.player?.update(this.cursors as Phaser.Types.Input.Keyboard.CursorKeys);
  }

  createInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    this.player = new Player(
      this,
      32,
      32,
      "characters",
      Math.floor(Math.random() * 23)
    );
  }

  createMap() {
    this.map = new Map(this, "map", "background", "background");
  }
}
