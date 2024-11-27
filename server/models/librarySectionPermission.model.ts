// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { LibrarySection } from './librarySection.model';
import { Account } from './account.model';

@Table({
  tableName: 'library_section_permissions',
  timestamps: false,
  freezeTableName: true,
  underscored: true
})
export class LibrarySectionPermission extends Model<LibrarySectionPermission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  library_section_id!: number;

  @ForeignKey(() => Account)
  @Column
  account_id!: number;

  @Column
  permission!: string;

  @BelongsTo(() => LibrarySection, 'library_section_id')
  library_section!: LibrarySection;

  @BelongsTo(() => Account, 'account_id')
  account!: Account;
}
