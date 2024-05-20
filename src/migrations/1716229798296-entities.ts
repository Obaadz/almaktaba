import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1716229798296 implements MigrationInterface {
    name = 'Entities1716229798296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createdAt\``);
    }

}
