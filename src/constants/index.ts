export { default as ROUTES } from './routes';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const FORUM_URL = `${
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : 'https://snake.ya-praktikum.tech:5000/api/v1'
}`;
export const RESOURCES_URL = `${BASE_URL}/resources`;

export default {};
