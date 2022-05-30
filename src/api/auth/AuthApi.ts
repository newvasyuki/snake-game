import { isError } from '../../utils/types';
import { SignUpData, SignInData } from './types';

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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Sign up failed');
      })
      .then((data: SignUpResponse) => data.id)
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  signIn(signInData: SignInData) {
    return fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(signInData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return;
        }
        throw new Error('Sign in fetch request failed');
      })
      .catch((error: unknown) => {
        if (isError(error)) {
          throw new Error(error.message);
        }
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
