import { Snake } from '../Snake';

function createRandomFoodCoord(minCoord: number, maxCoord: number, gridSize: number) {
  return Math.round((Math.random() * (maxCoord - minCoord) + minCoord) / gridSize) * gridSize;
}

export class Food {
  x: number | null;

  y: number | null;

  snake: Snake;

  context: CanvasRenderingContext2D;

  canvasWidth: number;

  canvasHeight: number;

  constructor(
    initialX: number | null,
    initialY: number | null,
    canvasContext: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    this.x = initialX;
    this.y = initialY;
    this.context = canvasContext;
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  setSnake(snake: Snake) {
    this.snake = snake;
  }

  genFood() {
    const x = createRandomFoodCoord(0, this.canvasWidth - 10, 10); // canvas width
    const y = createRandomFoodCoord(0, this.canvasHeight - 10, 10); // canvas height
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
