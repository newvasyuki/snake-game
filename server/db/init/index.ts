import { Sequelize } from 'sequelize-typescript';
import { sequelizeOptions } from '../config/db.config';
import { Topic } from '../models/topic';
import { User } from '../models/user';
import { Comment } from '../models/comment';

// Создаем инстанс Sequelize
export const sequelize = new Sequelize({
  ...sequelizeOptions,
  models: [Topic, User, Comment],
});

// Инициализируем модели
export async function dbConnect() {
  try {
    // Проверка аутентификации в БД
    await sequelize.authenticate();
    await sequelize.createSchema('snakedb', { logging: process.env.NODE_ENV === 'development' });
    // Синхронизация базы данных, при dev среде - каждый раз дропает таблицы
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
