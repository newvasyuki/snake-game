import React, {
  useState, ChangeEvent, useEffect,
} from 'react';
import './Profile.pcss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../../assets/noProfileImage.react.svg';
import ProfileInput from './components/ProfileInput';
import { Button } from '../../components/Button';
import { schema } from './formSchema';
import { useSelector } from "react-redux";
import { userService } from '../../services/user/UserService';
import { UserState } from '../../store/reducers/user';
import { getUserInfo, updateUserInfo } from '../../store/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../../store/createStore';

export interface UserFormData {
  first_name: string,
  second_name: string,
  display_name: string,
  email: string,
  login: string,
  phone: string,
}

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const userData = useSelector((state: UserState) => state.user);

  const {
    handleSubmit, formState: { errors }, register, reset,
  } = useForm<UserFormData>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: userData
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, [])

  useEffect(() => {
    if (userData) {
      reset({...(userData as unknown as UserState).user})
    }
  }, [userData]);

  const onSubmit = async (data: UserFormData) => {
    const displayName = `${data.first_name} ${data.second_name}`;
    const newUserInfo = await userService.updateUserInfo({ ...data, display_name: displayName });
    if (newUserInfo) {
      dispatch(updateUserInfo(newUserInfo));
    }
  };

  const changePassword = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // todo: open changePassword component;
  };

  const exit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // todo: remove a cookie, send req to backend
  };

  return (
    <div className="profile-page">
      <div className="profile-page__sidebar">
        <Button className="profile-page__button-back" onClick={() => navigate(-1)} />
      </div>
      <div className="profile-page__content">
        <ProfileImage className="profile-page__image" />
        <span className="profile-page__name">
          {userData.display_name}
        </span>
        <form className="profile-page__userdata-form" onSubmit={handleSubmit(onSubmit)}>
          <ProfileInput
            id="profile-page__email"
            label="E-Mail"
            value={userData.email}
            labelClassName="profile-page__email-label"
            errorMsg={errors?.email?.message}
            {...register('email')}
          />
          <ProfileInput
            id="profile-page__login"
            label="Логин"
            value={userData.login}
            labelClassName="profile-page__login-label"
            errorMsg={errors?.login?.message}
            {...register('login')}
          />
          <ProfileInput
            id="profile-page__first-name"
            label="Имя"
            value={userData.first_name}
            labelClassName="profile-page__first-name-label"
            errorMsg={errors?.first_name?.message}
            {...register('first_name')}
          />
          <ProfileInput
            id="profile-page__last-name"
            label="Фамилия"
            value={userData.second_name}
            labelClassName="profile-page__last-name-label"
            errorMsg={errors?.second_name?.message}
            {...register('second_name')}
          />
          <ProfileInput
            id="profile-page__phone"
            label="Телефон"
            value={userData.phone}
            labelClassName="profile-page__phone-label"
            errorMsg={errors?.phone?.message}
            {...register('phone')}
          />
          <div className="profile-page__buttons-wrapper">
            <Button
              className="profile-page__change-data-btn"
              type="submit"
            >
              Изменить данные
            </Button>
            <Button
              className="profile-page__change-data-btn"
              onClick={changePassword}
            >
              Изменить пароль
            </Button>
            <Button
              className="profile-page__exit-btn"
              onClick={exit}
            >
              Выйти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
