import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Тестирование компонента Input', () => {
  afterEach(cleanup);
  test('Проверяет отрисовку инпута', () => {
    render(<Input />);

    const input = screen.getByTestId('input');

    expect(input).toBeInTheDocument();
  });

  test('Проверяет наличие и значение атрибута type у поля ввода', () => {
    render(<Input type="text" />);

    const inputField = screen.getByTestId('input-control');

    expect((inputField as HTMLInputElement).type).toBe('text');
  });

  test('Проверяет работу события onChange на инпуте', () => {
    render(<Input />);

    const inputField = screen.getByTestId('input-control');

    fireEvent.change(inputField, { target: { value: 'test test' } });
    expect((inputField as HTMLInputElement).value).toBe('test test');
  });

  test('Проверяет отрисовку ошибки в компоненте инпута', () => {
    render(<Input errorMessage="Test error message" />);

    const errorElement = screen.getByText('Test error message');

    expect(errorElement).toBeInTheDocument();
  });
});
