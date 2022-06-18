import '@testing-library/jest-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, screen } from '../../../utils/test-utils';
import ProfileHelper from './ProfileHelper';

afterEach(cleanup);

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
      <ProfileHelper />
    </Router>,
    {
      preloadedState: {
        user,
      },
    },
  );

describe('Тестирование компонента ProfileHelper', () => {
  test('Проверяет отрисовку компонента', () => {
    prepareScreen();

    const rendered = screen.getByTestId('profile-helper');

    expect(rendered).toBeInTheDocument();
  });

  test('Проверяет наличие имени пользователя', () => {
    prepareScreen();

    const rendered = screen.getByTestId('profile-helper');

    expect(rendered).toBeInTheDocument();

    const userRenderedName = screen.getByText(`${user.user.first_name} ${user.user.second_name}`);

    expect(userRenderedName).toBeInTheDocument();
  });
});
