import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { JournalEntry } from '../../entities/journal-entry.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity("general_journal")
export class GeneralJournal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  company: Company;

  @Column({ type: 'date' })
  date: string;

  @Column()
  description: string;

  @Column()
  userEntry: string;

  @OneToMany(() => JournalEntry, (journalEntry) => journalEntry.generalJournal)
  journalEntries: JournalEntry[];
}
