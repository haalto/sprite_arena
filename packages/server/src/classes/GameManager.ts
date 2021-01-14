import { Server, Socket } from "socket.io";
import ParticleModel from "./ParticleModel";
import PlayerModel from "./PlayerModel";
import { v4 } from "uuid";

interface GameState {
  players: Players;
  particles: Particles;
}

interface Players {
  [key: string]: PlayerModel;
}

interface Particles {
  [key: string]: ParticleModel;
}

interface QueryParams {
  clientType: "controller" | "game";
}

type ClientType = "controller" | "game";

export default class GameManager {
  io: Server;
  gameState: GameState;
  gameViewsIds: string[];
  TICK_RATE = 16.667;

  constructor(io: Server) {
    this.io = io;
    this.gameState = { players: {}, particles: {} };
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
          if (this.gameViewsIds.length !== 0) {
            this.gameViewsIds.forEach((id) => {
              this.io.to(id).emit("player-disconnected", socket.id);
            });
          }
        }

        console.log(`${socket.id} disconnected`);
      });

      socket.on("player-move-angle", (moveAngle: number) => {
        this.gameState.players[socket.id].moveAngle = moveAngle;
      });

      socket.on("player-aim-angle", (aimAngle: number) => {
        this.gameState.players[socket.id].aimAngle = aimAngle;
      });

      socket.on("player-aim-release", () => {
        const player = this.gameState.players[socket.id];
        const particle = new ParticleModel(
          v4(),
          player,
          player.x,
          player.y,
          3,
          player.aimAngle,
          25
        );
        this.gameState.particles[particle.id] = particle;
      });

      socket.on("health", (data: string) => {
        console.log(data);
      });
    });
  }

  async gameLoop(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (Object.keys(this.gameState.players).length !== 0) {
        this.updatePlayers();
        this.updateParticles();
      }

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
    this.tick;
  }

  updatePlayers(): void {
    Object.keys(this.gameState.players).forEach((id) => {
      this.gameState.players[id].update();
    });
  }

  updateParticles(): void {
    Object.keys(this.gameState.particles).forEach((id) => {
      this.gameState.particles[id].update();
    });
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
