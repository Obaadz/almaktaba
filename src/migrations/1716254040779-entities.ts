import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716254040779 implements MigrationInterface {
    name = 'Entities1716254040779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`code\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`code\``);
    }

}
