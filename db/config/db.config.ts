import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../../../../.env') });
// eslint-disable-next-line no-console
export const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOSTNAME || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
};
