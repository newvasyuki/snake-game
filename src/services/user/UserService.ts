import { userApi, UserApi } from "../../api/user/index";
import { UserFormData } from "../../pages/Profile/Profile";

export class UserService {
  protected userApi: UserApi;

  constructor(userApi: UserApi) {
    this.userApi = userApi;
  }

  async updateUserInfo(data: UserFormData) {
    return this.userApi.changeProfile(data);
  }

  async getUserInfo() {
    const userInfo = await this.userApi.getUserInfo();
    if (!userInfo) {
      throw new Error('UserInfo was not retrieved successfully');
    }
    return userInfo;
  }
}

export const userService = new UserService(userApi);
