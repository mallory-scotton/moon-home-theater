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
import { MediaPart } from './mediaPart.model';

@Table({
  tableName: 'Directories',
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
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
  parentDirectoryId?: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @AllowNull
  @Column
  deletedAt?: Date;

  @BelongsTo(() => Directory, 'parentDirectoryId')
  parentDirectory?: Directory;

  @HasMany(() => Directory, 'parentDirectoryId')
  childrenDirectories?: Directory[];

  @HasMany(() => MediaPart, 'directoryId')
  mediaParts?: MediaPart[];
}
