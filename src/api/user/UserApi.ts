import { BASE_URL } from '../../constants';
import { UserFormData } from '../../pages/Profile/types';
import { YandexUser, PasswordData } from './types';

export class UserApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getUserInfoById(id: number) {
    return fetch(`${this.baseUrl}/user/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Get user info failed');
      })
      .then((userData: YandexUser) => userData)
      .catch((error: unknown) => {
        console.error(error);
        throw error;
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Get user info failed');
      })
      .then((userData: YandexUser) => userData)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  changeProfile(userData: UserFormData) {
    return fetch(`${this.baseUrl}/user/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Change of the Profile failed');
      })
      .then((data: YandexUser) => data)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  changeAvatar(data: FormData) {
    if (!data.has('avatar')) {
      return undefined;
    }
    return fetch(`${this.baseUrl}/user/profile/avatar`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Change of the Avatar failed');
      })
      .then((user: YandexUser) => {
        return user;
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  changePassword(data: PasswordData) {
    return fetch(`${this.baseUrl}/user/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        return Promise.reject();
      })
      .catch((error: unknown) => {
        console.error(error);
        // пробрасываем дальше для обработки в actionCreators
        throw new Error('Change of password failed');
      });
  }
}

export const userApi = new UserApi(BASE_URL);
