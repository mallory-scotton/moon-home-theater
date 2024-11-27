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
  tableName: 'metadata_items',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at'
})
export class MetadataItem extends Model<MetadataItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  library_section_id!: number;

  @ForeignKey(() => MetadataItem)
  @AllowNull
  @Column
  parent_id?: number;

  @Column
  metadata_type!: number;

  @Column
  hash!: string;

  @Column
  media_item_count!: number;

  @Column
  title!: string;

  @Column
  title_sort!: string;

  @AllowNull
  @Column
  original_title?: string;

  @AllowNull
  @Column
  studio?: string;

  @AllowNull
  @Column
  rating?: number;

  @AllowNull
  @Column
  rating_count?: number;

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
  content_rating?: string;

  @AllowNull
  @Column
  content_rating_age?: string;

  @AllowNull
  @Column
  duration?: number;

  @AllowNull
  @Column
  user_thumb_url?: string;

  @AllowNull
  @Column
  user_art_url?: string;

  @AllowNull
  @Column
  user_banner_url?: string;

  @AllowNull
  @Column
  user_music_url?: string;

  @AllowNull
  @Column
  tags_genre?: string;

  @AllowNull
  @Column
  tags_collection?: string;

  @AllowNull
  @Column
  tags_director?: string;

  @AllowNull
  @Column
  tags_writer?: string;

  @AllowNull
  @Column
  tags_star?: string;

  @AllowNull
  @Column
  tags_country?: string;

  @AllowNull
  @Column
  originally_available_at?: Date;

  @Column
  refreshed_at!: Date;

  @AllowNull
  @Column
  year?: number;

  @AllowNull
  @Column
  extra_data?: string;

  @AllowNull
  @Column
  audience_rating?: number;

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

  @HasMany(() => MediaItem, 'metadata_item_id')
  media_items?: MediaItem[];

  @BelongsTo(() => LibrarySection, 'library_section_id')
  library_section?: LibrarySection;

  @BelongsTo(() => MetadataItem, 'parent_id')
  parent?: MetadataItem;
}
