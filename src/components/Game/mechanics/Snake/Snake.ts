import { Food } from '../Food';

type SnakeSection = {
  x: number;
  y: number;
};

export class Snake {
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

  checkIsCoordsInsideSnake(xCoord: number, yCoord: number) {
    let isHaveCollision = false;

    for (let i = 0; i < this.sections.length; i++) {
      const { x, y } = this.sections[i];
      if (x === xCoord || y === yCoord) {
        isHaveCollision = true;
        break;
      }
    }
    return isHaveCollision;
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
