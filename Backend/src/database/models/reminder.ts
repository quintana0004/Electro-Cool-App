import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import User from "./user";


@Table({
  tableName: 'Reminder'
})
class Reminder extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  description?: string

  @AllowNull(false)
  @Column(DataType.DATE)
  datetime?: Date
  
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id?: string

  @BelongsTo(() => User)
  user?: User
  
}

export default Reminder;