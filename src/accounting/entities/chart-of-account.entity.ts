import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['accountNumber'])
export class ChartOfAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: number;

  @Column()
  accountName: string;

  @Column()
  accountType: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
}
