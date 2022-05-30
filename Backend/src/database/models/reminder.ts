import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import User from "./user";


@Table({
  tableName: 'Reminder'
})
class Reminder extends Model {

  @AllowNull(false)
  @Column(DataType.TEXT)
  description?: string

  @AllowNull(false)
  @Column(DataType.DATE)
  datetime?: Date
  
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number

  @BelongsTo(() => User)
  user?: User
  
}

export default Reminder;