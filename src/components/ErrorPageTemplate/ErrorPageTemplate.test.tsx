import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import ErrorTemplate from './ErrorPageTemplate';

const title = 'Test error title';
const description = 'Test error description';

const prepareScreen = () => render(<ErrorTemplate title={title} description={description} />);

describe('Тестирование компонента ErrorPageTemplate', () => {
  beforeEach(prepareScreen);
  afterEach(cleanup);
  test('Проверка отрисовки компонента', () => {
    const renderedError = screen.getByTestId('error');

    expect(renderedError).toBeInTheDocument();
  });
  test('Проверка отрисовки компонента c переданным заголовком', () => {
    const renderedError = screen.getByTestId('error');
    const renderedErrorTitle = screen.getByText(title);

    expect(renderedError).toContainElement(renderedErrorTitle);
  });
  test('Проверка отрисовки компонента с переданным описанием', () => {
    const renderedError = screen.getByTestId('error');
    const renderedErrorDescription = screen.getByText(description);

    expect(renderedError).toContainElement(renderedErrorDescription);
  });
});
