// Dependencies
import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { LibrarySection } from './librarySection.model';
import { Account } from './account.model';

@Table({
  tableName: 'LibrarySectionPermissions',
  timestamps: false,
  freezeTableName: true
})
export class LibrarySectionPermission extends Model<LibrarySectionPermission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => LibrarySection)
  @Column
  librarySectionId!: number;

  @ForeignKey(() => Account)
  @Column
  accountId!: number;

  @Column
  permission!: string;

  @BelongsTo(() => LibrarySection, 'librarySectionId')
  librarySection!: LibrarySection;

  @BelongsTo(() => Account, 'accountId')
  account!: Account;
}
