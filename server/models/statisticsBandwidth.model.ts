// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from './account.model';

@Table({
  tableName: 'statistics_bandwidth',
  timestamps: false,
  freezeTableName: true,
  underscored: true
})
export class StatisticsBandwidth extends Model<StatisticsBandwidth> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Account)
  @Column
  account_id!: number;

  @Column
  at!: Date;

  @Column
  bytes!: number;

  @BelongsTo(() => Account, 'account_id')
  account?: Account;
}
