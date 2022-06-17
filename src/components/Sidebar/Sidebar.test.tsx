import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Sidebar from './Sidebar';

afterEach(cleanup);

describe('Тестирование компонента Sidebar', () => {
  test('Проверяет отрисовку компонента', () => {
    const changeSidebarHandler = jest.fn();

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Sidebar isExpanded onChangeSidebar={changeSidebarHandler} />
      </Router>,
    );

    const rendered = screen.getByTestId('sidebar');

    expect(rendered).toBeInTheDocument();
  });

  test('Проверяет срабатывание колбэка', () => {
    const changeSidebarHandler = jest.fn();

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Sidebar isExpanded onChangeSidebar={changeSidebarHandler} />
      </Router>,
    );

    const rendered = screen.getByTestId('sidebar');

    expect(rendered).toBeInTheDocument();

    const btn = screen.getByTestId('sidebar-collapse-btn');

    fireEvent.click(btn);

    expect(changeSidebarHandler).toBeCalled();
  });
});
