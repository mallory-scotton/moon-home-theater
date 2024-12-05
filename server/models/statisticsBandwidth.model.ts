// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from './account.model';

@Table({
  tableName: 'StatisticsBandwidth',
  timestamps: false,
  freezeTableName: true
})
export class StatisticsBandwidth extends Model<StatisticsBandwidth> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @Column
  at!: Date;

  @Column
  bytes!: number;

  @BelongsTo(() => Account, 'accountId')
  account?: Account;
}
