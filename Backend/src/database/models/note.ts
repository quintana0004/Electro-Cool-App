import { Table, Column, AllowNull, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import User from './user';

@Table({
  tableName: 'Note'
})
class Note extends Model {

  @AllowNull(false)
  @Column(DataType.TEXT)
  text?: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number

  @BelongsTo(() => User)
  user?: User

}

export default Note;
