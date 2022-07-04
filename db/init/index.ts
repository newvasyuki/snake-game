import { Sequelize } from 'sequelize-typescript';
import { sequelizeOptions } from '../config/db.config';
import { Topic } from '../models/topic';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { UserTheme } from '../models/userTheme';

// Создаем инстанс Sequelize
export const sequelize = new Sequelize({
  ...sequelizeOptions,
  models: [Topic, User, Comment, UserTheme],
});

// Инициализируем модели
export async function dbConnect() {
  try {
    // Проверка аутентификации в БД
    await sequelize.authenticate();
    await sequelize.createSchema('snakedb', { logging: process.env.NODE_ENV === 'development' });
    // Синхронизация базы данных, каждый раз дропает таблицы - не подходит для продакшена
    await sequelize.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
