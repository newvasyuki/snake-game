import { Size } from './types';

type Options = {
  canvasSize: Size;
  gridSize: Size;
};

export function transformGridToCanvasCoords(options: Options) {
  const {
    canvasSize: { width: canvasWidth, height: canvasHeight },
    gridSize: { width: gridWidth, height: gridHeight },
  } = options;

  return {
    width: canvasWidth / gridWidth,
    height: canvasHeight / gridHeight,
  };
}
