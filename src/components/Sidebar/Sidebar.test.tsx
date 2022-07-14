import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '../../utils/test-utils';
import Sidebar from './Sidebar';

jest.mock('../ThemesToggle', () => ({ ThemesToggle: () => 'ThemesToggle' }));

const changeSidebarHandler = jest.fn();

const history = createMemoryHistory();

const user = {
  isUserLoading: false,
  isPasswordChangeFailed: false,
  user: {
    avatar: 'avatarsrc',
    first_name: 'Snoop',
    second_name: 'Dogg',
    id: 1,
    display_name: 'SD',
    login: 'dog',
    email: 'string',
    phone: 'string',
  },
};

const prepareScreen = () =>
  render(
    <Router location={history.location} navigator={history}>
      <Sidebar isExpanded onChangeSidebar={changeSidebarHandler} />
    </Router>,
    {
      preloadedState: {
        user,
      },
    },
  );

describe('Тестирование компонента Sidebar', () => {
  beforeEach(prepareScreen);

  afterEach(cleanup);

  test('Проверяет отрисовку компонента', () => {
    const rendered = screen.getByTestId('sidebar');

    expect(rendered).toBeInTheDocument();
  });

  test('Проверяет срабатывание колбэка', () => {
    const btn = screen.getByTestId('sidebar__collapse-btn');

    fireEvent.click(btn);

    expect(changeSidebarHandler).toBeCalled();
  });
});
