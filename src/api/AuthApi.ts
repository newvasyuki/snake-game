export type SignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type SignUpResponse = {
  id: number;
};

export type SignInData = {
  login: string;
  password: string;
};

type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: number;
  avatar: string;
};

export class AuthApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  signUp(userData: SignUpData) {
    return fetch(`${this.baseUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: SignUpResponse) => data.id)
      .catch((error: unknown) => {
        console.log(error);
      });
  }

  signIn(data: SignInData) {
    return fetch(`${this.baseUrl}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  logout() {
    return fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userData: User) => userData)
      .catch((error: unknown) => {
        console.log(error);
      });
  }
}

export const authApi = new AuthApi("https://ya-praktikum.tech/api/v2");
