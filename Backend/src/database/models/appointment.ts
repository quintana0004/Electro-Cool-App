import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import User from "./user";


@Table({
  tableName: 'Appointment'
})
class Appointment extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string
  
  @AllowNull(false)
  @Column(DataType.TEXT)
  reason?: string

  @AllowNull(false)
  @Column(DataType.DATE)
  datetime?: Date

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id?: string

  @BelongsTo(() => User)
  user?: User

}

export default Appointment;