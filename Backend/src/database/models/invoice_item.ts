import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, PrimaryKey, Default } from "sequelize-typescript";
import Invoice from "./invoice";


@Table({
  tableName: 'Invoice_Item'
})
class InvoiceItem extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id?: string
  
  @AllowNull(false)
  @Column(DataType.TEXT)
  description?: string

  @AllowNull(false)
  @Column(DataType.STRING(10))
  quantity?: string

  @AllowNull(false)
  @Column(DataType.STRING(20))
  unit_price?: string

  @AllowNull(false)
  @Column(DataType.STRING(20))
  total_price?: string

  @AllowNull(false)
  @Column(DataType.STRING(20))
  warranty?: string

  @ForeignKey(() => Invoice)
  @Column(DataType.UUID)
  invoice_id?: string

  @BelongsTo(() => Invoice)
  invoice?: Invoice

}

export default InvoiceItem;