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
  HasMany,
  HasOne
} from 'sequelize-typescript';
import { LibrarySectionPermission } from './librarySectionPermission.model';
import { MediaItem } from './mediaItem.model';
import { SectionLocation } from './sectionLocation.model';

@Table({
  tableName: 'LibrarySections',
  timestamps: true,
  freezeTableName: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})
export class LibrarySection extends Model<LibrarySection> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  sectionType!: number;

  @Column
  language!: string;

  @AllowNull
  @Column
  userThumbUrl?: string;

  @AllowNull
  @Column
  userArtUrl?: string;

  @AllowNull
  @Column
  userThemeMusicUrl?: string;

  @Default(false)
  @Column
  public!: boolean;

  @Column
  uuid!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => LibrarySectionPermission, 'librarySectionId')
  librarySectionPermissions?: LibrarySectionPermission[];

  @HasMany(() => MediaItem, 'librarySectionId')
  mediaItems?: MediaItem[];

  @HasOne(() => SectionLocation, 'librarySectionId')
  sectionLocation?: SectionLocation;
}
