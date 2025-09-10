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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("journal_entry");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("accountId") !== -1,
        );
        await queryRunner.dropForeignKey("journal_entry", foreignKey);
        await queryRunner.dropTable("journal_entry");
        await queryRunner.dropTable("chart_of_account");
    }

}
