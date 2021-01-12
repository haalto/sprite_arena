export class Map {
  scene: Phaser.Scene;
  map: Phaser.Tilemaps.Tilemap;
  tiles: Phaser.Tilemaps.Tileset;
  backgroundLayer: Phaser.Tilemaps.TilemapLayer;

  constructor(
    scene: Phaser.Scene,
    key: string,
    tileSetName: string,
    backgroundLayerName: string
  ) {
    this.scene = scene;
    this.map = this.scene.make.tilemap({ key: key });
    this.tiles = this.map.addTilesetImage(
      tileSetName,
      tileSetName,
      32,
      32,
      1,
      2
    );
    this.backgroundLayer = this.map.createLayer(
      backgroundLayerName,
      this.tiles,
      0,
      0
    );
    this.backgroundLayer.setScale(2);
  }
}
