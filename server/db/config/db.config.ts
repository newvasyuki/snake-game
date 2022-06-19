import { SequelizeOptions } from 'sequelize-typescript';

export const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'snakeDb',
  dialect: 'postgres',
};
