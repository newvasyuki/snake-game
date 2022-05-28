import { object, string } from 'yup';

export const schema = object({
  login: string().required('Укажите значение'),
  password: string()
    .required('Укажите значение')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,40}$/,
      'Пароль от 8 до 40 симоволов, содержать число и одну большую букву',
    ),
}).required();
