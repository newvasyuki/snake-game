import React from 'react';
import { ErrorPage } from '../../components/ErrorPageTemplate';

const Error500 = () => {
  return <ErrorPage title="Ошибка 500" description="Внутренняя ошибка сервера" />;
};

export default Error500;
