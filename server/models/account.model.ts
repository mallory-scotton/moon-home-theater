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
import { StatisticsBandwidth } from './statisticsBandwidth.model';
import { LibrarySectionPermission } from './librarySectionPermission.model';

@Table({
  tableName: 'Accounts',
  timestamps: true,
  freezeTableName: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})
export class Account extends Model<Account> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @AllowNull
  @Column
  hashedPassword?: string;

  @AllowNull
  @Column
  salt?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @Column
  defaultAudioLanguage!: string;

  @Column
  defaultSubtitleLanguage!: string;

  @Default(true)
  @Column
  autoSelectSubtitle!: boolean;

  @Default(true)
  @Column
  autoSelectAudio!: boolean;

  @HasMany(() => StatisticsBandwidth, 'accountId')
  statisticsBandwidth?: StatisticsBandwidth[];

  @HasMany(() => LibrarySectionPermission, 'accountId')
  librarySectionPermissions?: LibrarySectionPermission[];
}
