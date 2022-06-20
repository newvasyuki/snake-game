import '@testing-library/jest-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, screen } from '../../utils/test-utils';
import Header from './Header';

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

const history = createMemoryHistory();

const prepareScreen = () =>
  render(
    <Router location={history.location} navigator={history}>
      <Header isLogoSmall />
    </Router>,
    {
      preloadedState: {
        user,
      },
    },
  );

describe('Тестирование компонента Header', () => {
  beforeEach(prepareScreen);
  afterEach(cleanup);
  test('Проверяет отрисовку компонента', () => {
    const rendered = screen.getByTestId('header');

    expect(rendered).toBeInTheDocument();
  });

  test('Проверяет наличие имени пользователя', () => {
    const userRenderedName = screen.getByText(`${user.user.first_name} ${user.user.second_name}`);

    expect(userRenderedName).toBeInTheDocument();
  });

  test('Проверяет наличие лого', () => {
    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo-wrapper_collapsed');
  });
});
