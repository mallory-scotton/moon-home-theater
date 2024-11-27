// Dependencies
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { MediaItem } from './mediaItem.model';
import { Directory } from './directory.model';
import { MediaStream } from './mediaStream.model';

@Table({
  tableName: 'media_parts',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class MediaPart extends Model<MediaPart> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => MediaItem)
  @Column
  media_item_id!: number;

  @ForeignKey(() => Directory)
  @Column
  directory_id!: number;

  @Column
  hash!: string;

  @Column
  file!: string;

  @Column
  size!: number;

  @Column
  duration!: number;

  @AllowNull
  @Column
  extra_data?: string;

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

  @BelongsTo(() => MediaItem, 'media_item_id')
  media_item?: MediaItem;

  @BelongsTo(() => Directory, 'directory_id')
  directory?: Directory;

  @HasMany(() => MediaStream, 'media_part_id')
  media_streams?: MediaStream[];
}
