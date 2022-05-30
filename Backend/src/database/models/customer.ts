import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";

import Company from "./company";
import User from "./user";
import Car from "./car";
import JobOrder from "./job_order";
import Invoice from "./invoice";


@Table({
  tableName: 'Customer'
})
class Customer extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  first_name?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  last_name?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  address_line_1?: string

  @AllowNull(true)
  @Column(DataType.STRING)
  address_line_2?: string
  
  @AllowNull(false)
  @Column(DataType.STRING(50))
  state?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  city?: string

  @AllowNull(false)
  @Column(DataType.STRING(15))
  phone?: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email?: string

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  company_id?: number

  @BelongsTo(() => Company)
  company?: Company

  @HasOne(() => User)
  user?: User

  @HasMany(() => Car)
  cars?: Car[]

  @HasMany(() => JobOrder)
  job_orders?: JobOrder[]

  @HasMany(() => Invoice)
  invoices?: Invoice[]

}

export default Customer;