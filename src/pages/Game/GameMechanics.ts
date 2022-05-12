/* eslint-disable max-classes-per-file */
import { RefObject } from 'react';

class SnakeSection {
  x: number;

  y: number;

  constructor(xCoord: number, yCoord: number) {
    this.x = xCoord;
    this.y = yCoord;
  }
}

function createRandomFoodCoord(minCoord: number, maxCoord: number, gridSize: number) {
  return Math.round((Math.random() * (maxCoord - minCoord) + minCoord) / gridSize) * gridSize;
}

class Food {
  x: number;

  y: number;

  snake: Snake;

  context: CanvasRenderingContext2D;

  constructor(
    initialX: number,
    initialY: number,
    snakeRef: Snake,
    canvasContext: CanvasRenderingContext2D,
  ) {
    this.x = initialX;
    this.y = initialY;
    this.snake = snakeRef;
    this.context = canvasContext;
  }

  genFood() {
    const x = createRandomFoodCoord(0, 300 - 10, 10); // canvas width
    const y = createRandomFoodCoord(0, 300 - 10, 10); // canvas height
    this.x = x;
    this.y = y;
    this.checkSnakeCollision();
  }

  checkSnakeCollision(): void {
    if (!this.snake) {
      return;
    }
    let isHaveCollision = false;

    for (let i = 0; i < this.snake.sections.length; i++) {
      const { x, y } = this.snake.sections[i];
      if (x === this.x || y === this.y) {
        isHaveCollision = true;
        break;
      }
    }
    if (isHaveCollision) {
      this.genFood();
    }
  }

  draw() {
    this.context.fillStyle = 'lightgreen';
    this.context.strokeStyle = 'darkgreen';
    this.context.fillRect(this.x, this.y, 10, 10);
    this.context.strokeRect(this.x, this.y, 10, 10);
  }
}

class Snake {
  dx: number;

  dy: number;

  sections: SnakeSection[];

  food: Food;

  ctx: CanvasRenderingContext2D;

  constructor(
    initialSections: SnakeSection[],
    initialDx: number,
    initialDy: number,
    foodRef: Food,
    context: CanvasRenderingContext2D,
  ) {
    this.dx = initialDx;
    this.dy = initialDy;
    this.sections = initialSections;
    this.food = foodRef;
    this.ctx = context;
  }

  checkCollision() {
    const { x, y } = this.getHead();
    return this.sections.slice(1).some((elem) => elem.x === x && elem.y === y);
  }

  changeDirection(direction) {
    switch (direction) {
      case 'down':
        if (this.dy === -10) {
          break;
        }
        this.dy = 10;
        this.dx = 0;
        break;
      case 'left':
        if (this.dx === 10) {
          break;
        }
        this.dx = -10;
        this.dy = 0;
        break;
      case 'right':
        if (this.dx === -10) {
          break;
        }
        this.dx = 10;
        this.dy = 0;
        break;
      case 'up':
        if (this.dy === 10) {
          break;
        }
        this.dy = -10;
        this.dx = 0;
        break;
      default:
    }
  }

  getHead() {
    return this.sections[0];
  }

  checkIsFoodEaten() {
    const { x, y } = this.getHead();
    return this.food.x === x && this.food.y === y;
  }

  move() {
    const newHead = {
      x: this.getHead().x + this.dx,
      y: this.getHead().y + this.dy,
    };

    if (this.checkIsFoodEaten()) {
      this.food.genFood();
      this.sections = [newHead, ...this.sections.slice(0, this.sections.length)];
    } else {
      this.sections = [newHead, ...this.sections.slice(0, this.sections.length - 1)];
    }
  }

  draw() {
    this.move();
    this.ctx.fillStyle = '#fff';
    this.sections.forEach((item) => {
      this.ctx.fillRect(item.x, item.y, 10, 10);
    });
  }
}

// function drawFood(context) {
//   food.draw(context);
// }

// function drawSnake(context, food) {
//   snake.draw(context, food);
// }

// // let timerId = setTimeout(function foo() {
// //   // console.log(genFood());
// //   food.genFood();
// //   timerId = setTimeout(foo, 1000);
// //   // clearTimeout(timerId);
// // }, 1000);

// const interval = 500;
// let then = Date.now();

// function draw() {
//   const { x, y } = snake.getHead();

//   if (x >= 290 || y >= 290 || x <= 0 || y <= 0 || snake.checkCollision()) {
//     // hit border stop the game
//     window.cancelAnimationFrame(frame);
//     // clearTimeout(timerId);
//     return;
//   }

//   frame = window.requestAnimationFrame(draw);

//   const now = Date.now();

//   const elapsed = now - then;

//   if (elapsed >= interval) {
//     then = now;

//     context.fillStyle = '#000000';
//     context.fillRect(0, 0, 300, 300);
//     drawFood(context);
//     drawSnake(context, food);
//   }
// }
// // food.genFood(snake);
// draw();

// document.addEventListener('keydown', (evt) => {
//   switch (evt.key) {
//     case 'ArrowDown':
//       snake.changeDirection('down');
//       break;
//     case 'ArrowUp':
//       snake.changeDirection('up');
//       break;
//     case 'ArrowLeft':
//       snake.changeDirection('left');
//       break;
//     case 'ArrowRight':
//       snake.changeDirection('right');
//       break;
//     default:
//   }
// });

export class Game {
  canvas: RefObject<HTMLCanvasElement>;

  snake: Snake;

  food: Food;

  frame: number;

  msInterval: number;

  then: number;

  constructor(canvasRef: RefObject<HTMLCanvasElement>) {
    this.canvas = canvasRef;
    const context = this.canvas.current?.getContext('2d');

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
    this.snake = new Snake(initSections, 10, 0, this.food, context);
    this.food = new Food(0, 0, this.snake, context);
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

  addEventListeners() {
    document.addEventListener('keydown', this.keyPressHandler);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.keyPressHandler);
  }

  draw = () => {
    const { x, y } = this.snake.getHead();

    const context = this.canvas.current?.getContext('2d');
    context.fillStyle = '#000000';
    context.fillRect(0, 0, 300, 300);

    if (x >= 290 || y >= 290 || x <= 0 || y <= 0 || this.snake.checkCollision()) {
      // hit border stop the game
      window.cancelAnimationFrame(this.frame);
      // clearTimeout(timerId);
      return;
    }

    this.frame = window.requestAnimationFrame(this.draw);

    const now = Date.now();

    this.then = now;

    const elapsed = now - this.then;

    if (elapsed >= this.msInterval) {
      this.then = now;

      context.fillStyle = '#000000';
      context.fillRect(0, 0, 300, 300);
      this.snake.draw();
      this.food.draw();
    }
  };

  startGame() {
    console.log('game started!');
    console.log(this.canvas);

    this.draw();
  }
}
