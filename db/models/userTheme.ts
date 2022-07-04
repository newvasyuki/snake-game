import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  device: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId: number;
}
