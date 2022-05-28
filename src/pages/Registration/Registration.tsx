import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './Registration.pcss';
import { useNavigate } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import { registerUserAsync } from '../../store/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { ROUTES } from '../../constants';
import { SignUpData } from '../../api';
import { Button } from '../../components/Button';
import { schema } from './RegistrationSchema';
import { Input } from '../../components/Input';
import { selectUserData } from '../../store/selectors';

const isRegistrationFailedText = `Не удалось зарегестрирваться. Свяжитесь с службой поддержки. 
${process.env.NODE_ENV === 'development' ? 'For devs: Почистите также cookie' : ''}`;

export const Registration = () => {
  const dispatch = useTypedDispatch();
  const { isRegistrationFailed } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const user = useTypedSelector(selectUserData);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const onFormSubmission = async (data: SignUpData) => {
    await dispatch(registerUserAsync(data));
  };

  useEffect(() => {
    if (user) {
      navigate(ROUTES.game);
    }
  }, [navigate, user]);

  const blockRegPage = bemCn('registration');
  const blockRegForm = bemCn('registration-form');
  return (
    <div className={blockRegPage()}>
      <span className={blockRegPage('header', { 'first-line': true })}>Нью Васюки</span>
      <span className={blockRegPage('header', { 'second-line': true })}>Snake</span>
      <form className={blockRegForm()} onSubmit={handleSubmit(onFormSubmission)}>
        <div className={blockRegForm('container')}>
          <p className={blockRegForm('header')}>Регистрация</p>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="first_name">
              Имя
            </label>
            <Input
              type="text"
              className={blockRegForm('input-field')}
              errorMessage={errors.first_name?.message}
              {...register('first_name')}
            />
          </div>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="second_name">
              Фамилия
            </label>
            <Input
              type="text"
              className={blockRegForm('input-field')}
              errorMessage={errors.second_name?.message}
              {...register('second_name')}
            />
          </div>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="login">
              Логин
            </label>
            <Input
              type="text"
              className={blockRegForm('input-field')}
              errorMessage={errors.login?.message}
              {...register('login')}
            />
          </div>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="email">
              Почта
            </label>
            <Input
              type="text"
              className={blockRegForm('input-field')}
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="password">
              Пароль
            </label>
            <Input
              type="password"
              className={blockRegForm('input-field')}
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className={blockRegForm('input-container')}>
            <label className={blockRegForm('label')} htmlFor="phone">
              Телефон
            </label>
            <Input
              type="text"
              className={blockRegForm('input-field')}
              errorMessage={errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <div className={blockRegForm('buttons-container')}>
            <span className={blockRegForm('error-message')}>
              {isRegistrationFailed ? isRegistrationFailedText : null}
            </span>
            <Button
              className={blockRegForm('default-button', { modifier: 'colored' })}
              type="submit"
            >
              Зарегистрироваться
            </Button>
            <Button
              className={blockRegForm('default-button', { modifier: 'no-color' })}
              onClick={() => navigate({ pathname: ROUTES.signIn })}
              type="submit"
            >
              Войти
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
