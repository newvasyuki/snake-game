import { Size } from '../types';
import { transformGridToCanvasCoords } from '../utils';

function createRandomFoodCoord(minCoord: number, maxCoord: number, gridSize: number) {
  return Math.round((Math.random() * (maxCoord - minCoord) + minCoord) / gridSize) * gridSize;
}

export class Food {
  x: number | null;

  y: number | null;

  context: CanvasRenderingContext2D;

  canvasSize: Size;

  gridSize: Size;

  constructor(
    initialX: number | null,
    initialY: number | null,
    canvasContext: CanvasRenderingContext2D,
    canvasSize: Size,
    gridSize: Size,
  ) {
    this.x = initialX;
    this.y = initialY;
    this.context = canvasContext;
    this.canvasSize = canvasSize;
    this.gridSize = gridSize;
  }

  genFood() {
    const x = createRandomFoodCoord(0, this.gridSize.width - 1, 1); // grid width
    const y = createRandomFoodCoord(0, this.gridSize.height - 1, 1); // grid height
    this.x = x;
    this.y = y;
  }

  draw() {
    const { width, height } = transformGridToCanvasCoords({
      canvasSize: this.canvasSize,
      gridSize: this.gridSize,
    });
    this.context.fillStyle = 'lightgreen';
    this.context.strokeStyle = 'darkgreen';
    this.context.fillRect(this.x * width, this.y * height, width, height);
    this.context.strokeRect(this.x * width, this.y * height, width, height);
  }
}
