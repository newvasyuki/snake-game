import React from 'react';
import '@testing-library/jest-dom';
import { rtlRender as render, screen } from '../../utils/test-utils';
import Logo from './Logo';

describe('Тестирует компонент Logo', () => {
  test('Проверяет отрисовку компонента', () => {
    render(<Logo isSmall />);

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
  });
});
