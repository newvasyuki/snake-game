import '@testing-library/jest-dom';
import React from 'react';
import { RESOURCES_URL } from '../../constants';
import { render, cleanup, screen } from '../../utils/test-utils';
import Avatar from './Avatar';

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

describe('Тестирует компонент аватара', () => {
  test('Проверяет отрисовку компонента', () => {
    render(<Avatar />, {
      preloadedState: {
        user,
      },
    });

    const rendered = screen.getByTestId('avatar');

    expect(rendered).toBeInTheDocument();
  });

  test('Проверяет отрисовку компонента c переданным пропом', () => {
    render(<Avatar isSmall />, {
      preloadedState: {
        user,
      },
    });

    const rendered = screen.getByTestId('avatar');

    expect(rendered).toBeInTheDocument();
    expect(rendered).toHaveClass('profileAvatar_small');
  });

  test('Проверяет наличие стилей аватара', () => {
    render(<Avatar />, {
      preloadedState: {
        user,
      },
    });

    const rendered = screen.getByTestId('avatar');

    expect(rendered).toBeInTheDocument();
    expect(rendered).toHaveStyle(
      `background-image: "url(${RESOURCES_URL}/${user.user.avatar}) center center/cover"`,
    );
  });
});
