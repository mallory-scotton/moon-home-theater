// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'StatisticsResources',
  timestamps: false,
  freezeTableName: true
})
export class StatisticsResouces extends Model<StatisticsResouces> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  at!: Date;

  @Column
  hostCpuUtilization!: number;

  @Column
  processCpuUtilization!: number;

  @Column
  hostMemoryUtilization!: number;

  @Column
  processMemoryUtilization!: number;
}
