// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'statistics_resources',
  timestamps: false,
  freezeTableName: true,
  underscored: true
})
export class StatisticsResouces extends Model<StatisticsResouces> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  at!: Date;

  @Column
  host_cpu_utilization!: number;

  @Column
  process_cpu_utilization!: number;

  @Column
  host_memory_utilization!: number;

  @Column
  process_memory_utilization!: number;
}
