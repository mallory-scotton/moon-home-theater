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
  Default,
  BelongsTo
} from 'sequelize-typescript';
import { MediaItem } from './mediaItem.model';
import { MediaPart } from './mediaPart.model';

@Table({
  tableName: 'MediaStreams',
  timestamps: true,
  freezeTableName: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})
export class MediaStream extends Model<MediaStream> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  streamType!: number;

  @ForeignKey(() => MediaItem)
  @Column
  mediaItemId!: number;

  @ForeignKey(() => MediaPart)
  @Column
  mediaPartId!: number;

  @Column
  codec!: string;

  @AllowNull
  @Column
  language?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @Column
  index!: number;

  @AllowNull
  @Column
  channels?: number;

  @Column
  bitrate!: number;

  @Column
  default!: boolean;

  @Default(false)
  @Column
  forced!: boolean;

  @AllowNull
  @Column
  extraData?: string;

  @BelongsTo(() => MediaItem, 'mediaItemId')
  mediaItem?: MediaItem;

  @BelongsTo(() => MediaPart, 'mediaPartId')
  mediaPart?: MediaPart;
}
