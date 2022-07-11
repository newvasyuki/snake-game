/* eslint-disable import/no-cycle */
import { Model, Table, Column, DataType, PrimaryKey, AllowNull } from 'sequelize-typescript';

@Table({
  schema: 'snakedb',
  timestamps: false,
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'user_id' })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'first_name' })
  firstName: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'second_name' })
  secondName: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'display_name' })
  displayName: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'login' })
  login: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'avatar' })
  avatar: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, field: 'email' })
  email: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, field: 'phone' })
  phone: string;

  @HasMany(() => Topic)
  topics: Topic[];

  @HasMany(() => Comment)
  comments: Comment[];
}
