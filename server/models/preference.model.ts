// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'preferences',
  timestamps: false,
  freezeTableName: true,
  underscored: true
})
export class Preference extends Model<Preference> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  value!: string;
}
