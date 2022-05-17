import { authApi, AuthApi, SignInData, SignUpData } from '../../api';
import { userApi, UserApi } from '../../api/user/index';

export class AuthService {
  protected authApi: AuthApi;
  protected userApi: UserApi;

  // можно сохранить ссылку на стор чтобы диспатчить экшены
  protected store: null;

  constructor(authApi: AuthApi, userApi: UserApi) {
    this.authApi = authApi;
    this.userApi = userApi;
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
    const userId = await this.authApi.signUp(data);
    // делаем что-то с айдишником, если нужно
    // todo: for instance put it to store
    if (!userId) {
      throw new Error('UserId was not retrieved successfully');
    }
    return userId;
  }

  async logout() {
    try {
      await this.authApi.logout();
      // тут можно сетать в стор, что юзер не залогинен
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService(authApi, userApi);
