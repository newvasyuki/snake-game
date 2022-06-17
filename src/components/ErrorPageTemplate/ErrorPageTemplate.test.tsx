import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import ErrorTemplate from './ErrorPageTemplate';

afterEach(cleanup);

describe('Тестирование компонента ErrorPageTemplate', () => {
  test('Проверка отрисовки компонента с переданными заголовком и описанием', () => {
    const title = 'Test error title';
    const description = 'Test error description';

    render(<ErrorTemplate title={title} description={description} />);

    const renderedError = screen.getByTestId('error');
    const renderedErrorTitle = screen.getByText(title);
    const renderedErrorDescription = screen.getByText(description);

    expect(renderedError).toBeInTheDocument();
    expect(renderedError).toContainElement(renderedErrorTitle);
    expect(renderedError).toContainElement(renderedErrorDescription);
  });
});
