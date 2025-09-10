import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeneralJournalService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async create(createGeneralJournalDto: CreateGeneralJournalDto) {
    const { text } = createGeneralJournalDto;
    const transactionId = uuidv4();
    const date = new Date().toISOString().split('T')[0]; // Current date

    // --- SIMULATED NLP/LLM PROCESSING ---
    // In a real application, an LLM would parse 'text' and return structured data.
    // For this example, we'll use simple keyword matching to create a journal entry.

    let entriesToCreate = [];
    let totalDebit = 0;
    let totalCredit = 0;

    // Example 1: Received cash for services
    if (text.toLowerCase().includes('received') && text.toLowerCase().includes('cash') && text.toLowerCase().includes('services')) {
      const amountMatch = text.match(/\$(\d+,?\d*\.?\d*)/);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

      if (amount > 0) {
        const cashAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Cash' } });
        const serviceRevenueAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Service Revenue' } });

        if (!cashAccount || !serviceRevenueAccount) {
          throw new BadRequestException('Required accounts (Cash or Service Revenue) not found in Chart of Accounts.');
        }

        entriesToCreate.push({
          transactionId,
          date,
          account: cashAccount,
          debit: amount,
          credit: 0,
          description: text,
        });
        entriesToCreate.push({
          transactionId,
          date,
          account: serviceRevenueAccount,
          debit: 0,
          credit: amount,
          description: text,
        });
        totalDebit += amount;
        totalCredit += amount;
      }
    }
    // Example 2: Paid for office supplies
    else if (text.toLowerCase().includes('paid') && text.toLowerCase().includes('office supplies')) {
      const amountMatch = text.match(/\$(\d+,?\d*\.?\d*)/);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

      if (amount > 0) {
        const cashAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Cash' } });
        const officeSuppliesExpenseAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Office Supplies Expense' } });

        if (!cashAccount || !officeSuppliesExpenseAccount) {
          throw new BadRequestException('Required accounts (Cash or Office Supplies Expense) not found in Chart of Accounts.');
        }

        entriesToCreate.push({
          transactionId,
          date,
          account: officeSuppliesExpenseAccount,
          debit: amount,
          credit: 0,
          description: text,
        });
        entriesToCreate.push({
          transactionId,
          date,
          account: cashAccount,
          debit: 0,
          credit: amount,
          description: text,
        });
        totalDebit += amount;
        totalCredit += amount;
      }
    }
    // Add more parsing logic for other transaction types here

    if (entriesToCreate.length === 0) {
      throw new BadRequestException('Could not parse the transaction from the provided text.');
    }

    // --- VALIDATION ---
    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Journal entry is not balanced: Debits do not equal Credits.');
    }

    // Save entries
    const savedEntries = await this.journalEntryRepository.save(entriesToCreate);

    return {
      message: 'Journal entry created successfully.',
      transactionId,
      entries: savedEntries,
    };
  }
}
