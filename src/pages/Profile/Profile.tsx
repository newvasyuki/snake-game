import React, { SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import './Profile.pcss';
import ProfileImage from '../../../assets/noProfileImage.react.svg';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileInput from './components/ProfileInput';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const getUserData = () => Promise.resolve({
    first_name: 'Иван',
    last_name: 'Иванов',
    email: 'pochta@yandex.ru',
    login: 'ivanivanov'
  });

  const [userData, setUserData] = useState({  
    first_name: '',
    last_name: '',
    email: '',
    login: ''
  });

  const schema =
  object()
    .shape({
      first_name: string().required('Укажите значение'),
      last_name: string().required('Укажите значение'),
      email: string().email('Укажите email в корректном формате').required('Укажите значение'),
      login: string().required('Укажите значение'),
    })
    .required();

  const { handleSubmit, formState: { errors }, register, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // todo fetch data from the backend based on a cookie
    const loadData = async () => {
      const res = await getUserData();
      reset(res);
      setUserData(res);
    };
    loadData();
  }, [reset]);

  const onFormSubmission = async (data: Record<any, any>) => {
    console.log(data)
    // todo: implemetn data submission
    // await changeUserData(data);
  }

  const changePassword = (e: SyntheticEvent) => {
    e.preventDefault();
    // todo: open changePassword component;  
  }

  const exit = (e: SyntheticEvent) => {
    e.preventDefault();
    // todo: remove a cookie, send req to backend
  }

  const changeInputField = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  return (
    <div className={'profile-page'}>
      <div className={'profile-page__sidebar'}>
        <Button className={'profile-page__button-back'} onClick={() => navigate(-1)} />
      </div>
      <div className={'profile-page__content'}>
        <ProfileImage className={'profile-page__image'} />
        <span className={'profile-page__name'}>Иван</span>
        <form className='profile-page__userdata-form' onSubmit={handleSubmit(onFormSubmission)}>
          <ProfileInput
            id='profile-page__email'
            label='E-Mail'
            value={userData.email}
            labelClassName='profile-page__email-label'
            errorMsg={errors?.email?.message}
            {...register('email')}
            onChange={changeInputField}
          />
          <ProfileInput
            id='profile-page__login'
            label='Логин'
            value={userData.login}
            labelClassName='profile-page__login-label'
            errorMsg={errors?.login?.message}
            {...register('login')}
            onChange={changeInputField}
          />
          <ProfileInput
            id='profile-page__first-name'
            label='Имя'
            value={userData.first_name}
            labelClassName='profile-page__first-name-label'
            errorMsg={errors?.first_name?.message}
            {...register('first_name')}
            onChange={changeInputField}
          />
          <ProfileInput
            id='profile-page__last-name'
            label='Фамилия'
            value={userData.last_name}
            labelClassName='profile-page__last-name-label'
            errorMsg={errors?.last_name?.message}
            {...register('last_name')}
            onChange={changeInputField}
          />
          <div className={'profile-page__buttons-wrapper'}>
            <Button
              className={'profile-page__change-data-btn'}
              type='submit'
              text='Изменить данные'
            />
            <Button
              className={'profile-page__change-data-btn'}
              onClick={changePassword}
              text='Изменить пароль'
            />
            <Button
              className={'profile-page__exit-btn'}
              onClick={exit}
              text='Выйти'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
