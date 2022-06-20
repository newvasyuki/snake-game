import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, screen } from '../../utils/test-utils';
import Avatar from './Avatar';

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

describe('Тестирует компонент аватара', () => {
  afterEach(cleanup);
  test('Проверяет отрисовку компонента', () => {
    render(<Avatar />, {
      preloadedState: {
        user,
      },
    });

    const rendered = screen.getByTestId('avatar');

    expect(rendered).toBeInTheDocument();
  });
});
