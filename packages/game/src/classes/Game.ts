import Phaser from "phaser";
import { io, Socket } from "socket.io-client";

export class Game extends Phaser.Game {
  socket: Socket;
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.scene.start("Boot");
    this.socket = io(`http://localhost:4000`, {
      autoConnect: true,
      query: {
        clientType: "game",
      },
    });
  }
}
