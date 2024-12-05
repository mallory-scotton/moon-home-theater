// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'Preferences',
  timestamps: false,
  freezeTableName: true
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
