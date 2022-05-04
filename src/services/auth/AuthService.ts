import {
 authApi, AuthApi, SignInData, SignUpData,
} from '../../api';

export class AuthService {
  protected authApi: AuthApi;

  // можно сохранить ссылку на стор чтобы диспатчить экшены
  protected store: null;

  constructor(api: AuthApi) {
    this.authApi = api;
    this.store = null;
  }

  async signIn(data: SignInData) {
    try {
      await this.authApi.signIn(data);
      // тут можно сетать в сторе что юзер залогинен
    } catch (error) {
      // как-то обрабатываем ошибку
      console.log(error);
    }
  }

  async signUp(data: SignUpData) {
    try {
      const userId = await this.authApi.signUp(data);
      // делаем что-то с айдишником, если нужно
      console.log(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.authApi.logout();
      // тут можно сетать в стор, что юзер не залогинен
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo() {
    try {
      const userInfo = await this.authApi.getUserInfo();
      // кладем в стор
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService(authApi);
