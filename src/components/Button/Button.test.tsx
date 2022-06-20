import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Тестирование компонента Button', () => {
  afterEach(cleanup);
  test('Проверяет отрисовку кнопки с переданным текстом', () => {
    const text = 'Test text';

    render(<Button>{text}</Button>);

    const renderedButton = screen.getByText(text);

    expect(renderedButton).toBeInTheDocument();
  });
  test('Проверяет работу обработчика событий на кнопке', () => {
    const text = 'Test text';
    const onButtonClick = jest.fn();

    render(<Button onClick={onButtonClick}>{text}</Button>);

    const renderedButton = screen.getByText('Test text');

    fireEvent.click(renderedButton);

    expect(onButtonClick).toBeCalled();
  });
});
