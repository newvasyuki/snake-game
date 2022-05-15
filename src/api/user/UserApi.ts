import { User } from '../user/types';

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

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
      .then((response) => response.json())
      .then((userData: User) => userData)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  changeProfile(userData: User) {
    return dispatch => {
      fetch(`${this.baseUrl}/user/profile`, {
        method: 'PUT',
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
    return fetch(`${this.baseUrl}/password`, {
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
