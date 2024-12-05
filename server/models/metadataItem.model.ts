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
import { MediaItem } from './mediaItem.model';
import { LibrarySection } from './librarySection.model';

@Table({
  tableName: 'MetadataItems',
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
})
export class MetadataItem extends Model<MetadataItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  librarySectionId!: number;

  @ForeignKey(() => MetadataItem)
  @AllowNull
  @Column
  parentId?: number;

  @Column
  metadataType!: number;

  @Column
  tmdbId?: number;

  @Column
  imdbId?: string;

  @Column
  hash!: string;

  @Column
  mediaItemCount!: number;

  @Column
  title!: string;

  @Column
  titleSort!: string;

  @AllowNull
  @Column
  originalTitle?: string;

  @AllowNull
  @Column
  studio?: string;

  @AllowNull
  @Column
  rating?: number;

  @AllowNull
  @Column
  ratingCount?: number;

  @AllowNull
  @Column
  tagline?: string;

  @AllowNull
  @Column
  summary?: string;

  @AllowNull
  @Column
  trivia?: string;

  @AllowNull
  @Column
  quotes?: string;

  @AllowNull
  @Column
  contentRating?: string;

  @AllowNull
  @Column
  contentRatingAge?: string;

  @AllowNull
  @Column
  duration?: number;

  @AllowNull
  @Column
  userThumbUrl?: string;

  @AllowNull
  @Column
  userArtUrl?: string;

  @AllowNull
  @Column
  userBannerUrl?: string;

  @AllowNull
  @Column
  userMusicUrl?: string;

  @AllowNull
  @Column
  tagsGenre?: string;

  @AllowNull
  @Column
  tagsCollection?: string;

  @AllowNull
  @Column
  tagsDirector?: string;

  @AllowNull
  @Column
  tagsWriter?: string;

  @AllowNull
  @Column
  tagsStar?: string;

  @AllowNull
  @Column
  tagsCountry?: string;

  @AllowNull
  @Column
  originallyAvailableAt?: Date;

  @Column
  refreshedAt!: Date;

  @AllowNull
  @Column
  year?: number;

  @AllowNull
  @Column
  extraData?: string;

  @AllowNull
  @Column
  audienceRating?: number;

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

  @HasMany(() => MediaItem, 'metadataItemId')
  mediaItems?: MediaItem[];

  @BelongsTo(() => LibrarySection, 'librarySectionId')
  librarySection?: LibrarySection;

  @BelongsTo(() => MetadataItem, 'parentId')
  parent?: MetadataItem;
}
