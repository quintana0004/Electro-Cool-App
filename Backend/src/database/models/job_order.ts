import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import Car from "./car";
import Company from "./company";
import Customer from "./customer";


@Table({
  tableName: 'JobOrder'
})
class JobOrder extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

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
  @Column(DataType.UUID)
  company_id?: string

  @BelongsTo(() => Company)
  company?: Company

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  customer_id?: string

  @BelongsTo(() => Customer)
  customer?: Customer

  @ForeignKey(() => Car)
  @Column(DataType.UUID)
  car_id?: string

  @BelongsTo(() => Car)
  car?: Car

}

export default JobOrder;