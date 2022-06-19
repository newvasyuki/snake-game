/* eslint-disable import/no-cycle */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Topic } from './topic';
import { Comment } from './comment';

@Table({
  schema: 'snakedb',
  timestamps: false,
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  id: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'first_name' })
  firstName: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'second_name' })
  secondName: string;

  @HasMany(() => Topic)
  topic: Topic[];

  @HasMany(() => Comment)
  comments: Comment[];
}
