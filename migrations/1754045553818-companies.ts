import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Companies1754045553818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'companies',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'ownerId',
                        type: 'int',
                        isUnique: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.addColumn('users', new TableColumn({
            name: 'companyId',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'companies',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('companies', new TableForeignKey({
            columnNames: ['ownerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('companies');
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('ownerId') !== -1,
        );
        await queryRunner.dropForeignKey('companies', foreignKey);
        await queryRunner.dropColumn('users', 'companyId');
        await queryRunner.dropTable('companies');
    }

}
