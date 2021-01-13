import Phaser from "phaser";
import { Player } from "../classes/Player";
import { Map } from "../classes/Map";
import { Socket } from "socket.io-client";
import { Game } from "../classes/Game";

export default class GameScene extends Phaser.Scene {
  map: Map | null;
  tiles: Phaser.Tilemaps.Tileset | null;
  backgroundLayer: Phaser.Tilemaps.TilemapLayer | null;
  player: Player | null;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
  socket: Socket;

  constructor(socket: Socket) {
    super("Game");
    this.socket = socket;
    this.map = null;
    this.tiles = null;
    this.backgroundLayer = null;
    this.player = null;
    this.cursors = null;
  }

  init() {
    this.socket = (this.sys.game as Game).socket;
  }

  create() {
    this.createMap();
    this.createInputs();
    this.createPlayer();
    this.socket.emit("health", "Health check");

    this.socket.on("game-state", (gameState) => {
      this.updateGameState(gameState);
    });
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

  updateGameState(gameState) {}

  updatePlayers() {}

  createMap() {
    this.map = new Map(this, "map", "background", "background");
  }
}
