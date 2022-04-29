export type SignUpData = {
  firstName: string;
  secondName: string;
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
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data: SignUpResponse) => data.id)
      .catch((error: unknown) => {
        console.log(error);
      });
  }

  signIn(data: SignInData) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      body: JSON.stringify(data),
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      method: "POST",
    }).catch((error: unknown) => {
      console.log(error);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/user`)
      .then((response) => response.json())
      .then((userData: User) => userData)
      .catch((error: unknown) => {
        console.log(error);
      });
  }
}

export const authApi = new AuthApi("https://ya-praktikum.tech/api/v2");
