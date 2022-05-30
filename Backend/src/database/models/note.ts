import { Table, Column, AllowNull, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from 'sequelize-typescript';

import User from './user';

@Table({
  tableName: 'Note'
})
class Note extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  text?: string

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id?: string

  @BelongsTo(() => User)
  user?: User

}

export default Note;
