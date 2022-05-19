import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Login.pcss';
import { useNavigate } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button';
import { signInUser } from '../../store/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { ROUTES } from '../../constants';
import { SignInData } from '../../api';
import { schema } from './LoginSchema';

export const Login = () => {
  const dispatch = useTypedDispatch();
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onFormSubmission = async (data: SignInData) => {
    await dispatch(signInUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ pathname: ROUTES.profile });
    }
  }, [isLoggedIn, navigate]);

  const blockRegPage = bemCn('login');
  const blockRegForm = bemCn('login-form');

  return (
    <div className={blockRegPage()}>
      <span className={blockRegPage('header', { modifier: 'first-line' })}>Нью Васюки</span>
      <span className={blockRegPage('header', { modifier: 'second-line' })}>Snake</span>
      <form className={blockRegForm()} onSubmit={handleSubmit(onFormSubmission)}>
        <div className={blockRegForm('container')}>
          <p className={blockRegForm('header')}>Логин</p>
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
          <div className={blockRegForm('buttons-container')}>
            <Button
              className={blockRegForm('default-button', { modifier: 'colored' })}
              type="submit"
            >
              Войти
            </Button>
            <Button
              className={blockRegForm('default-button', { modifier: 'no-color' })}
              onClick={() => navigate({ pathname: ROUTES.signUp })}
              type="submit"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
