import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import Company from "./company";
import Customer from "./customer";
import JobOrder from "./job_order";


@Table({
  tableName: 'Car'
})
class Car extends Model {

  @AllowNull(false)
  @Column(DataType.STRING(100))
  brand?: string

  @AllowNull(false)
  @Column(DataType.STRING(20))
  License?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  model?: string

  @AllowNull(false)
  @Column(DataType.STRING(4))
  year?: string

  @AllowNull(false)
  @Column(DataType.STRING(10))
  mileage?: string

  @AllowNull(false)
  @Column(DataType.STRING(15))
  color?: string

  @AllowNull(false)
  @Column(DataType.STRING(20))
  vin_number?: string

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  car_has_items?: Boolean
  
  @AllowNull(true)
  @Column(DataType.TEXT)
  car_items_description?: string

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customer_id?: number

  @BelongsTo(() => Customer)
  customer?: Customer

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  company_id?: number

  @BelongsTo(() => Company)
  company?: Company

  @HasMany(() => JobOrder)
  job_orders?: JobOrder[]

}

export default Car;