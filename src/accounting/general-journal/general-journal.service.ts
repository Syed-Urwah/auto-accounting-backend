import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { apiResponse } from 'src/common/helpers/response.helper';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class GeneralJournalService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly configService: ConfigService,
  ) {}

  async create(createGeneralJournalDto: CreateGeneralJournalDto) {
    const { text, company_id } = createGeneralJournalDto;

    const company = await this.companyRepository.findOne({ where: { id: company_id } });
    if (!company) {
      throw new BadRequestException('Company not found.');
    }

    const chartOfAccounts = await this.chartOfAccountRepository.find();

    const prompt = `
    You are an expert accounting assistant. Convert the user's request into a structured double-entry journal entry based on the provided Chart of Accounts. The total debits must equal the total credits.

    User Request: "${text}"

    Chart of Accounts:
    ${chartOfAccounts.map((acc) => `- ${acc.accountNumber} ${acc.accountName}`).join('\n')}

    Return a JSON object in the following format:
    {
      "start_date": "YYYY-MM-DD",
      "description": "A brief summary of the transaction",
      "entries": [
        { "date": "YYYY-MM-DD", "accountName": "Account1", "debit": X, "credit": 0 , "description": "A Short Description of transaction"},
        { "date": "YYYY-MM-DD", "accountName": "Account2", "debit": 0, "credit": Y , "description": "A Short Description of transaction"}
      ]
    }
    `;

    const apiKey = this.configService.get('OPENROUTER_API_KEY');
    if (!apiKey || apiKey === 'YOUR_OPENROUTER_API_KEY') {
      throw new BadRequestException('OpenRouter API key is not set. Please set it in the .env file.');
    }

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-chat-v3.1:free',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      let result = response.data.choices[0].message.content;
      result = result.replace(/```json\n?/, '').replace(/```$/, '');
      const parsedResult = JSON.parse(result);

      const { description, entries } = parsedResult;
      const transactionId = uuidv4();

      let totalDebit = 0;
      let totalCredit = 0;
      const entriesToCreate = [];

      for (const entry of entries) {
        const account = await this.chartOfAccountRepository.findOne({ where: { accountName: entry.accountName } });
        if (!account) {
          throw new BadRequestException(`Account '${entry.accountName}' not found in Chart of Accounts.`);
        }

        entriesToCreate.push({
          transactionId,
          date: entry.date,
          account,
          debit: entry.debit,
          credit: entry.credit,
          description: entry.description,
          company,
        });

        totalDebit += entry.debit;
        totalCredit += entry.credit;
      }

      if (Math.abs(totalDebit - totalCredit) > 0.01) { // Using a tolerance for floating point comparison
        throw new BadRequestException('Journal entry is not balanced: Debits do not equal Credits.');
      }

      const savedEntries = await this.journalEntryRepository.save(entriesToCreate);

      const json = {
        message: 'Journal entry created successfully.',
        transactionId,
        description,
        entries: savedEntries,
      };

      return apiResponse(HttpStatus.OK, 'Journal entry created successfully', json)
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw new BadRequestException('Failed to get response from OpenRouter API.');
    }
  }

  async getJournalEntriesByTransactionId(companyId: number) {
    const journalEntries = await this.journalEntryRepository.find({
      where: { company: { id: companyId } },
      relations: ['account', 'company'],
    });

    const groupedEntries = journalEntries.reduce((acc, entry) => {
      const transactionId = entry.transactionId;
      if (!acc[transactionId]) {
        acc[transactionId] = { transactionId, entries: [] };
      }
      acc[transactionId].entries.push(entry);
      return acc;
    }, {});

    return Object.values(groupedEntries);
  }
}
