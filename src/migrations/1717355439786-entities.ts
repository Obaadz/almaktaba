import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1717355439786 implements MigrationInterface {
    name = 'Entities1717355439786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`salesCount\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`salesCount\``);
    }

}
