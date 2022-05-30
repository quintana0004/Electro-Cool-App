import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import Car from "./car";
import Company from "./company";
import Customer from "./customer";


@Table({
  tableName: 'JobOrder'
})
class JobOrder extends Model {

  @AllowNull(false)
  @Column(DataType.STRING)
  service?: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  service_details?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  status?: string

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_heavy?: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_light?: Boolean

  @AllowNull(false)
  @Column(DataType.DATE)
  entry_date?: Date

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

  @ForeignKey(() => Car)
  @Column(DataType.INTEGER)
  car_id?: number

  @BelongsTo(() => Car)
  car?: Car

}

export default JobOrder;