import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, Default } from "sequelize-typescript";

import Appointment from "./appointment";
import Customer from "./customer";
import Company from "./company";
import Note from "./note";
import Reminder from "./reminder";

@Table({
  tableName: 'User'
})
class User extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

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
  @Column(DataType.UUID)
  company_id?: string
  
  @BelongsTo(() => Company)
  company?: Company

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  customer_id?: string

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