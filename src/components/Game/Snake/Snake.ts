import { Size } from '../types';
import { transformGridToCanvasCoords } from '../utils';
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

  gridSize: Size;

  canvasSize: {
    width: number;
    height: number;
  };

  constructor(
    initialSections: SnakeSection[],
    initialDx: number,
    initialDy: number,
    foodRef: Food,
    context: CanvasRenderingContext2D,
    gridSize: Size,
    canvasSize: Size,
  ) {
    this.dx = initialDx;
    this.dy = initialDy;
    this.sections = initialSections;
    this.food = foodRef;
    this.ctx = context;
    this.gridSize = gridSize;
    this.canvasSize = canvasSize;
  }

  isHeadCollisionWithBody() {
    const { x, y } = this.getHead();
    return this.sections.slice(1).some((elem) => elem.x === x && elem.y === y);
  }

  changeDirection(direction) {
    switch (direction) {
      case 'down':
        if (this.dy === -1) {
          break;
        }
        this.dy = 1;
        this.dx = 0;
        break;
      case 'left':
        if (this.dx === 1) {
          break;
        }
        this.dx = -1;
        this.dy = 0;
        break;
      case 'right':
        if (this.dx === -1) {
          break;
        }
        this.dx = 1;
        this.dy = 0;
        break;
      case 'up':
        if (this.dy === 1) {
          break;
        }
        this.dy = -1;
        this.dx = 0;
        break;
      default:
    }
  }

  getHead() {
    return this.sections[0];
  }

  isFoodCoordsInsideSnake(xCoord: number, yCoord: number) {
    let isHaveCollision = false;

    for (let i = 0; i < this.sections.length; i++) {
      const { x, y } = this.sections[i];
      if (x === xCoord && y === yCoord) {
        isHaveCollision = true;
        break;
      }
    }
    return isHaveCollision;
  }

  isFoodEaten() {
    if (!this.food) {
      return false;
    }
    const { x, y } = this.getHead();
    return this.food.x === x && this.food.y === y;
  }

  move() {
    const newHead = {
      x: this.getHead().x + this.dx,
      y: this.getHead().y + this.dy,
    };

    if (this.isFoodEaten()) {
      this.food.genFood();
      this.sections = [newHead, ...this.sections.slice(0, this.sections.length)];
    } else {
      this.sections = [newHead, ...this.sections.slice(0, this.sections.length - 1)];
    }
  }

  draw() {
    const { width, height } = transformGridToCanvasCoords({
      canvasSize: this.canvasSize,
      gridSize: this.gridSize,
    });
    this.ctx.fillStyle = '#fff';
    this.ctx.strokeStyle = '#000';
    this.sections.forEach((item) => {
      this.ctx.fillRect(item.x * width, item.y * height, width, height);
      this.ctx.strokeRect(item.x * width, item.y * height, width, height);
    });
  }
}
