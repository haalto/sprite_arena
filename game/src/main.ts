import Phaser, { Game } from "phaser";

import GameScene from "./scenes/GameScene";
import BootScene from "./scenes/BootScene";

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
};

export default new Phaser.Game(config);
