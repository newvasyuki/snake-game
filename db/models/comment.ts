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
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Topic } from './topic';
import { User } from './user';

@Table({
  schema: 'snakedb',
  timestamps: false,
  tableName: 'comments',
})
export class Comment extends Model<Comment> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'comment_id' })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, field: 'topic_id' })
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @AllowNull(false)
  @Length({ max: 400, min: 10 })
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  date: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @AllowNull(true)
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, field: 'parent_id' })
  parentId: number;
}
