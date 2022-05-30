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
import { selectChangePassState, selectUserData } from '../../store/selectors';
import {
  updateUserAsync,
  logoutAsync,
  updateAvatarAsync,
  updatePasswordAsync,
} from '../../store/actionCreators';
import { UserFormData } from './types';
import { RESOURCES_API } from '../../api/user/UserApi';
import { ChangePassword } from './components/ChangePassword';
import { ChangePasswordData } from './components/ChangePassword/ChangePassword';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [avatar, setAvatar] = useState({});
  const [isSuccessfullUpdate, setIsSuccessfullUpdate] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false);
  const [showChangePasswordErrorText, setShowChangePasswordErrorText] = useState(false);
  const [avatarDivStyle, setAvatarDivStyle] = useState({
    content: '',
    background: '',
  });

  const userData = useTypedSelector(selectUserData);
  const isPasswordChangeFailed = useTypedSelector(selectChangePassState);

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

  const showSuccessState = () => {
    setIsSuccessfullUpdate(true);
    setTimeout(() => {
      setIsSuccessfullUpdate(false);
    }, 1000);
  };

  useEffect(() => {
    if (userData) {
      reset(userData);
      setAvatarDivStyle({
        content: 'none',
        background: `url(${RESOURCES_API}/${userData.avatar}) center center/cover`,
      });
    }
  }, [reset, userData]);

  useEffect(() => {
    if (isPasswordChangeFailed === null) {
      // initial state
      return;
    }
    if (!isPasswordChangeFailed) {
      setShowChangePasswordDialog(false);
      setShowChangePasswordErrorText(false);
      showSuccessState();
    } else {
      setShowChangePasswordErrorText(true);
    }
  }, [isPasswordChangeFailed]);

  const onMainInfoSubmit = (data: UserFormData) => {
    dispatch(
      updateUserAsync({
        ...data,
        display_name: `${data.first_name} ${data.second_name}`,
      }),
    ).then(() => {
      showSuccessState();
    });
  };

  const changePassword = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setShowChangePasswordDialog(true);
  };

  const exit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutAsync());
    navigate({ pathname: ROUTES.signIn });
  };

  const onChangePassword = (data: ChangePasswordData) => {
    dispatch(
      updatePasswordAsync({
        oldPassword: data.old_password,
        newPassword: data.new_password,
      }),
    );
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
      dispatch(updateAvatarAsync(avatar)).then(() => {
        showSuccessState();
      });
    }
  };

  const onChangePasswordCancel = () => {
    setShowChangePasswordDialog(false);
    setShowChangePasswordErrorText(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-page__sidebar">
        <Button className="profile-page__button-back" onClick={() => navigate(-1)} />
      </div>
      <div className="profile-page__content">
        {showChangePasswordDialog && (
          <ChangePassword
            showChangePasswordErrorText={showChangePasswordErrorText}
            onCancelation={onChangePasswordCancel}
            onChangePassword={onChangePassword}
          />
        )}
        <div style={avatarDivStyle} className="profile-page__image" />
        <input onChange={uploadAvatarLocally} type="file" name="image" accept="image/*" />
        <button onClick={uploadAvatarToServer} type="button">
          Обновить аватар
        </button>
        <span className="profile-page__name">{userData?.display_name}</span>
        {isSuccessfullUpdate && (
          <span className="profile-page__change-status">Информация обновлена!</span>
        )}
        <form className="profile-page__userdata-form" onSubmit={handleSubmit(onMainInfoSubmit)}>
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
