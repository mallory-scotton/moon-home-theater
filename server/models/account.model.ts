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
  tableName: 'accounts',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
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
  hashed_password?: string;

  @AllowNull
  @Column
  salt?: string;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @Column
  default_audio_language!: string;

  @Column
  default_subtitle_language!: string;

  @Default(true)
  @Column
  auto_select_subtitle!: boolean;

  @Default(true)
  @Column
  auto_select_audio!: boolean;

  @HasMany(() => StatisticsBandwidth, 'account_id')
  statistics_bandwidth?: StatisticsBandwidth[];

  @HasMany(() => LibrarySectionPermission, 'account_id')
  library_section_permissions?: LibrarySectionPermission[];
}
