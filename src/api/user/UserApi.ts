import { User } from '../index';

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

export class UserApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  changeProfile(userData: User) {
    return fetch(`${this.baseUrl}/user/profile`, {
      method: 'POST',
      body: JSON.stringify(userData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: User) => data)
      .catch((error: unknown) => {
        console.log(error);
      });
  }

  changeAvatar(data: FormData) {
    if (!data.has('avatar')) {
      return undefined;
    }
    return fetch(`${this.baseUrl}/profile/avatar`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((user: User) => user)
    .catch((error: unknown) => {
    console.log(error);
    });
  }

  changePassword(data: PasswordData) {
    return fetch(`${this.baseUrl}/profile/avatar`, {
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
    console.log(error);
    });
  }
}

export const userApi = new UserApi('https://ya-praktikum.tech/api/v2');
