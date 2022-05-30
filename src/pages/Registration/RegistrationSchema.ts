import { object, string } from 'yup';

export const schema = object({
  first_name: string().required('Укажите значение'),
  second_name: string().required('Укажите значение'),
  email: string().email('Укажите email').required('Укажите значение'),
  login: string().required('Укажите значение'),
  password: string()
    .required('Укажите значение')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,40}$/,
      'Пароль от 8 до 40 симоволов, содержать число и одну большую букву',
    ),
  phone: string()
    .required('Укажите значени е')
    .matches(/^\+?[\d]{10,15}$/, 'Допустимый формат +79178383838'),
}).required();
