export { default as ROUTES } from './routes';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const SNAKE_SERVER_URL = `${
  process.env.NODE_ENV === 'development' && parseInt(process.env.SKIP_FORUM_AUTH, 10)
    ? 'http://localhost:5000/api/v1'
    : 'https://snake.ya-praktikum.tech:5000/api/v1'
}`;
export const RESOURCES_URL = `${BASE_URL}/resources`;

export default {};
