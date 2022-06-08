import { Food } from './Food';
import { Snake } from './Snake';
import { Size } from './types';

type EventHandler<T = unknown> = (...args: T[]) => void;

type EventListeners = {
  [key: string]: EventHandler[];
};

const GAME_STATUS = {
  INITIAL: 'INITIAL',
  PLAY: 'PLAY',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER',
} as const;

type GameStatus = keyof typeof GAME_STATUS;

export class Game {
  canvasRef: HTMLCanvasElement | null;

  ctx: CanvasRenderingContext2D | null;

  canvasSize: Size;

  snake: Snake | null;

  food: Food | null;

  frame: number;

  msInterval: number;

  startTime: number;

  status: GameStatus;

  listeners: EventListeners;

  gridSize: Size;

  count: number;

  constructor(canvas: HTMLCanvasElement, canvasSize: Size, gridSize: Size) {
    this.status = GAME_STATUS.INITIAL;
    this.canvasRef = canvas;
    this.canvasSize = canvasSize;
    this.ctx = this.canvasRef.getContext('2d');
    this.listeners = {};
    this.gridSize = gridSize;
    this.init();
    this.addEventListeners();
  }

  subscribeEvent(eventName: 'start' | 'end' | 'updateScore', cb: (...args) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(cb);
  }

  emit(eventName: 'start' | 'end' | 'updateScore', ...args: unknown[]) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName].forEach((event) => event(...args));
  }

  destroy() {
    this.removeEventListeners();
    this.canvasRef = null;
    this.snake = null;
    this.food = null;
  }

  // хотел прибиндидь, но что-то пошло не так
  keyPressHandler = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'ArrowDown':
        this.snake.changeDirection('down');
        break;
      case 'ArrowUp':
        this.snake.changeDirection('up');
        break;
      case 'ArrowLeft':
        this.snake.changeDirection('left');
        break;
      case 'ArrowRight':
        this.snake.changeDirection('right');
        break;
      default:
    }
  };

  drawBoard() {
    let x = 0;
    let y = 0;

    const { width, height } = this.canvasSize;
    const { width: gridWidth, height: gridHeight } = this.gridSize;

    while (x <= width && y <= height) {
      this.ctx.strokeStyle = '#fff';
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();

      x += width / gridWidth;
      y += height / gridHeight;
    }
  }

  draw = () => {
    const now = performance.now();

    const elapsed = now - this.startTime;

    if (elapsed >= this.msInterval) {
      const { x, y } = this.snake.getHead();
      const { width, height } = this.canvasSize;
      this.startTime = now;

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, width, height);
      this.drawBoard();
      this.snake.move();

      // тут нужно проверить что змейка не съела еду, но она попала на координаты змейки (сгенерировалась внутри)
      if (
        this.snake.isFoodCoordsInsideSnake(this.food.x, this.food.y) &&
        !this.snake.isFoodEaten()
      ) {
        this.food.genFood();
      }

      // змейка утопает на 1 клетку, иначе не получилось
      if (
        x >= this.gridSize.width ||
        y >= this.gridSize.height ||
        x <= -1 ||
        y <= -1 ||
        this.snake.isHeadCollisionWithBody()
      ) {
        // hit border stop the game
        this.resetGame();
        return;
      }
      this.emit('updateScore', this.snake.getScore());
      this.snake.draw();
      this.food.draw();
    }
    this.frame = window.requestAnimationFrame(this.draw);
  };

  addEventListeners() {
    document.addEventListener('keydown', this.keyPressHandler);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.keyPressHandler);
  }

  init() {
    const initSections = [
      {
        x: 4,
        y: 2,
      },
      {
        x: 3,
        y: 2,
      },
      {
        x: 2,
        y: 2,
      },
    ];
    this.food = new Food(1, 1, this.ctx, this.canvasSize, this.gridSize);
    this.snake = new Snake(initSections, 1, 0, this.food, this.ctx, this.gridSize, this.canvasSize);
  }

  startGame() {
    // пока захардкожено, возможно будем увеличивать скорость игры, путем изменения значения
    // или есть какой-то другой способ сделать движения пошаговыми (по 10 пикселей)
    this.status = GAME_STATUS.PLAY;
    this.emit('start');
    this.msInterval = 500;
    this.startTime = performance.now();
    this.draw();
  }

  pauseGame() {
    window.cancelAnimationFrame(this.frame);
    this.status = GAME_STATUS.PAUSED;
    this.emit('end');
  }

  resetGame() {
    this.pauseGame();
    this.init();
  }
}
