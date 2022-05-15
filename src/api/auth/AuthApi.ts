import { SignUpData, SignInData } from './types';
import { User } from '../user/types';

type SignUpResponse = {
  id: number;
};

export class AuthApi {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  signUp(userData: SignUpData) {
    return fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: SignUpResponse) => data.id)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  signIn(data: SignInData) {
    return fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error: unknown) => {
      console.error(error);
    });
  }

  logout() {
    return fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).catch((error: unknown) => {
      console.error(error);
    });
  }
}

export const authApi = new AuthApi('https://ya-praktikum.tech/api/v2');
