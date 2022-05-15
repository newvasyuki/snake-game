import { Food } from './mechanics/Food';
import { Snake } from './mechanics/Snake';

type EventHandler<T = unknown> = (...args: T[]) => void;

type EventListeners = {
  [key: string]: EventHandler[];
};

export class Game {
  canvasRef: HTMLCanvasElement | null;

  ctx: CanvasRenderingContext2D | null;

  width: number;

  height: number;

  snake: Snake | null;

  food: Food | null;

  frame: number;

  msInterval: number;

  then: number;

  isStarted: boolean;

  listeners: EventListeners;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.isStarted = false;
    this.canvasRef = canvas;
    this.width = width;
    this.height = height;
    this.ctx = this.canvasRef.getContext('2d');
    this.listeners = {};
    this.init();
    this.addEventListeners();
  }

  subscribeEvent(eventName: 'start' | 'end', cb: () => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(cb);
  }

  emit(eventName: 'start' | 'end', ...args: unknown[]) {
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

  draw = () => {
    const { x, y } = this.snake.getHead();

    if (
      x >= this.width - 10 ||
      y >= this.height - 10 ||
      x <= 0 ||
      y <= 0 ||
      this.snake.checkCollision()
    ) {
      // hit border stop the game
      this.resetGame();
      return;
    }

    this.frame = window.requestAnimationFrame(this.draw);

    const now = Date.now();

    const elapsed = now - this.then;

    if (elapsed >= this.msInterval) {
      this.then = now;

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.snake.draw();
      this.food.draw();
    }
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
        x: 40,
        y: 20,
      },
      {
        x: 30,
        y: 20,
      },
      {
        x: 20,
        y: 20,
      },
    ];
    this.food = new Food(10, 10, this.ctx, this.width, this.height);
    this.snake = new Snake(initSections, 10, 0, this.food, this.ctx);
    this.food.setSnake(this.snake);
  }

  startGame() {
    // пока захардкожено, возможно будем увеличивать скорость игры, путем изменения значения
    // или есть какой-то другой способ сделать движения пошаговыми (по 10 пикселей)
    this.isStarted = true;
    this.emit('start');
    this.msInterval = 500;
    this.then = Date.now();
    this.draw();
  }

  pauseGame() {
    window.cancelAnimationFrame(this.frame);
    this.isStarted = false;
    this.emit('end');
  }

  resetGame() {
    window.cancelAnimationFrame(this.frame);
    this.isStarted = false;
    this.emit('end');
    this.init();
  }
}
