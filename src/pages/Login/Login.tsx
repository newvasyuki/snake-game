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

  const onSubmit = async (data: SignInData) => {
    await dispatch(signInUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ pathname: ROUTES.profile });
    }
  }, [isLoggedIn, navigate]);

  const block = bemCn('login');

  return (
    <div className={block()}>
      <form className={block('form')} onSubmit={handleSubmit(onSubmit)}>
        <div className={block('container')}>
          <p className={block('header')}>Войти</p>
          <div className={block('inputContainer')}>
            <label className={block('label')} htmlFor="login">
              Логин
            </label>
            <Input
              id="login"
              type="text"
              className="registrationInputField"
              errorMessage={errors.login?.message}
              {...register('login')}
            />
          </div>

          <div className={block('inputContainer')}>
            <label className={block('label')} htmlFor="password">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              className="registrationInputField"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className={block('buttonsContainer')}>
            <Button className={block('defaultButton-noColor')} type="submit">
              Войти
            </Button>
            <Button
              className={block('defaultButton-colored')}
              type="button"
              onClick={() => navigate({ pathname: ROUTES.signUp })}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
