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
  tableName: 'media_streams',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class MediaStream extends Model<MediaStream> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  stream_type!: number;

  @ForeignKey(() => MediaItem)
  @Column
  media_item_id!: number;

  @ForeignKey(() => MediaPart)
  @Column
  media_part_id!: number;

  @Column
  codec!: string;

  @AllowNull
  @Column
  language?: string;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

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
  extra_data?: string;

  @BelongsTo(() => MediaItem, 'media_item_id')
  media_item?: MediaItem;

  @BelongsTo(() => MediaPart, 'media_part_id')
  media_part?: MediaPart
}
