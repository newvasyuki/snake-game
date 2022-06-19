/* eslint-disable import/no-cycle */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Length,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';
import { Comment } from './comment';

@Table({
  schema: 'snakedb',
  timestamps: false,
  tableName: 'topics',
})
export class Topic extends Model<Topic> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'topic_id' })
  id: number;

  @Length({ max: 40, min: 5 })
  @Column(DataType.STRING)
  title: string;

  @Length({ max: 400, min: 5 })
  @Column(DataType.STRING)
  content: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  likes: number;

  @HasMany(() => Comment)
  comments: Comment[];

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
