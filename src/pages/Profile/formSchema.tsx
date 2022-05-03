import { object, string } from 'yup';


export const schema =
object()
  .shape({
    first_name: string().required('Укажите значение'),
    last_name: string().required('Укажите значение'),
    email: string().email('Укажите email в корректном формате').required('Укажите значение'),
    login: string().required('Укажите значение'),
  })
  .required();
  