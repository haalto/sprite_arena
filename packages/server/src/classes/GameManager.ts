import { Server, Socket } from "socket.io";
import PlayerModel from "./PlayerModel";

interface GameState {
  players: Player;
}

interface Player {
  [key: string]: PlayerModel;
}

interface QueryParams {
  clientType: "controller" | "game";
}

type ClientType = "controller" | "game";

export default class GameManager {
  io: Server;
  gameState: GameState;
  gameViewsIds: string[];
  TICK_RATE = 15.6;

  constructor(io: Server) {
    this.io = io;
    this.gameState = { players: {} };
    this.gameViewsIds = [];
  }

  setup(): void {
    this.setUpEventListeners();
    this.gameLoop();
  }

  setUpEventListeners(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log(`${socket.id} connected `);

      const clientType = (socket.handshake.query as QueryParams)?.clientType;
      const id = socket.id;
      this.addClient(clientType, id);

      socket.on("disconnect", () => {
        if (clientType === "game") {
          this.gameViewsIds.splice(this.gameViewsIds.indexOf(socket.id), 1);
        } else {
          delete this.gameState.players[socket.id];
        }

        console.log(`${socket.id} disconnected`);
      });

      socket.on("player-move-angle", (moveAngle: number) => {
        console.log(moveAngle);
        this.gameState.players[socket.id].moveAngle = moveAngle;
      });

      socket.on("player-aim-angle", (aimAngle: number) => {
        console.log(aimAngle);
        this.gameState.players[socket.id].aimAngle = aimAngle;
      });

      socket.on("player-aim-release", () => {
        console.log("release");
      });

      socket.on("health", (data: string) => {
        console.log(data);
      });
    });
  }

  async gameLoop(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.gameViewsIds.length !== 0) {
        this.gameViewsIds.forEach((id) => {
          this.io.to(id).emit("game-state", this.gameState);
        });
      }
      await this.tick(this.TICK_RATE);
    }
  }

  private async tick(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  addPlayer(newPlayer: PlayerModel): void {
    this.gameState.players[newPlayer.id] = newPlayer;
  }

  addClient(clientType: ClientType, id: string): void {
    if (clientType === "game" && !this.gameViewsIds.includes(id)) {
      console.log("create game client");
      this.gameViewsIds.push(id);
    }

    if (clientType === "controller" && !this.gameState.players[id]) {
      console.log("create player");
      const newPlayer = new PlayerModel(
        id,
        32,
        32,
        "characters",
        Math.floor(Math.random() * 23)
      );
      this.addPlayer(newPlayer);
    }
  }
}
