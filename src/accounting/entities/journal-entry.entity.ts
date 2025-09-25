import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ChartOfAccount } from './chart-of-account.entity';
import { Company } from 'src/company/entities/company.entity';
import { GeneralJournal } from '../general-journal/entities/general-journal.entity';

@Entity("journal_entry")
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => GeneralJournal, (generalJournal) => generalJournal.journalEntries)
  generalJournal: GeneralJournal;

  @Column({ nullable: true })
  generalJournalId: number;

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
