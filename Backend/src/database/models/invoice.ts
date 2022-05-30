import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, HasMany, Default, PrimaryKey } from "sequelize-typescript";

import Company from "./company";
import Customer from "./customer";
import InvoiceItem from "./invoice_item";


@Table({
  tableName: 'Invoice'
})
class Invoice extends Model {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string

  @AllowNull(false)
  @Column(DataType.STRING(50))
  total_price?: string

  @AllowNull(false)
  @Column(DataType.STRING(100))
  status?: string

  @AllowNull(false)
  @Column(DataType.DATE)
  due_date?: Date

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

  @HasMany(() => InvoiceItem)
  invoice_item?: InvoiceItem[]

}

export default Invoice;