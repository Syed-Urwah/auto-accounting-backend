import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AddGeneralJournalEntity1758791262134 implements MigrationInterface {
    name = 'AddGeneralJournalEntity1758791262134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create GeneralJournal table
        await queryRunner.createTable(new Table({
            name: "general_journal",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "date",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "companyId",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "userEntry",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }), true);

        // Add generalJournalId to journal_entry table
        await queryRunner.addColumn("journal_entry", new TableColumn({
            name: "generalJournalId",
            type: "int",
            isNullable: true,
        }));

        // Create foreign key for generalJournalId in journal_entry
        await queryRunner.createForeignKey("journal_entry", new TableForeignKey({
            columnNames: ["generalJournalId"],
            referencedColumnNames: ["id"],
            referencedTableName: "general_journal",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        }));

        // Create foreign key for companyId in general_journal
        await queryRunner.createForeignKey("general_journal", new TableForeignKey({
            columnNames: ["companyId"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        }));

        // Drop transactionId column from journal_entry
        await queryRunner.dropColumn("journal_entry", "transactionId");

        // Re-add the original foreign key constraints that were dropped by the auto-generated migration
        // This part is crucial to ensure no unintended side effects from the auto-generation


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys in reverse order
        const journalEntryGeneralJournalForeignKey = new TableForeignKey({
            columnNames: ["generalJournalId"],
            referencedColumnNames: ["id"],
            referencedTableName: "general_journal",
        });
        await queryRunner.dropForeignKey("journal_entry", journalEntryGeneralJournalForeignKey);

        const generalJournalCompanyForeignKey = new TableForeignKey({
            columnNames: ["companyId"],
            referencedColumnNames: ["id"],
            referencedTableName: "companies",
        });
        await queryRunner.dropForeignKey("general_journal", generalJournalCompanyForeignKey);

        // Re-add transactionId column to journal_entry
        await queryRunner.addColumn("journal_entry", new TableColumn({
            name: "transactionId",
            type: "varchar",
            isNullable: true, // Assuming it was nullable before, adjust if not
        }));

        // Drop GeneralJournal table
        await queryRunner.dropTable("general_journal");

        // Re-add the original foreign key constraints that were dropped by the auto-generated migration


    }

}
