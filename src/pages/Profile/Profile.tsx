import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import './Profile.pcss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../../assets/noProfileImage.react.svg';
import ProfileInput from './components/ProfileInput';
import { Button } from '../../components/Button';
import { schema } from './formSchema';
import { useDispatch, useSelector } from "react-redux";
import { UserInfoState } from '../../store/type';

interface FormData {
  first_name: string,
  second_name: string,
  email: string,
  login: string
}

const getFullUserName = (firstName: string, lastName: string): string => `${firstName} ${lastName}`;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(useSelector(
    (state: UserInfoState) => state
  ));

  const {
    handleSubmit, formState: { errors }, register, reset,
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   // todo fetch data from the backend based on a cookie
  //   const loadData = async () => {
  //     // const res = await getUserData();
  //     // reset(res);
  //     dispatch(updateUserInfo(res)) 
  //     // setUserData(res);
  //   };
  //   loadData();
  // }, [reset]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const changePassword = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // todo: open changePassword component;
  };

  const exit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    // todo: remove a cookie, send req to backend
  };

  const changeInputField = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  return (
    <div className="profile-page">
      <div className="profile-page__sidebar">
        <Button className="profile-page__button-back" onClick={() => navigate(-1)} />
      </div>
      <div className="profile-page__content">
        <ProfileImage className="profile-page__image" />
        <span className="profile-page__name">
          {getFullUserName(userData.first_name, userData.second_name)}
        </span>
        <form className="profile-page__userdata-form" onSubmit={handleSubmit(onSubmit)}>
          <ProfileInput
            id="profile-page__email"
            label="E-Mail"
            value={userData.email}
            labelClassName="profile-page__email-label"
            errorMsg={errors?.email?.message}
            {...register('email')}
            onChange={changeInputField}
          />
          <ProfileInput
            id="profile-page__login"
            label="Логин"
            value={userData.login}
            labelClassName="profile-page__login-label"
            errorMsg={errors?.login?.message}
            {...register('login')}
            onChange={changeInputField}
          />
          <ProfileInput
            id="profile-page__first-name"
            label="Имя"
            value={userData.first_name}
            labelClassName="profile-page__first-name-label"
            errorMsg={errors?.first_name?.message}
            {...register('first_name')}
            onChange={changeInputField}
          />
          <ProfileInput
            id="profile-page__last-name"
            label="Фамилия"
            value={userData.second_name}
            labelClassName="profile-page__last-name-label"
            errorMsg={errors?.second_name?.message}
            {...register('second_name')}
            onChange={changeInputField}
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
