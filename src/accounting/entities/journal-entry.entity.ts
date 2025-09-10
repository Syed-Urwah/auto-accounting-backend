import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => ChartOfAccount)
  account: ChartOfAccount;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  debit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  credit: number;

  @Column()
  description: string;
}
