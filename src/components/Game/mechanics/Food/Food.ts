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

  gridSize: {
    x: number;
    y: number;
  };

  constructor(
    initialX: number | null,
    initialY: number | null,
    canvasContext: CanvasRenderingContext2D,
    width: number,
    height: number,
    gridSize: {
      x: number;
      y: number;
    },
  ) {
    this.x = initialX;
    this.y = initialY;
    this.context = canvasContext;
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.gridSize = gridSize;
  }

  setSnake(snake: Snake) {
    this.snake = snake;
  }

  genFood() {
    const x = createRandomFoodCoord(0, this.gridSize.x - 1, 1); // canvas width
    const y = createRandomFoodCoord(0, this.gridSize.y - 1, 1); // canvas height
    this.x = x;
    this.y = y;
    this.checkSnakeCollision();
  }

  checkSnakeCollision(): void {
    if (!this.snake) {
      return;
    }

    if (this.snake.checkIsCoordsInsideSnake(this.x, this.y)) {
      this.genFood();
    }
  }

  transformGridToCanvasCoords() {
    return {
      width: this.canvasWidth / this.gridSize.x,
      height: this.canvasHeight / this.gridSize.y,
    };
  }

  draw() {
    const { width, height } = this.transformGridToCanvasCoords();
    this.context.fillStyle = 'lightgreen';
    this.context.strokeStyle = 'darkgreen';
    this.context.fillRect(this.x * width, this.y * height, width, height);
    this.context.strokeRect(this.x * width, this.y * height, width, height);
  }
}
