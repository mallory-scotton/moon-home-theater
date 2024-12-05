// Dependencies
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  Default,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import { LibrarySection } from './librarySection.model';
import { MediaItem } from './mediaItem.model';

@Table({
  tableName: 'SectionLocations',
  timestamps: true,
  freezeTableName: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})
export class SectionLocation extends Model<SectionLocation> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  librarySectionId!: number;

  @Column
  rootPath!: string;

  @Default(true)
  @Column
  available!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => LibrarySection, 'librarySectionId')
  librarySection?: LibrarySection;

  @HasMany(() => MediaItem, 'sectionLocationId')
  mediaItems?: MediaItem[];
}
