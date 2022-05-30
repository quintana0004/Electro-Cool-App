import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import Appointment from "./appointment";
import Customer from "./customer";
import Company from "./company";
import Note from "./note";
import Reminder from "./reminder";

@Table({
  tableName: 'User'
})
class User extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  first_name?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  last_name?: string

  @AllowNull(false)
  @Column(DataType.STRING(10))
  gender?: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  age?: number

  @AllowNull(false)
  @Column(DataType.STRING(15))
  phone?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  username?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  salt?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  role?: string

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  company_id?: number
  
  @BelongsTo(() => Company)
  company?: Company

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customer_id?: number

  @BelongsTo(() => Customer)
  customer?: Customer

  @HasMany(() => Note)
  notes?: Note[]

  @HasMany(() => Appointment)
  appointments?: Appointment[]

  @HasMany(() => Reminder)
  reminders?: Reminder[]

}

export default User;