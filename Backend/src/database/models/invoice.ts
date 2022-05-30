import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import Company from "./company";
import Customer from "./customer";
import InvoiceItem from "./invoice_item";


@Table({
  tableName: 'Invoice'
})
class Invoice extends Model {
  
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
  @Column(DataType.INTEGER)
  company_id?: number

  @BelongsTo(() => Company)
  company?: Company

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customer_id?: number

  @BelongsTo(() => Customer)
  customer?: Customer

  @HasMany(() => InvoiceItem)
  invoice_item?: InvoiceItem[]

}

export default Invoice;