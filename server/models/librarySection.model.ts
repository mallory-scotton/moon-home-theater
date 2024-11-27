// Dependencies
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  Default,
  HasMany
} from 'sequelize-typescript';
import { LibrarySectionPermission } from './librarySectionPermission.model';
import { MediaItem } from './mediaItem.model';

@Table({
  tableName: 'library_sections',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class LibrarySection extends Model<LibrarySection> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  section_type!: number;

  @Column
  language!: string;

  @AllowNull
  @Column
  user_thumb_url?: string;

  @AllowNull
  @Column
  user_art_url?: string;

  @AllowNull
  @Column
  user_theme_music_url?: string;

  @Default(false)
  @Column
  public!: boolean;

  @Column
  uuid!: string;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @HasMany(() => LibrarySectionPermission, 'library_section_id')
  library_section_permissions?: LibrarySectionPermission[];

  @HasMany(() => MediaItem, 'library_section_id')
  media_items?: MediaItem[];
}
