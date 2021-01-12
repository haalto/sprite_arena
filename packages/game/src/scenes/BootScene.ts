export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.loadTileMap();
    this.loadImages();
    this.loadSpriteSheets();
  }

  create() {
    this.scene.start("Game");
  }

  loadImages() {
    this.load.image("background", "level/background-extruded.png");
  }

  loadSpriteSheets() {
    this.load.spritesheet("characters", "images/characters.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  loadTileMap() {
    this.load.tilemapTiledJSON("map", "level/test.json");
  }
}
