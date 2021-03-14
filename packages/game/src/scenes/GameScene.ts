import Phaser from "phaser";
import { Player } from "../classes/Player";
import { Map } from "../classes/Map";
import { Socket } from "socket.io-client";
import { Game } from "../classes/Game";
import { Particle } from "~/classes/Particle";
import nipplejs, { JoystickManager } from "nipplejs";

interface PlayerModel {
  id: string;
  x: number;
  y: number;
  moveAngle: number;
  aimAngle: number;
  key: string;
  frame: number;
}

interface ParticleModel {
  id: string;
  x: number;
  y: number;
}

interface GameState {
  players: { [key: string]: PlayerModel };
  particles: { [key: string]: ParticleModel };
}

interface Players {
  [key: string]: Player;
}

interface Particles {
  [key: string]: Particle;
}

export default class GameScene extends Phaser.Scene {
  map: Map | null;
  tiles: Phaser.Tilemaps.Tileset | null;
  backgroundLayer: Phaser.Tilemaps.TilemapLayer | null;
  players: Players;
  particles: Particles;
  socket: Socket;
  gameState: GameState;
  leftJoystick: JoystickManager | null;
  rightJoystick: JoystickManager | null;

  constructor(socket: Socket) {
    super("Game");
    this.gameState = { players: {}, particles: {} };
    this.socket = socket;
    this.map = null;
    this.tiles = null;
    this.backgroundLayer = null;
    this.players = {};
    this.particles = {};
    this.leftJoystick = null;
    this.rightJoystick = null;
  }

  init() {
    this.socket = (this.sys.game as Game).socket;
  }

  create() {
    this.createMap();
    this.createJoysticks();
    this.setUpEventListeners();
    this.update();
  }

  update() {
    this.updatePlayers(this.gameState);
    this.updateParticles(this.gameState);
  }

  createJoysticks() {
    const leftJoystickZone = document.createElement("div");
    leftJoystickZone.style.width = "300px";
    leftJoystickZone.style.height = "100%";
    leftJoystickZone.style.border = "1px solid green";
    this.add.dom(150, 320, leftJoystickZone);

    const rightJoystickZone = document.createElement("div");
    rightJoystickZone.style.width = "300px";
    rightJoystickZone.style.height = "100%";
    rightJoystickZone.style.border = "1px solid red";
    this.add.dom(490, 320, rightJoystickZone);

    this.leftJoystick = nipplejs.create({
      zone: leftJoystickZone,
    });

    this.rightJoystick = nipplejs.create({
      zone: rightJoystickZone,
    });
  }

  setUpEventListeners() {
    this.socket.emit("health", "Health check");
    this.socket.on("game-state", (gameState) => {
      this.gameState = gameState;
    });

    (this.leftJoystick as JoystickManager).on("move", (evt, nipple) => {
      console.log("1");
    });

    (this.rightJoystick as JoystickManager).on("move", (evt, nipple) => {
      console.log("2");
    });
  }

  updatePlayers(gameState: GameState) {
    Object.keys(gameState.players).forEach((id) => {
      //Create new player
      if (this.players[id] === undefined) {
        const newPlayer = gameState.players[id];
        this.players[newPlayer.id] = new Player(
          newPlayer.id,
          this,
          newPlayer.x,
          newPlayer.y,
          newPlayer.key,
          newPlayer.frame
        );
      }

      //Update position of player
      if (this.players[id].x !== gameState.players[id].x) {
        this.players[id].x = gameState.players[id].x;
      }

      if (this.players[id].y !== gameState.players[id].y) {
        this.players[id].y = gameState.players[id].y;
      }
    });

    Object.keys(this.players).forEach((p) => {
      if (this.gameState.players[p] === undefined) {
        this.players[p].destroy();
        delete this.players[p];
      }
    });
  }

  updateParticles(gameState: GameState) {
    Object.keys(gameState.particles).forEach((id) => {
      //Create new particle
      if (this.particles[id] === undefined) {
        const newParticle = gameState.particles[id];
        this.particles[newParticle.id] = new Particle(
          newParticle.id,
          this,
          newParticle.x,
          newParticle.y,
          "characters",
          1
        );
      }

      //Update position of particles
      if (this.particles[id].x !== gameState.particles[id].x) {
        this.particles[id].x = gameState.particles[id].x;
      }

      if (this.particles[id].y !== gameState.particles[id].y) {
        this.particles[id].y = gameState.particles[id].y;
      }
    });
  }

  createMap() {
    this.map = new Map(this, "map", "background", "background");
  }
}
