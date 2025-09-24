import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AccountingTables1757507751729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chart_of_account",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "accountNumber",
                        type: "int",
                        isUnique: true,
                    },
                    {
                        name: "accountName",
                        type: "varchar",
                    },
                    {
                        name: "accountType",
                        type: "varchar",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: "journal_entry",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "transactionId",
                        type: "varchar",
                    },
                    {
                        name: "date",
                        type: "date",
                    },
                    {
                        name: "debit",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "credit",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "accountId",
                        type: "int",
                    },
                    {
                        name: "companyId",
                        type: "int",
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "journal_entry",
            new TableForeignKey({
                columnNames: ["accountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "chart_of_account",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            }),
        );

        await queryRunner.createForeignKey(
            "journal_entry",
            new TableForeignKey({
                columnNames: ["companyId"],
                referencedColumnNames: ["id"],
                referencedTableName: "companies",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const journalEntryTable = await queryRunner.getTable("journal_entry");

        const accountForeignKey = journalEntryTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("accountId") !== -1,
        );
        await queryRunner.dropForeignKey("journal_entry", accountForeignKey);

        const companyForeignKey = journalEntryTable.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("companyId") !== -1,
        );
        if (companyForeignKey) {
            await queryRunner.dropForeignKey("journal_entry", companyForeignKey);
        }

        await queryRunner.dropColumn("journal_entry", "companyId");
        await queryRunner.dropTable("journal_entry");
        await queryRunner.dropTable("chart_of_account");
    }

}
