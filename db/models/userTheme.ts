import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
  schema: 'snakedb',
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  device: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string;

  @PrimaryKey
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  ownerId: number;
}
