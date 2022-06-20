import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Для локального девелопмента без докера подягиваем переменные из .env
// В продакшене эти переменные напрмяую прокидываются из docker-compoese

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: resolve(__filename, '../../../../../.env') });
}

export const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOSTNAME || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
};
