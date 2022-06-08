import { BASE_URL } from '../../constants';
import { isError } from '../../utils/types';
import { SignUpData, SignInData } from './types';

type SignUpResponse = {
  id: number;
};

export type OauthData = {
  code: string;
  redirect_uri: string;
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
          console.error(error);
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

  getAccessTokenOAuth(oauthData: OauthData) {
    return fetch(`${this.baseUrl}/oauth/yandex`, {
      method: 'POST',
      body: JSON.stringify(oauthData),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('OAuth data based signIn failed');
      })
      .then((data: string) => data)
      .catch((error: unknown) => {
        if (isError(error)) {
          console.error(error);
        }
      });
  }

  getClientIdOAuth(redirectUri: string) {
    const queryParams = new URLSearchParams({
      service_id: redirectUri,
    });
    return fetch(`${this.baseUrl}/oauth/yandex/service-id?${queryParams}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Client Id cannot be fetched');
      })
      .then((data: { [key: string]: string }) => data.service_id)
      .catch((error: unknown) => {
        if (isError(error)) {
          console.error(error);
          throw new Error(error.message);
        }
      });
  }
}

export const authApi = new AuthApi(BASE_URL);
