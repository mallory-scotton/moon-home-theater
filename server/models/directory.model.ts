// Dependencies
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

@Table({
  tableName: 'directories',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class Directory extends Model<Directory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  path!: string;

  @ForeignKey(() => Directory)
  @AllowNull
  @Column
  parent_directory_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @DeletedAt
  @AllowNull
  @Column
  deleted_at?: Date;

  @BelongsTo(() => Directory, 'parent_directory_id')
  parent_directory?: Directory;

  @HasMany(() => Directory, 'parent_directory_id')
  children_directories?: Directory[];
}
