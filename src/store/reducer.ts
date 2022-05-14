import * as actionTypes from './actionTypes'
import { UserInfoState, UserInfoAction } from "./type"

const userInfo = {
  id: 1,
  first_name: 'Ivan',
  second_name: 'Ivanov',
  display_name: 'Ivan Ivanov',
  login: 'Vanya',
  email: 'IvanIvanov@mail.com',
  phone: '020303030',
  avatar: "string;"
}

const reducer = (
  state: UserInfoState = userInfo,
  action: UserInfoAction
): UserInfoState => {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      const newUserInfo = {
        id: 1,
        first_name: 'Vasya',
        second_name: 'Ivanov',
        display_name: 'Ivan Ivanov',
        login: 'Vanya',
        email: 'IvanIvanov@mail.com',
        phone: '020303030',
        avatar: "string;"
      }
      return {
        ...state,
        ...newUserInfo
      }
    }
  return state;
}

export default reducer;