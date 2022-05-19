import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './Registration.pcss';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/actionCreators';
import { useTypedDispatch, useTypedSelector } from '../../store';
import { ROUTES } from '../../constants';
import { SignUpData } from '../../api';
import { Button } from '../../components/Button';
import { schema } from './RegistrationSchema';
import { Input } from '../../components/Input';

export const Registration = () => {
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
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const onFormSubmission = async (data: SignUpData) => {
    await dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ pathname: ROUTES.game });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="registrationPage">
      <form className="registrationForm" onSubmit={handleSubmit(onFormSubmission)}>
        <div className="registrationForm__container">
          <p className="registrationForm__header">Регистрация</p>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="first_name">
              Имя
            </label>
            <Input
              id="first_name"
              type="text"
              className="registrationInputField"
              errorMessage={errors.first_name?.message}
              {...register('first_name')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="second_name">
              Фамилия
            </label>
            <Input
              type="text"
              className="registrationInputField"
              errorMessage={errors.second_name?.message}
              {...register('second_name')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="login">
              Логин
            </label>
            <Input
              type="text"
              className="registrationInputField"
              errorMessage={errors.login?.message}
              {...register('login')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="email">
              Почта
            </label>
            <Input
              type="text"
              className="registrationInputField"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="password">
              Пароль
            </label>
            <Input
              type="password"
              className="registrationInputField"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="phone">
              Телефон
            </label>
            <Input
              type="text"
              className="registrationInputField"
              errorMessage={errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <div className="registrationForm_ButtonsContainer">
            <Button className="registrationForm__defaultButton-colored" type="submit">
              Зарегистрироваться
            </Button>
            <Button
              className="registrationForm__defaultButton-noColor"
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
