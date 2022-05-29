import { UserFormData } from '../../pages/Profile/types';
import { User, PasswordData } from './types';

export const MAIN_API = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_API = `${MAIN_API}/resources`;

export class UserApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
      .then((userData: User) => userData)
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
      .then((data: User) => data)
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
      .then((user: User) => {
        return user;
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  changePassword(data: PasswordData) {
    return (
      fetch(`${this.baseUrl}/password`, {
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // todo: тут скорее всего нужно будет проверять статус ответа
        .then((response) => response.json())
        .catch((error: unknown) => {
          console.error(error);
        })
    );
  }
}

export const userApi = new UserApi(MAIN_API);
