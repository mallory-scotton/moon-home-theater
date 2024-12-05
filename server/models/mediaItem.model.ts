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
  tableName: 'MediaItems',
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
})
export class MediaItem extends Model<MediaItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  librarySectionId!: number;

  @ForeignKey(() => SectionLocation)
  @Column
  sectionLocationId!: number;

  @ForeignKey(() => MetadataItem)
  @Column
  metadataItemId!: number;

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
  videoCodec!: string;

  @Column
  audioCodec!: string;

  @Column
  displayAspectRatio!: number;

  @Column
  sampleAspectRatio!: number;

  @Column
  framesPerSecond!: number;

  @Column
  audioChannels!: number;

  @AllowNull
  @Column
  interlacted?: boolean;

  @AllowNull
  @Column
  hints?: string;

  @Column
  displayOffset!: number;

  @AllowNull
  @Column
  settings?: string;

  @AllowNull
  @Column
  beginsAt?: number;

  @AllowNull
  @Column
  endsAt?: number;

  @AllowNull
  @Column
  colorTrc?: string;

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

  @BelongsTo(() => LibrarySection, 'librarySectionId')
  librarySection?: LibrarySection;

  @BelongsTo(() => SectionLocation, 'sectionLocationId')
  sectionLocation?: SectionLocation;

  @BelongsTo(() => MetadataItem, 'metadataItemId')
  metadataItem?: MetadataItem;

  @HasMany(() => MediaStream, 'mediaItemId')
  mediaStreams?: MediaStream[];

  @HasOne(() => MediaPart, 'mediaItemId')
  mediaPart?: MediaPart;
}
