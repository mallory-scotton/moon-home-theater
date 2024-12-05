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
  tableName: 'MediaParts',
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
})
export class MediaPart extends Model<MediaPart> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => MediaItem)
  @Column
  mediaItemId!: number;

  @ForeignKey(() => Directory)
  @Column
  directoryId!: number;

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
  extraData?: string;

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

  @BelongsTo(() => MediaItem, 'mediaItemId')
  mediaItem?: MediaItem;

  @BelongsTo(() => Directory, 'directoryId')
  directory?: Directory;

  @HasMany(() => MediaStream, 'mediaPartId')
  mediaStreams?: MediaStream[];
}
