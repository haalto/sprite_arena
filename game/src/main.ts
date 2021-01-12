import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import BootScene from "./scenes/BootScene";
import { Game } from "./classes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BootScene, GameScene],
  render: {
    pixelArt: true,
    roundPixels: true,
  },
};

export default new Game(config);
