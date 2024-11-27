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
  HasMany
} from 'sequelize-typescript';
import { LibrarySection } from './librarySection.model';
import { MediaItem } from './mediaItem.model';

@Table({
  tableName: 'section_locations',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class SectionLocation extends Model<SectionLocation> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  library_section_id!: number;

  @Column
  root_path!: string;

  @Default(true)
  @Column
  available!: boolean;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @HasMany(() => MediaItem, 'section_location_id')
  media_items?: MediaItem[];
}
