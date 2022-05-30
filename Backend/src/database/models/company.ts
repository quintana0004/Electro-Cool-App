import { Table, Column, Model, DataType, AllowNull, HasMany, PrimaryKey, Default } from "sequelize-typescript";

import User from "./user";
import Customer from "./customer";
import JobOrder from "./job_order";
import Invoice from "./invoice";
import Car from "./car";


@Table({
  tableName: 'Company'
})
class Company extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  name?: string

  @AllowNull(false)
  @Column(DataType.STRING(150))
  business_type?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  address_line_1?: string

  @AllowNull(true)
  @Column(DataType.STRING)
  address_line_2?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  country?: string

  @AllowNull(true)
  @Column(DataType.STRING(50))
  state?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  city?: string

  @AllowNull(false)
  @Column(DataType.STRING(10))
  zipcode?: string

  @AllowNull(true)
  @Column(DataType.STRING)
  email?: string

  @AllowNull(true)
  @Column(DataType.STRING(15))
  phone?: string

  @HasMany(() => User)
  users?: User[]

  @HasMany(() => Customer)
  customers?: Customer[]

  @HasMany(() => JobOrder)
  job_orders?: JobOrder[]

  @HasMany(() => Invoice)
  invoices?: Invoice[]

  @HasMany(() => Car)
  cars?: Car[]

}

export default Company;