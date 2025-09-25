import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { apiResponse } from 'src/common/helpers/response.helper';
import { Company } from 'src/company/entities/company.entity';
import { GeneralJournal } from './entities/general-journal.entity';

@Injectable()
export class GeneralJournalService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(GeneralJournal)
    private readonly generalJournalRepository: Repository<GeneralJournal>,
    private readonly configService: ConfigService,
  ) { }

  async create(createGeneralJournalDto: CreateGeneralJournalDto) {
    const { userEntry, companyId } = createGeneralJournalDto;

    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new BadRequestException('Company not found.');
    }

    const chartOfAccounts = await this.chartOfAccountRepository.find();

    const prompt = `
    You are an expert accounting assistant. Convert the user's request into a structured double-entry journal entry based on the provided Chart of Accounts. The total debits must equal the total credits.

    User Request: "${userEntry}"

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

      const { description, entries, start_date } = parsedResult;

      const generalJournal = this.generalJournalRepository.create({
        date: start_date,
        description,
        company,
        userEntry
      });

      const savedGeneralJournal = await this.generalJournalRepository.save(generalJournal);

      let totalDebit = 0;
      let totalCredit = 0;
      const entriesToCreate = [];

      for (const entryDto of entries) {
        const account = await this.chartOfAccountRepository.findOne({ where: { id: entryDto.accountId } });
        if (!account) {
          throw new BadRequestException(`Account with ID '${entryDto.accountId}' not found in Chart of Accounts.`);
        }

        entriesToCreate.push({
          generalJournal: savedGeneralJournal,
          date: savedGeneralJournal.date,
          account,
          debit: entryDto.debit,
          credit: entryDto.credit,
          description: entryDto.description,
          company,
        });

        totalDebit += entryDto.debit;
        totalCredit += entryDto.credit;
      }

      if (Math.abs(totalDebit - totalCredit) > 0.01) { // Using a tolerance for floating point comparison
        throw new BadRequestException('Journal entry is not balanced: Debits do not equal Credits.');
      }

      const savedEntries = await this.journalEntryRepository.save(entriesToCreate);

      const json = {
        message: 'General Journal and entries created successfully.',
        generalJournalId: savedGeneralJournal.id,
        description: savedGeneralJournal.description,
        entries: savedEntries,
      };

      return apiResponse(HttpStatus.OK, 'General Journal and entries created successfully', json);

    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      throw new BadRequestException('Failed to get response from OpenRouter API.');
    }

    // AI Processing of userEntry would happen here.
    // This would involve sending the userEntry to a service that uses a large language model
    // to parse the entry and return structured data for the journal entries.
    // For now, we'll use dummy data based on a simple parsing of the userEntry.

    // Dummy AI Response Generation
    const aiGeneratedData = {
      date: new Date().toISOString().split('T')[0],
      description: `Journal entry for: ${userEntry}`,
      journalEntries: [
        // These would be generated by the AI based on the userEntry
        // Example: "userEntry": "Received $100 cash for services rendered"
        // AI would generate:
        { accountId: 1, debit: 100, credit: 0, description: "Cash received" },
        { accountId: 4, debit: 0, credit: 100, description: "Services revenue" }
      ]
    };

    const { date, description, journalEntries } = aiGeneratedData;



  }

  async getJournalEntriesByTransactionId(companyId: number) {
    const generalJournals = await this.generalJournalRepository.find({
      where: { company: { id: companyId } },
      relations: ['journalEntries', 'journalEntries.account', 'company'],
    });

    return generalJournals.map(gj => ({
      generalJournalId: gj.id,
      date: gj.date,
      description: gj.description,
      entries: gj.journalEntries.map(je => ({
        id: je.id,
        date: je.date,
        account: je.account,
        debit: je.debit,
        credit: je.credit,
        description: je.description,
      })),
    }));
  }
}
