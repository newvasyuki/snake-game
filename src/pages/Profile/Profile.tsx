import React, { useEffect, useState } from 'react';
import './Profile.pcss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import ProfileInput from './components/ProfileInput';
import { Button } from '../../components/Button';
import { schema } from './formSchema';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { ROUTES } from '../../constants';
import { selectUserData } from '../../store/selectors';
import { updateUserAsync, logoutAsync, updateAvatarAsync } from '../../store/actionCreators';
import { UserFormData } from './types';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [avatar, setAvatar] = useState({});
  const [avatarDivStyle, setAvatarDivStyle] = useState({
    content: '',
    background: '',
  });

  const userData = useTypedSelector(selectUserData);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UserFormData>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: userData,
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [reset, userData]);

  const onSubmit = (data: UserFormData) => {
    dispatch(
      updateUserAsync({
        ...data,
        display_name: `${data.first_name} ${data.second_name}`,
      }),
    );
  };

  const changePassword = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // todo: open changePassword component;
  };

  const exit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutAsync());
    navigate({ pathname: ROUTES.signIn });
  };

  const uploadAvatarLocally = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('avatar', file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(formData);
      setAvatarDivStyle({
        content: 'none',
        background: `url(${reader.result}) center center/cover`,
      });
    };
  };

  const uploadAvatarToServer = () => {
    if (avatar instanceof FormData) {
      dispatch(updateAvatarAsync(avatar));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-page__sidebar">
        <Button className="profile-page__button-back" onClick={() => navigate(-1)} />
      </div>
      <div className="profile-page__content">
        <div style={avatarDivStyle} className="profile-page__image" />
        <input onChange={uploadAvatarLocally} type="file" name="image" accept="image/*" />
        <button onClick={uploadAvatarToServer} type="button">
          Обновить аватар
        </button>
        <span className="profile-page__name">{userData?.display_name}</span>
        <form className="profile-page__userdata-form" onSubmit={handleSubmit(onSubmit)}>
          <ProfileInput
            id="profile-page__email"
            label="E-Mail"
            labelClassName="profile-page__email-label"
            errorMsg={errors?.email?.message}
            {...register('email')}
          />
          <ProfileInput
            id="profile-page__login"
            label="Логин"
            labelClassName="profile-page__login-label"
            errorMsg={errors?.login?.message}
            {...register('login')}
          />
          <ProfileInput
            id="profile-page__first-name"
            label="Имя"
            labelClassName="profile-page__first-name-label"
            errorMsg={errors?.first_name?.message}
            {...register('first_name')}
          />
          <ProfileInput
            id="profile-page__last-name"
            label="Фамилия"
            labelClassName="profile-page__last-name-label"
            errorMsg={errors?.second_name?.message}
            {...register('second_name')}
          />
          <ProfileInput
            id="profile-page__phone"
            label="Телефон"
            labelClassName="profile-page__phone-label"
            errorMsg={errors?.phone?.message}
            {...register('phone')}
          />
          <div className="profile-page__buttons-wrapper">
            <Button className="profile-page__change-data-btn" type="submit">
              Изменить данные
            </Button>
            <Button className="profile-page__change-data-btn" onClick={changePassword}>
              Изменить пароль
            </Button>
            <Button className="profile-page__exit-btn" onClick={exit}>
              Выйти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
