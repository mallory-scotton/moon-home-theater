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
  DeletedAt,
  HasOne
} from 'sequelize-typescript';
import { LibrarySection } from './librarySection.model';
import { SectionLocation } from './sectionLocation.model';
import { MetadataItem } from './metadataItem.model';
import { MediaStream } from './mediaStream.model';
import { MediaPart } from './mediaPart.model';

@Table({
  tableName: 'media_items',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class MediaItem extends Model<MediaItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  library_section_id!: number;

  @ForeignKey(() => SectionLocation)
  @Column
  section_location_id!: number;

  @ForeignKey(() => MetadataItem)
  @Column
  metadata_item_id!: number;

  @Column
  width!: number;

  @Column
  height!: number;

  @Column
  size!: number;

  @Column
  duration!: number;

  @Column
  bitrate!: number;

  @Column
  container!: string;

  @Column
  video_codec!: string;

  @Column
  audio_codec!: string;

  @Column
  display_aspect_ratio!: number;

  @Column
  sample_aspect_ratio!: number;

  @Column
  frames_per_second!: number;

  @Column
  audio_channels!: number;

  @AllowNull
  @Column
  interlacted?: boolean;

  @AllowNull
  @Column
  hints?: string;

  @Column
  display_offset!: number;

  @AllowNull
  @Column
  settings?: string;

  @AllowNull
  @Column
  begins_at?: number;

  @AllowNull
  @Column
  ends_at?: number;

  @AllowNull
  @Column
  color_trc?: string;

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

  @BelongsTo(() => LibrarySection, 'library_section_id')
  library_section?: LibrarySection;

  @BelongsTo(() => SectionLocation, 'section_location_id')
  section_location?: SectionLocation;

  @BelongsTo(() => MetadataItem, 'metadata_item_id')
  metadata_item?: MetadataItem;

  @HasMany(() => MediaStream, 'media_item_id')
  media_streams?: MediaStream[];

  @HasOne(() => MediaPart, 'media_item_id')
  media_part?: MediaPart;
}
