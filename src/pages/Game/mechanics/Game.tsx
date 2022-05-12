import React, { RefObject } from 'react';
import { StartButton } from '../components/StartButton';
import { Food } from './Food';
import { Snake } from './Snake';

type State = {
  isStarted: boolean;
};

type Props = Record<string, never>;

export class Game extends React.PureComponent<Props, State> {
  canvasRef: RefObject<HTMLCanvasElement>;

  canvasWrapperRef: RefObject<HTMLDivElement>;

  ctx: CanvasRenderingContext2D;

  width: number;

  height: number;

  snake: Snake;

  food: Food;

  frame: number;

  msInterval: number;

  then: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isStarted: false,
    };

    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.canvasWrapperRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    const { width, height } = this.canvasWrapperRef.current.getBoundingClientRect();
    const { border } = getComputedStyle(this.canvasWrapperRef.current);

    this.width = Math.round(Math.floor(width) - 2 * parseFloat(border));
    this.height = Math.round(Math.floor(height) - 2 * parseFloat(border));

    this.ctx = this.canvasRef.current?.getContext('2d');

    this.init();
  }

  componentWillUnmount(): void {
    this.removeEventListeners();
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
    this.msInterval = 500;
    this.then = Date.now();
    this.draw();
  }

  pauseGame() {
    window.cancelAnimationFrame(this.frame);
    this.setState({
      isStarted: false,
    });
  }

  resetGame() {
    window.cancelAnimationFrame(this.frame);
    this.setState({
      isStarted: false,
    });
    this.init();
  }

  render() {
    this.addEventListeners();
    return (
      <>
        <div
          className={this.state.isStarted ? 'screen screen--active' : 'screen'}
          ref={this.canvasWrapperRef}
        >
          <canvas id="snake" ref={this.canvasRef} width={this.width} height={this.height} />
          {this.state.isStarted ? null : (
            <StartButton
              onClick={() => {
                this.setState({
                  isStarted: true,
                });
                this.startGame();
              }}
            />
          )}
        </div>
        <button type="button" onClick={() => this.pauseGame()}>
          Pause
        </button>
      </>
    );
  }
}
